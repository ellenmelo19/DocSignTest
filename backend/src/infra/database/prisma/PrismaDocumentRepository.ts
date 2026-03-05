import { PrismaClient, Status } from '@prisma/client';
import { IDocumentRepository } from '@domain/repositories/IDocumentRepository';
import { Document, CreateDocumentInput, UpdateDocumentStatusInput, DocumentStatus, ListDocumentsInput, PaginatedDocuments } from '@domain/entities/Document';

export class PrismaDocumentRepository implements IDocumentRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(input: CreateDocumentInput): Promise<Document> {
    const created = await this.prisma.document.create({
      data: {
        titulo: input.titulo,
        descricao: input.descricao,
        status: Status.PENDENTE,
      },
    });

    return this.mapToDomain(created);
  }

  async list(input: ListDocumentsInput): Promise<PaginatedDocuments> {
    const where = input.search
      ? {
          OR: [
            { titulo: { contains: input.search, mode: 'insensitive' as const } },
            { descricao: { contains: input.search, mode: 'insensitive' as const } },
          ],
        }
      : undefined;

    const totalItems = await this.prisma.document.count({ where });
    const totalPages = Math.max(1, Math.ceil(totalItems / input.pageSize));
    const currentPage = Math.min(input.page, totalPages);
    const skip = (currentPage - 1) * input.pageSize;

    const documents = await this.prisma.document.findMany({
      where,
      orderBy: { criado_em: 'desc' },
      skip,
      take: input.pageSize,
    });

    return {
      items: documents.map(this.mapToDomain),
      meta: {
        currentPage,
        pageSize: input.pageSize,
        totalItems,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      },
    };
  }

  async findById(id: string): Promise<Document | null> {
    const doc = await this.prisma.document.findUnique({ where: { id } });
    return doc ? this.mapToDomain(doc) : null;
  }

  async updateStatus(input: UpdateDocumentStatusInput): Promise<Document | null> {
    const existing = await this.prisma.document.findUnique({ where: { id: input.id } });
    if (!existing) return null;

    const updated = await this.prisma.document.update({
      where: { id: input.id },
      data: { status: input.status as Status },
    });
    return this.mapToDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.document.delete({ where: { id } });
  }

  private mapToDomain(prismaDoc: any): Document {
    return {
      id: prismaDoc.id,
      titulo: prismaDoc.titulo,
      descricao: prismaDoc.descricao,
      status: prismaDoc.status as DocumentStatus,
      criado_em: prismaDoc.criado_em,
    };
  }
}

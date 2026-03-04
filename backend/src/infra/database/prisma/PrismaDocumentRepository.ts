import { PrismaClient, Status } from '@prisma/client';
import { IDocumentRepository } from '@domain/repositories/IDocumentRepository';
import { Document, CreateDocumentInput, UpdateDocumentStatusInput, DocumentStatus } from '@domain/entities/Document';

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

  async findAll(): Promise<Document[]> {
    const documents = await this.prisma.document.findMany({
      orderBy: { criado_em: 'desc' },
    });
    return documents.map(this.mapToDomain);
  }

  async findById(id: string): Promise<Document | null> {
    const doc = await this.prisma.document.findUnique({ where: { id } });
    return doc ? this.mapToDomain(doc) : null;
  }

  async updateStatus(input: UpdateDocumentStatusInput): Promise<Document | null> {
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
import { Status } from '@prisma/client';
export class PrismaDocumentRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(input) {
        const created = await this.prisma.document.create({
            data: {
                titulo: input.titulo,
                descricao: input.descricao,
                status: Status.PENDENTE,
            },
        });
        return this.mapToDomain(created);
    }
    async list(input) {
        const where = input.search
            ? {
                OR: [
                    { titulo: { contains: input.search, mode: 'insensitive' } },
                    { descricao: { contains: input.search, mode: 'insensitive' } },
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
    async findById(id) {
        const doc = await this.prisma.document.findUnique({ where: { id } });
        return doc ? this.mapToDomain(doc) : null;
    }
    async updateStatus(input) {
        const existing = await this.prisma.document.findUnique({ where: { id: input.id } });
        if (!existing)
            return null;
        const updated = await this.prisma.document.update({
            where: { id: input.id },
            data: { status: input.status },
        });
        return this.mapToDomain(updated);
    }
    async delete(id) {
        await this.prisma.document.delete({ where: { id } });
    }
    mapToDomain(prismaDoc) {
        return {
            id: prismaDoc.id,
            titulo: prismaDoc.titulo,
            descricao: prismaDoc.descricao,
            status: prismaDoc.status,
            criado_em: prismaDoc.criado_em,
        };
    }
}
//# sourceMappingURL=PrismaDocumentRepository.js.map
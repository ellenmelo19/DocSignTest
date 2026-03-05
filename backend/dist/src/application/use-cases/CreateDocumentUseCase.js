export class CreateDocumentUseCase {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async execute(dto) {
        const input = {
            titulo: dto.titulo.trim(),
            descricao: dto.descricao.trim(),
        };
        return this.repository.create(input);
    }
}
//# sourceMappingURL=CreateDocumentUseCase.js.map
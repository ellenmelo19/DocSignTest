export class UpdateDocumentStatusUseCase {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async execute(dto) {
        const input = {
            id: dto.id,
            status: dto.status,
        };
        return this.repository.updateStatus(input);
    }
}
//# sourceMappingURL=UpdateDocumentStatusUseCase.js.map
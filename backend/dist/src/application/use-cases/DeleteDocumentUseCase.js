export class DeleteDocumentUseCase {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        if (!id)
            throw new Error('ID e obrigatorio');
        await this.repository.delete(id);
    }
}
//# sourceMappingURL=DeleteDocumentUseCase.js.map
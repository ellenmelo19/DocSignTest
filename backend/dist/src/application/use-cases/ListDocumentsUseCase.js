export class ListDocumentsUseCase {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async execute(dto) {
        const input = {
            page: dto.page,
            pageSize: dto.pageSize,
            search: dto.search,
        };
        return this.repository.list(input);
    }
}
//# sourceMappingURL=ListDocumentsUseCase.js.map
namespace Chef.HRMS.Repositories;

public interface IDocumentTypeRepository : IGenericRepository<DocumentDetail>
{
    Task<bool> IsDocumentCodeExist(string code);
}

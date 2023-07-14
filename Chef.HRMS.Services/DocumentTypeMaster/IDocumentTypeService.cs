using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IDocumentTypeService : IAsyncService<DocumentDetail>
{
    Task<bool> IsDocumentCodeExist(string code);
}

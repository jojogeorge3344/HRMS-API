using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class PassportDocumentService : AsyncService<PassportDocument>, IPassportDocumentService
{
    private readonly IPassportDocumentRepository passportDocumentRepository;

    public PassportDocumentService(IPassportDocumentRepository passportDocumentRepository)
    {
        this.passportDocumentRepository = passportDocumentRepository;
    }

    public Task<int> DeleteAsync(int id)
    {
        return passportDocumentRepository.DeleteAsync(id);
    }

    public Task<IEnumerable<PassportDocument>> GetAllAsync()
    {
        return passportDocumentRepository.GetAllAsync();
    }

    public Task<PassportDocument> GetAsync(int id)
    {
        return passportDocumentRepository.GetAsync(id);
    }

    public Task<int> InsertAsync(PassportDocument passportDocument)
    {
        return passportDocumentRepository.InsertAsync(passportDocument);
    }

    public Task<int> UpdateAsync(PassportDocument passportDocument)
    {
        return passportDocumentRepository.UpdateAsync(passportDocument);
    }
}

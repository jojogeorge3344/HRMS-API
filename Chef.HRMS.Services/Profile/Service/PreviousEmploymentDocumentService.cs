using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class PreviousEmploymentDocumentService : AsyncService<PreviousEmploymentDocument>, IPreviousEmploymentDocumentService
{
    private readonly IPreviousEmploymentDocumentRepository previousEmploymentDocumentRepository;

    public PreviousEmploymentDocumentService(IPreviousEmploymentDocumentRepository previousEmploymentDocumentRepository)
    {
        this.previousEmploymentDocumentRepository = previousEmploymentDocumentRepository;
    }

    public Task<int> DeleteAsync(int id)
    {
        return previousEmploymentDocumentRepository.DeleteAsync(id);
    }

    public Task<IEnumerable<PreviousEmploymentDocument>> GetAllAsync()
    {
        return previousEmploymentDocumentRepository.GetAllAsync();
    }

    public Task<PreviousEmploymentDocument> GetAsync(int id)
    {
        return previousEmploymentDocumentRepository.GetAsync(id);
    }

    public Task<int> InsertAsync(PreviousEmploymentDocument previousEmploymentDocument)
    {
        return previousEmploymentDocumentRepository.InsertAsync(previousEmploymentDocument);
    }

    public Task<int> UpdateAsync(PreviousEmploymentDocument previousEmploymentDocument)
    {
        return previousEmploymentDocumentRepository.UpdateAsync(previousEmploymentDocument);
    }
}
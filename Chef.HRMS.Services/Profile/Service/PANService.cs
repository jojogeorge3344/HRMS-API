using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class PANService : AsyncService<PAN>, IPANService
{
    private readonly IPANRepository panRepository;

    public PANService(IPANRepository panRepository)
    {
        this.panRepository = panRepository;
    }

    public Task<IEnumerable<PANView>> GetByEmployeeId(int employeeId)
    {
        return panRepository.GetByEmployeeId(employeeId);
    }
}
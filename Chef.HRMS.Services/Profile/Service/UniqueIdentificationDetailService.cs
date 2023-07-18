using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class UniqueIdentificationDetailService : AsyncService<UniqueIdentificationDetail>, IUniqueIdentificationDetailService
{
    private readonly IUniqueIdentificationDetailRepository uniqueIdentificationDetailRepository;

    public UniqueIdentificationDetailService(IUniqueIdentificationDetailRepository uniqueIdentificationDetailRepository)
    {
        this.uniqueIdentificationDetailRepository = uniqueIdentificationDetailRepository;
    }

    public Task<IEnumerable<UniqueIdentificationDetailView>> GetByEmployeeId(int employeeId)
    {
        return uniqueIdentificationDetailRepository.GetByEmployeeId(employeeId);
    }
}
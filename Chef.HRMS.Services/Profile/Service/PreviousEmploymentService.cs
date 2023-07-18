using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class PreviousEmploymentService : AsyncService<PreviousEmployment>, IPreviousEmploymentService
{
    private readonly IPreviousEmploymentRepository previousEmploymentRepository;

    public PreviousEmploymentService(IPreviousEmploymentRepository previousEmploymentRepository)
    {
        this.previousEmploymentRepository = previousEmploymentRepository;
    }

    public Task<IEnumerable<PreviousEmploymentView>> GetByEmployeeId(int employeeId)
    {
        return previousEmploymentRepository.GetByEmployeeId(employeeId);
    }
}
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class EducationService : AsyncService<Education>, IEducationService
{
    private readonly IEducationRepository educationRepository;

    public EducationService(IEducationRepository educationRepository)
    {
        this.educationRepository = educationRepository;
    }

    public Task<IEnumerable<EducationView>> GetAllByEmployeeId(int employeeId)
    {
        return educationRepository.GetAllByEmployeeId(employeeId);
    }
}
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class DependentService : AsyncService<Dependent>, IDependentService
{
    private readonly IDependentRepository dependentRepository;

    public DependentService(IDependentRepository dependentRepository)
    {
        this.dependentRepository = dependentRepository;
    }

    public Task<IEnumerable<Dependent>> GetAllByEmployeeId(int employeeId)
    {
        return dependentRepository.GetAllByEmployeeId(employeeId);
    }
}
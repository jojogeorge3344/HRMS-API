using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class EmployeeDefaultServices : AsyncService<EmployeeDefaults>, IEmployeeDefaultsServices
{
    private readonly IEmployeeDefaultsRepository employeeDefaultRepository;

    public EmployeeDefaultServices(IEmployeeDefaultsRepository employeeDefaultRepository)
    {
        this.employeeDefaultRepository = employeeDefaultRepository;
    }
}
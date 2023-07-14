using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class EmployeeEncashmentDetailsService : AsyncService<EmployeeEncashmentDetails>, IEmployeeEncashmentDetailsService
{
    private readonly IEmployeeEncashmentDetailsRepository employeeEncashmentDetailsRepository;

    public EmployeeEncashmentDetailsService(IEmployeeEncashmentDetailsRepository employeeEncashmentDetailsRepository)
    {
        this.employeeEncashmentDetailsRepository = employeeEncashmentDetailsRepository;
    }
}

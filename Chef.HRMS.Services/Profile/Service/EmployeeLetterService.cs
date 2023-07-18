using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class EmployeeLetterService : AsyncService<EmployeeLetter>, IEmployeeLetterService
{
    private readonly IEmployeeLetterRepository employeeLetterRepository;

    public EmployeeLetterService(IEmployeeLetterRepository employeeLetterRepository)
    {
        this.employeeLetterRepository = employeeLetterRepository;
    }
}
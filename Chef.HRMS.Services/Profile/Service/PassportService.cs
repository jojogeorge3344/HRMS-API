using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class PassportService : AsyncService<Passport>, IPassportService
{
    private readonly IPassportRepository passportRepository;

    public PassportService(IPassportRepository passportRepository)
    {
        this.passportRepository = passportRepository;
    }

    public Task<IEnumerable<PassportView>> GetByEmployeeId(int employeeId)
    {
        return passportRepository.GetByEmployeeId(employeeId);
    }
}
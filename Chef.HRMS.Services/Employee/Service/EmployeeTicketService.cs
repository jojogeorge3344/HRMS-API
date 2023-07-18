using Chef.Common.Authentication.Repositories;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class EmployeeTicketService : AsyncService<EmployeeTicket>, IEmployeeTicketService
{
    private readonly IEmployeeTicketRepository EmployeeTicketRepository;
    private readonly IAuthService authService;

    public EmployeeTicketService(IEmployeeTicketRepository EmployeeTicketRepository, IAuthService authService)
    {
        this.EmployeeTicketRepository = EmployeeTicketRepository;
        this.authService = authService;
    }

    public async Task<IEnumerable<EmployeeTicket>> GetTicketDetailsByEmployeeId(int employeeId)
    {
        return await EmployeeTicketRepository.GetTicketDetailsByEmployeeId(employeeId);
    }

    public new async Task<int> InsertAsync(EmployeeTicket EmployeeTicket)
    {
        return await EmployeeTicketRepository.InsertAsync(EmployeeTicket);
    }

    public async Task<bool> IsTravelFromExist(string fromPlace)
    {
        return await EmployeeTicketRepository.IsTravelFromExist(fromPlace);
    }
}
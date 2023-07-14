using Chef.Common.Authentication.Models;
using Chef.Common.Authentication.Repositories;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class EmployeeService : AsyncService<HRMSEmployee>, IEmployeeService
{
    private readonly IEmployeeRepository employeeRepository;
    private readonly IAuthService authService;

    public EmployeeService(IEmployeeRepository employeeRepository, IAuthService authService)
    {
        this.employeeRepository = employeeRepository;
        this.authService = authService;
    }

    public async Task<int> DeleteAsync(int id)
    {
        return await employeeRepository.DeleteAsync(id);
    }

    public async Task<IEnumerable<HRMSEmployee>> GetAllAsync()
    {
        return await employeeRepository.GetAllAsync();
    }

    public async Task<IEnumerable<EmployeeView>> GetAllEmployeeDetails()
    {
        return await employeeRepository.GetAllEmployeeDetails();
    }

    public async Task<HRMSEmployee> GetAsync(int id)
    {
        return await employeeRepository.GetAsync(id);
    }

    public new async Task<int> InsertAsync(HRMSEmployee EmployeeTicket)
    {
        var registerDto = new RegisterDto
        {
            Email = EmployeeTicket.Email,
            FirstName = EmployeeTicket.FirstName,
            IsActive = true,
            LastName = EmployeeTicket.LastName,
            Password = "HRMS@" + EmployeeTicket.FirstName + "123",
            TimeZone = "5.30",
            Username = EmployeeTicket.FirstName
        };

        if ((await authService.RegisterUser(registerDto)).Succeeded)
        {
            var user = await authService.GetUser(EmployeeTicket.FirstName);
            EmployeeTicket.UserId = user.Id;
            EmployeeTicket.Id = await employeeRepository.InsertAsync(EmployeeTicket);
        }
        else
        {
            EmployeeTicket.Id = await employeeRepository.InsertAsync(EmployeeTicket);
        }
        return EmployeeTicket.Id;
    }

    public async Task<int> UpdateAsync(HRMSEmployee EmployeeTicket)
    {
        return await employeeRepository.UpdateAsync(EmployeeTicket);
    }

    public async Task<IEnumerable<EmployeeView>> GetEmployeeDetailsByJobTile(int jobTitleId)
    {
        return await employeeRepository.GetEmployeeDetailsByJobTile(jobTitleId);
    }

    public async Task<EmployeeView> GetEmployeeDetailsById(int employeeId)
    {
        return await employeeRepository.GetEmployeeDetailsById(employeeId);
    }
    public async Task<IEnumerable<Notification>> GetAllNotificationById(int employeeId)
    {
        return await employeeRepository.GetAllNotificationById(employeeId);
    }

    public async Task<bool> IsNameExist(string name)
    {
        return await employeeRepository.IsNameExist(name);
    }

    public async Task<LoginEmployeeView> GetLoginEmployee(int employeeId)
    {
        return await employeeRepository.GetLoginEmployee(employeeId);
    }

    public async Task<EmployeeView> GetEmployeeEditLeaveDetails(int employeeId, int leaveId)
    {
        return await employeeRepository.GetEmployeeEditLeaveDetails(employeeId, leaveId);

    }
}
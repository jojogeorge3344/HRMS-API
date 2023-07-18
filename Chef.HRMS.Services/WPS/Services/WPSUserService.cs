using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class WPSUserService : AsyncService<WPSUser>, IWPSUserService
{
    private readonly IWPSUserRepository wpsUserRepository;

    public WPSUserService(IWPSUserRepository wpsUserRepository)
    {
        this.wpsUserRepository = wpsUserRepository;
    } 

    public async Task<IEnumerable<WPSUser>> GetAllByemployeeId(int employeeId)
    {
        return await wpsUserRepository.GetAllByemployeeId(employeeId);
    } 

    public async Task<IEnumerable<HRMSBank>> GetBank()
    {
        return await wpsUserRepository.GetBank();
    } 
}

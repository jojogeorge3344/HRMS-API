using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class MyProfileService : AsyncService<MyProfileView>, IMyProfileService
{
    private readonly IMyProfileRepository myProfileRepository;

    public MyProfileService(IMyProfileRepository myProfileRepository)
    {
        this.myProfileRepository = myProfileRepository;
    }

    public async Task<MyProfileView> GetMyProfileDetailsAsync(int employeeId)
    {
        return await myProfileRepository.GetMyProfileDetailsAsync(employeeId);
    } 
}

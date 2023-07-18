using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class UserProfileService : AsyncService<UserProfile>, IUserProfileService
{
    private readonly IUserProfileRepository userProfileRepository;

    public UserProfileService(IUserProfileRepository userProfileRepository)
    {
        this.userProfileRepository = userProfileRepository;
    }
}
using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Microsoft.AspNetCore.Http;

namespace Chef.HRMS.Repositories
{
    public class UserProfileRepository : GenericRepository<UserProfile>, IUserProfileRepository
    {
        public UserProfileRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }
    }
}
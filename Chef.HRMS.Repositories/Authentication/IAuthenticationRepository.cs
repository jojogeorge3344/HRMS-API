using Authentication = Chef.HRMS.Models.Authentication;

namespace Chef.HRMS.Repositories;

public interface IAuthenticationRepository : IGenericRepository<Authentication>
{
    Task<Authentication> Login(Authentication credentials);

    Task<bool> ResetPassword(Authentication credentials);
}
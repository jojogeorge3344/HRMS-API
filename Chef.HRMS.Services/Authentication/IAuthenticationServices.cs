using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IAuthenticationServices : IAsyncService<Authentication>
{
    Task<Authentication> GenerateLoginToken(Authentication credentials);

    Task<Authentication> Login(Authentication credentials);


    Task<bool> ResetPassword(Authentication credentials);
}
using Chef.Common.Core.Services;
using Chef.HRMS.Models;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IAuthenticationServices : IAsyncService<Authentication>
    {
        Task<Authentication> GenerateLoginToken(Authentication credentials);

        Task<Authentication> Login(Authentication credentials);


        Task<bool> ResetPassword(Authentication credentials);
    }
}
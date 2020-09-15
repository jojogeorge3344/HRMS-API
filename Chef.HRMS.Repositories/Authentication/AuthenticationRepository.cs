using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class AuthenticationRepository : GenericRepository<Authentication>, IAuthenticationRepository
    {
        public AuthenticationRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<Authentication> Login(Authentication credentials)
        {
            using (Connection)
            {
                var sql = "SELECT * FROM authentication WHERE email = @email AND password = @password";

                return await Connection.QueryFirstOrDefaultAsync<Authentication>(sql, new { credentials.Email, credentials.Password });
            }
        }

        public async Task<bool> ResetPassword(Authentication credentials)
        {
            var query = "UPDATE authentication SET password = @password where emailid = @emailid";

            using (Connection)
            {
                using var transaction = Connection.BeginTransaction();
                var result = await Connection.ExecuteAsync(query, new { credentials.Email, credentials.Password });
                transaction.Commit();

                if (result > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
    }
}
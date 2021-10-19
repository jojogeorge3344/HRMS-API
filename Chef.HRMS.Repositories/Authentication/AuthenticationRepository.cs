using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class AuthenticationRepository : GenericRepository<Authentication>, IAuthenticationRepository
    {
        public AuthenticationRepository(DbSession session) : base(session)
        {
        }

        public async Task<Authentication> Login(Authentication credentials)
        {

                try
                {
                    var sql = "SELECT * FROM hrms.authentication WHERE email = @email AND password = @password";

                    return await Connection.QueryFirstOrDefaultAsync<Authentication>(sql, new { credentials.Email, credentials.Password });
                }
                catch (Exception ex)
                {
                    string msg = ex.Message;
                    return new Authentication();
                }

        }

        public async Task<bool> ResetPassword(Authentication credentials)
        {
            var query = "UPDATE authentication SET password = @password where emailid = @emailid";

            using (var transaction = Connection.BeginTransaction())
            {
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
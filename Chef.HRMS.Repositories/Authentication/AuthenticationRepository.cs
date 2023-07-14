using Authentication = Chef.Common.Models.Authentication;

namespace Chef.HRMS.Repositories;

public class AuthenticationRepository : TenantRepository<Authentication>, IAuthenticationRepository
{
    public AuthenticationRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }

    public Task<int> BulkInsertAsync(List<Models.Authentication> objs)
    {
        throw new NotImplementedException();
    }

    public Task<int> BulkUpdateAsync(List<Models.Authentication> objs)
    {
        throw new NotImplementedException();
    }

    public Task<int> InsertAsync(Models.Authentication obj)
    {
        throw new NotImplementedException();
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

    public Task<Models.Authentication> Login(Models.Authentication credentials)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> ResetPassword(Authentication credentials)
    {
        var query = "UPDATE hrms.authentication SET password = @password where emailid = @emailid";

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

    public Task<bool> ResetPassword(Models.Authentication credentials)
    {
        throw new NotImplementedException();
    }

    public Task<int> UpdateAsync(Models.Authentication obj)
    {
        throw new NotImplementedException();
    }

    Task<IEnumerable<Models.Authentication>> IGenericRepository<Models.Authentication>.GetAllAsync()
    {
        throw new NotImplementedException();
    }

    Task<Models.Authentication> IGenericRepository<Models.Authentication>.GetAsync(int id)
    {
        throw new NotImplementedException();
    }
}
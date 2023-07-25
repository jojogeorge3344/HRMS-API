using Chef.Common.Core.Extensions;
using System.Xml.Linq;

namespace Chef.HRMS.Repositories;

public class ExpensePolicyConfigurationRepository : GenericRepository<ExpensePolicyConfiguration>, IExpensePolicyConfigurationRepository
{
    public ExpensePolicyConfigurationRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }

    public async Task<IEnumerable<ExpensePolicyConfiguration>> GetAllAsync(int expensePolicyId)
    {

        var sql = @"SELECT * 
                            FROM   hrms.expensepolicyconfiguration 
                            WHERE  expensepolicyid = @expensePolicyId AND isarchived = false ORDER BY id desc";

        return await Connection.QueryAsync<ExpensePolicyConfiguration>(sql, new { expensePolicyId });

    }

    public async Task<bool> IsExpensePolicyById(int expensePolicyId, int expensePolicyTypeId)
    {
        if (await QueryFactory
      .Query<ExpensePolicyConfiguration>()
      .Where("expensepolicyid", expensePolicyId)
      .Where("expensetypeid", expensePolicyTypeId)
      .WhereNotArchived()
      .CountAsync<int>() > 0) return true;
        else return false;
    }

    public async Task<IEnumerable<ExpensePolicyConfiguration>> GetExpenseTypesById(int employeeid)
    {

        var sql = @"SELECT A.* 
                            FROM   hrms.expensepolicyconfiguration A 
                                   INNER JOIN hrms.jobfiling B 
                                           ON A.expensepolicyid = B.expensepolicyid 
                            WHERE  B.employeeid = @employeeid ORDER BY A.id";

        return await Connection.QueryAsync<ExpensePolicyConfiguration>(sql, new { employeeid });

    }

    public async Task<int> SetExpensePolicyIsConfigured(int expensePolicyId)
    {

        try
        {
            var sql = @"SELECT hrms.setexpensepolicyisionfigured(@expensePolicyId)";
            var result = await Connection.ExecuteAsync(sql, new { expensePolicyId });
            if (result == -1)
            {

                return 1;
            }
            else
            {
                return 0;
            }
        }
        catch
        {
            throw;
        }
    }
}

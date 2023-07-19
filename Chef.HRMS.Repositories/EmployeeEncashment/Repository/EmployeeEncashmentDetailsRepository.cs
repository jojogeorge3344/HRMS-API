using Chef.Common.Core.Extensions;
using Chef.HRMS.Models;

namespace Chef.HRMS.Repositories.EmployeeEncashment;

public class EmployeeEncashmentDetailsRepository : TenantRepository<Chef.HRMS.Models.EmployeeEncashmentDetails>, IEmployeeEncashmentDetailsRepository
{
    public EmployeeEncashmentDetailsRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {

    }

    public async Task<int> DeleteByEncashmentId(int encashmentId)
    {
        return await QueryFactory
      .Query<EmployeeEncashmentDetails>()
      .Where("employeeencashmentid", encashmentId)
      .DeleteAsync();
    }

    public async Task<IEnumerable<EmployeeEncashmentDetails>> GetByEncashmentId(int encashmentId)
    {
        var sql = @"SELECT
                      eed.*,
                      pc.shortcode AS payrollcomponentcode,
                      pc.name AS payrollcomponentname
                    FROM hrms.employeeencashmentdetails eed
                    INNER JOIN hrms.payrollcomponent pc
                      ON eed.payrollcomponentid = pc.id
                    WHERE employeeencashmentid = @encashmentId
                    AND eed.isarchived = FALSE";

        return await Connection.QueryAsync<EmployeeEncashmentDetails>(sql, new { encashmentId });
    }
}

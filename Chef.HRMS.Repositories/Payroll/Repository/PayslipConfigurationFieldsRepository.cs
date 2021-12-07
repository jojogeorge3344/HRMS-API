using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class PayslipConfigurationFieldsRepository : GenericRepository<PayslipConfigurationFields>, IPayslipConfigurationFieldsRepository
    {
        public PayslipConfigurationFieldsRepository(IHttpContextAccessor httpContextAccessor, DbSession session) : base(httpContextAccessor, session)
        {
        }

        public async Task<int> UpdatePayslipConfigurationFieldsAsync(IEnumerable<PayslipConfigurationFields> payslipConfigurationFields)
        {
                var sql = new QueryBuilder<PayslipConfigurationFields>().GenerateUpdateQuery();

                return await Connection.ExecuteAsync(sql, payslipConfigurationFields);
        }
    }
}

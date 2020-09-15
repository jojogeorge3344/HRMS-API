using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class PayslipConfigurationFieldsRepository : GenericRepository<PayslipConfigurationFields>, IPayslipConfigurationFieldsRepository
    {
        public PayslipConfigurationFieldsRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<int> UpdatePayslipConfigurationFieldsAsync(IEnumerable<PayslipConfigurationFields> payslipConfigurationFields)
        {
            using (Connection)
            {
                var sql = new QueryBuilder<PayslipConfigurationFields>().GenerateUpdateQuery();

                return await Connection.ExecuteAsync(sql, payslipConfigurationFields);
            }
        }
    }
}

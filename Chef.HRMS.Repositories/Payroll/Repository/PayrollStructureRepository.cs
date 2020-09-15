using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class PayrollStructureRepository : GenericRepository<PayrollStructure>, IPayrollStructureRepository
    {
        public PayrollStructureRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<int>> GetAllAssignedPayrollStructure()
        {
            using (Connection)
            {
                var sql = @"SELECT DISTINCT payrollstructureid 
                                    FROM PUBLIC.jobfiling
                                    ORDER  BY payrollstructureid ASC";

                return await Connection.QueryAsync<int>(sql);
            }
        }

        public async Task<IEnumerable<PayrollStructure>> GetAllConfiguredPayrollStructures()
        {
            using (Connection)
            {
                var sql = @"SELECT * 
                                    FROM PUBLIC.payrollstructure
                                    WHERE isconfigured=true";

                return await Connection.QueryAsync<PayrollStructure>(sql);
            }
        }

        public async Task<int> UpdatePayrollStructure(int id, bool isConfigured)
        {
            using (Connection)
            {
                var sql = @"UPDATE PUBLIC.payrollstructure
                                   SET isconfigured=@isConfigured
                                    WHERE id=@id";

                return await Connection.ExecuteAsync(sql, new { id,  isConfigured });
            }
        }
    }
}
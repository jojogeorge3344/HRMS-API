using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class EmployeeSalaryConfigurationDetailsRepository : GenericRepository<EmployeeSalaryConfigurationDetails>, IEmployeeSalaryConfigurationDetailsRepository
    {
        public EmployeeSalaryConfigurationDetailsRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<int> InsertEmployeeSalaryConfigDetails(IEnumerable<EmployeeSalaryConfigurationDetails> employeeSalaryConfigurationDetails)
        {
            using (Connection)
            {
                var sql = new QueryBuilder<EmployeeSalaryConfigurationDetails>().GenerateInsertQuery();

                return await Connection.ExecuteAsync(sql, employeeSalaryConfigurationDetails);
            }
        }

        public async Task<int> UpdateEmployeeSalaryConfigDetails(IEnumerable<EmployeeSalaryConfigurationDetails> employeeSalaryConfigurationDetails)
        {
            using (Connection)
            {
                var sql = new QueryBuilder<EmployeeSalaryConfigurationDetails>().GenerateUpdateQuery();

                return await Connection.ExecuteAsync(sql, employeeSalaryConfigurationDetails);
            }
        }

        public async Task<int> DeleteByEmployeeId(int employeeId)
        {
            using (Connection)
            {
                var sql = @"Delete FROM employeesalaryconfigurationdetails WHERE employeeid = @employeeid";

                return await Connection.ExecuteAsync(sql, employeeId);
            }
        }
    }
}

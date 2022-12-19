using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class EmployeeSalaryConfigurationDetailsRepository : GenericRepository<EmployeeSalaryConfigurationDetails>, IEmployeeSalaryConfigurationDetailsRepository
    {
        public EmployeeSalaryConfigurationDetailsRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<int> InsertEmployeeSalaryConfigDetails(IEnumerable<EmployeeSalaryConfigurationDetails> employeeSalaryConfigurationDetails)
        {

                var sql = new QueryBuilder<EmployeeSalaryConfigurationDetails>().GenerateInsertQuery();

                return await Connection.ExecuteAsync(sql, employeeSalaryConfigurationDetails);

        }

        public async Task<int> UpdateEmployeeSalaryConfigDetails(IEnumerable<EmployeeSalaryConfigurationDetails> employeeSalaryConfigurationDetails)
        {

                var sql = new QueryBuilder<EmployeeSalaryConfigurationDetails>().GenerateUpdateQuery();

                return await Connection.ExecuteAsync(sql, employeeSalaryConfigurationDetails);

        }

        public async Task<int> DeleteByEmployeeId(int employeeId)
        {

                var sql = @"Delete FROM hrms.employeesalaryconfigurationdetails WHERE employeeid = @employeeid";

                return await Connection.ExecuteAsync(sql, employeeId);

        }
    }
}

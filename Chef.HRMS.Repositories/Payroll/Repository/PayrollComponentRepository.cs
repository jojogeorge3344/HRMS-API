﻿using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class PayrollComponentRepository : GenericRepository<PayrollComponent>, IPayrollComponentRepository
    {
        public PayrollComponentRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }
        public async Task<IEnumerable<int>> GetAllAssignedPayrollComponents()
        {
            using (Connection)
            {
                var sql = @"SELECT DISTINCT payrollcomponentid 
                                    FROM PUBLIC.payrollcomponentconfiguration
                                    ORDER  BY payrollcomponentid ASC";

                return await Connection.QueryAsync<int>(sql);
            }
        }

        public async Task<IEnumerable<PayrollComponent>> GetAllPayrollComponentByType(int payrollComponentType)
        {
            using (Connection)
            {
                var sql = "SELECT * FROM  payrollcomponent WHERE payrollcomponenttype = @payrollComponentType";

                return await Connection.QueryAsync<PayrollComponent>(sql, new { payrollComponentType });
            }
        }

        public async Task<IEnumerable<PayrollComponent>> GetAllOrderByPayrollComponent()
        {
            using (Connection)
            {
                var sql = "SELECT * FROM  payrollcomponent order by payrollcomponenttype";

                return await Connection.QueryAsync<PayrollComponent>(sql);
            }
        }
    }
}
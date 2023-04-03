using Chef.Common.Core.Extensions;
using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Chef.HRMS.Types;
using Dapper;
using Humanizer;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using StackExchange.Redis;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class PayrollComponentRepository : GenericRepository<PayrollComponent>, IPayrollComponentRepository
    {
        public PayrollComponentRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }
        public async Task<IEnumerable<int>> GetAllAssignedPayrollComponents()
        {
                var sql = @"SELECT DISTINCT payrollcomponentid 
                                    FROM hrms.payrollcomponentconfiguration
                                    ORDER  BY payrollcomponentid ASC";

                return await Connection.QueryAsync<int>(sql);
        }

        public async Task<IEnumerable<PayrollComponent>> GetAllPayrollComponentByType(int payrollComponentType)
        {
                var sql = "SELECT * FROM  hrms.payrollcomponent WHERE payrollcomponenttype = @payrollComponentType";

                return await Connection.QueryAsync<PayrollComponent>(sql, new { payrollComponentType });
        }

        public async Task<IEnumerable<PayrollComponent>> GetAllOrderByPayrollComponent()
        {
                var sql = @"SELECT pc.*,bt.name AS typename FROM  hrms.payrollcomponent pc
                            INNER JOIN hrms.benefittypes bt
                            ON pc.payrollcomponenttype = bt.id
                            WHERE pc.isarchived = false ORDER BY payrollcomponenttype";

                return await Connection.QueryAsync<PayrollComponent>(sql);
        }

        public async Task<IEnumerable<BenefitTypes>> GetComponentType()
        {
            return await QueryFactory
          .Query<BenefitTypes>()
          .WhereNotArchived()
          .GetAsync<BenefitTypes>();
        }
        public async Task<bool> IsPayrollComponentCodeExist(string code)
        {
            if (await QueryFactory
           .Query<PayrollComponent>()
           .Where("shortcode", code)
           .WhereNotArchived()
           .CountAsync<int>() > 0) return true;
            else return false;
        }
    }
}
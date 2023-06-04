using Chef.Common.Core.Extensions;
using Chef.HRMS.Models.BenefitCategory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Chef.HRMS.Repositories
{
    public class EndOfServiceRepository : TenantRepository<EndOfService>, IEndOfServiceRepository
    {
        public EndOfServiceRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {

        }
        public async Task<IEnumerable<BenefitTypes>> GetEmployeeEOSAccrualType()
        {
            //var sql = @"SELECT * FROM hrms.benefittypes
            //            WHERE isarchived=false AND id =30";

            int bt = (int) Chef.HRMS.Types.BenefitType.EmployeeEOSAccrual;
            var sql = @"SELECT pc.*
                        FROM hrms.benefittypes as bt
                        INNER JOIN hrms.payrollcomponent pc ON bt.id = pc.payrollcomponenttype
                        AND pc.isarchived = false AND bt.id = " + bt + " ORDER BY pc.name";
            return await Connection.QueryAsync<BenefitTypes>(sql);
        }
        public async Task<IEnumerable<BenefitTypes>> GetEmployeeEOSpaymentType()
        {
            //var sql = @"SELECT * FROM hrms.benefittypes
            //            WHERE isarchived=false AND id =13";

            int bt = (int) Chef.HRMS.Types.BenefitType.EmployeeEOSPayment;
            var sql = @"SELECT pc.*
                        FROM hrms.benefittypes as bt
                        INNER JOIN hrms.payrollcomponent pc ON bt.id = pc.payrollcomponenttype
                        AND pc.isarchived = false AND bt.id = " + bt + " ORDER BY pc.name";
            return await Connection.QueryAsync<BenefitTypes>(sql);
        }

        public async Task<bool> IsBFCodeExist(string code)
        {
            if (await QueryFactory
            .Query<EndOfService>()
            .Where("bfcode", code)
            .WhereNotArchived()
            .CountAsync<int>() > 0) return true;
            else return false;
        }
    }
}

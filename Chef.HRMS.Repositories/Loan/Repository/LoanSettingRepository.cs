using Chef.Common.Core.Extensions;
using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories.Loan
{
    public class LoanSettingRepository : GenericRepository<LoanSetting>, ILoanSettingRepository
    {
        public LoanSettingRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<IEnumerable<LoanAdvanceRepaymentView>> GetLoanRepayment()
        {
            var sql = @"SELECT pc.id AS payrollcomponentid,pc.shortcode AS payrollcomponentcode,pc.name AS payrollcomponentname,
                        pc.payrollcomponenttype,bt.code AS benefittypecode,bt.name AS benefittypename 
                        FROM hrms.payrollcomponent pc
                        INNER JOIN hrms.benefittypes bt
                        ON bt.id = pc.payrollcomponenttype
                        WHERE pc.payrollcomponenttype = 23
                        AND pc.isarchived = false order by pc.name";

            return await Connection.QueryAsync<LoanAdvanceRepaymentView>(sql);
        }

        public async Task<IEnumerable<LoanAdvanceRepaymentView>> GetLoanAdvance()
        {
            var sql = @"SELECT pc.id AS payrollcomponentid,pc.shortcode AS payrollcomponentcode,pc.name AS payrollcomponentname,
                        pc.payrollcomponenttype,bt.code AS benefittypecode,bt.name AS benefittypename 
                        FROM hrms.payrollcomponent pc
                        INNER JOIN hrms.benefittypes bt
                        ON bt.id = pc.payrollcomponenttype
                        WHERE pc.payrollcomponenttype = 11
                        AND pc.isarchived = false order by pc.name";

            return await Connection.QueryAsync<LoanAdvanceRepaymentView>(sql);
        }

        public async Task<int> GetLoanSettingId()
        {
                var sql = @"SELECT id 
                            FROM   hrms.loansetting 
                            LIMIT  1 ";

                return await Connection.QueryFirstOrDefaultAsync<int>(sql);
        }

        public async Task<LoanSetting> GetTopOneLoanSetting()
        {
                var sql = @"SELECT * FROM  hrms.loansetting
                                     LIMIT 1";

                return await Connection.QueryFirstOrDefaultAsync<LoanSetting>(sql);
        }
    }
}
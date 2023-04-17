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

        public async Task<BenefitTypes> GetDeductionBFCode()
        {
            return await QueryFactory
            .Query<BenefitTypes>()
            .Where("id", 23)
            .WhereNotArchived()
            .FirstOrDefaultAsync<BenefitTypes>();
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
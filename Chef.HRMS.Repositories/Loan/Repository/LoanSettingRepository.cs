using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories.Loan
{
    public class LoanSettingRepository : GenericRepository<LoanSetting>, ILoanSettingRepository
    {
        public LoanSettingRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<int> GetLoanSettingId()
        {
            using (Connection)
            {
                var sql = @"SELECT id 
                            FROM   loansetting 
                            LIMIT  1 ";

                return await Connection.QueryFirstOrDefaultAsync<int>(sql);
            }
        }

        public async Task<LoanSetting> GetTopOneLoanSetting()
        {
            using (Connection)
            {
                var sql = @"SELECT * FROM  loansetting
                                     LIMIT 1";

                return await Connection.QueryFirstOrDefaultAsync<LoanSetting>(sql);
            }
        }
    }
}
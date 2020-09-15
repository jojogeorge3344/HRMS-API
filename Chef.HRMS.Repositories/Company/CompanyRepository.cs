using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class CompanyRepository : GenericRepository<HRMSCompany>, ICompanyRepository
    {
        public CompanyRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<HRMSCompany> GetAsync()
        {
            using (Connection)
            {
                var query = "SELECT * FROM hrmscompany";
                return await Connection.QueryFirstOrDefaultAsync<HRMSCompany>(query);
            }
        }
    }
}
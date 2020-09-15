using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface ICompanyRepository : IGenericRepository<HRMSCompany>
    {
        public Task<HRMSCompany> GetAsync();
    }
}
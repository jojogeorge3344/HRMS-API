using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IEndOfServiceRepository : IGenericRepository<EndOfService>
    {
        Task<IEnumerable<BenefitTypes>> GetEmployeeEOSAccrualType();
        Task<IEnumerable<BenefitTypes>> GetEmployeeEOSpaymentType();
        Task<bool> IsBFCodeExist(string code);
    }
}

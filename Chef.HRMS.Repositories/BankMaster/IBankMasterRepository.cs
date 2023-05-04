using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IBankMasterRepository : IGenericRepository<HRMSBank>
    {
        Task<bool> IsBankCodeExist(string code);
        Task<bool> IsBankNameExist(string name);
    }
}

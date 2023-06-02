using Chef.HRMS.Models;
using Chef.HRMS.Models.PayrollProcessing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services.PayrollProcessing.Interface
{
    public interface IEOSAccrualService : IAsyncService<EOSAccrual>
    {
        Task<IEnumerable<EOSAccrual>> GenerateEOSAccruals(int paygroupid);
        Task<int> GenerateEOSAvailed(EOSAccrual eosAvailedDetails);
        Task<int> SaveEOSAccruals(List<EOSAccrual> endOfServiceAccruals);
    }
}

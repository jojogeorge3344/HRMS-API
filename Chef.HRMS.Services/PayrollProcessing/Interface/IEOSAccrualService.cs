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
        Task<IEnumerable<EOSAccrual>> GenerateEndOfServiceAccruals(int paygroupid);
        Task<int> GenerateEndOfServiceAvailed(EOSAccrual eosAvailedDetails);
        Task<int> InsertEOSAccruals(List<EOSAccrual> endOfServiceAccruals);
        Task<List<EOSAccrual>> GetGeneratedEOSAccruals(int payrollprocessid);
    }
}

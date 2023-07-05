using Chef.Common.Models;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories.FinalSettlement;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IFinalSettlementRepository : IGenericRepository<Chef.HRMS.Models.FinalSettlement>
    {
        Task<decimal> GetFinalLeaveBalance(DateTime CutOffDateFrom, DateTime CutOffDateTo, int employeeId);
        Task<decimal> GetEOSBalanceDays(DateTime CutOffDateFrom, DateTime CutOffDateTo, int employeeId);
        Task<decimal> GetFinalTicketAmountBalance(DateTime CutOffDateFrom, DateTime CutOffDateTo, int employeeId);
        Task<IEnumerable<FinalSettlementComponetsView>> GetPayrollComponents(int employeeId);
        Task<IEnumerable<LOPCalculationView>> GetLeaveComponents(DateTime CutOffDateFrom, DateTime CutOffDateTo, int employeeId);
        Task<IEnumerable<OverTimePayrollViewModel>> GetOverTimeComponents(DateTime CutOffDateFrom, DateTime CutOffDateTo, int employeeId);
    }
}

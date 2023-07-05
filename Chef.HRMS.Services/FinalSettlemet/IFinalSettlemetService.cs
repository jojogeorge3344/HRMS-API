using Chef.HRMS.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IFinalSettlemetService : IAsyncService<FinalSettlement>
    {
        Task<bool> IsPreviousPayrollProcessed(int PreviousMonth, int previousYear,int employeeId);
        Task<FianlSettlementLeaveBalanceView> GetAllFinalLeaveBalance(DateTime CutOffDateFrom, DateTime CutOffDateTo, int employeeId);
        Task<IEnumerable<FinalSettlementComponetsView>> GetPayrollComponents(DateTime CutOffDateFrom, DateTime CutOffDateTo, int employeeId);
        Task<int> FinalSettlementInsert(FinalSettlement finalSettlement);
        Task<int> FinalSettlementUpdate(FinalSettlement finalSettlement);
        Task<int> FinalSettlementDelete(int id);
    }
}

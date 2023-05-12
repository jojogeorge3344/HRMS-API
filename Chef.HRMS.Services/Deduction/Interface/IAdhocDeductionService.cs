using Chef.Common.Services;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IAdhocDeductionService : IAsyncService<AdhocDeduction>
    {
        Task<IEnumerable<AdhocDeductionView>> GetAllAdhocDeductionByPayrollProcessingMethodId(int payGroupId, string fromDate, string toDate);
        Task<IEnumerable<AdhocDeductionView>> GetEmployeeAdhocDeductionByPayrollProcessingMethodId(int payrollProcessingMethodId);
        Task<IEnumerable<BenefitTypes>> GetBenefitTypes();

    }
}

using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IAdhocDeductionRepository : IGenericRepository<AdhocDeduction>
    {
        Task<IEnumerable<AdhocDeductionView>> GetAllAdhocDeductionByPayrollProcessingMethodId(int payGroupId, string fromDate, string toDate);
        Task<IEnumerable<AdhocDeductionView>> GetEmployeeAdhocDeductionByPayrollProcessingMethodId(int payrollProcessingMethodId);
        Task<IEnumerable<BenefitTypes>> GetBenefitTypes();
        Task<IEnumerable<BenefitTypes>> GetAdhocBfCode();
    }
}

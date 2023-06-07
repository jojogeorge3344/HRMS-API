using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IPayrollComponentConfigurationRepository : IGenericRepository<PayrollComponentConfiguration>
    {
        Task<IEnumerable<PayrollComponentConfiguration>> GetAllByPayrollStuctureId(int payrollStructureId);
        Task<int> InsertAsync(IEnumerable<PayrollComponentConfiguration> payrollComponentConfiguration, IEnumerable<int> PayrollComponentConfigurationIds);
        Task<int> InsertPayrollFixedCalculation(PayrollCalculation payrollCalculation);
        Task<int> SetPayrollStructureIsConfigured(int expensePolicyId);
        Task<IEnumerable<PayrollComponentConfiguration>> GetAllByPayrollComponentId(int payrollComponentId);
        Task<IEnumerable<PayrollComponentConfiguration>> GetDetailsByPayrollStuctureId(int payrollStructureId);
    }
}
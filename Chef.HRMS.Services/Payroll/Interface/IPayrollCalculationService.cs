using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IPayrollCalculationService : IAsyncService<PayrollCalculation>
    {
        Task<IEnumerable<PayrollCalculationViewModel>> GetAllCalculationDetails();

        Task<IEnumerable<PayrollCalculationViewModel>> GetPayrollComponentsByEmployeeId(int employeeId);

        Task<IEnumerable<PayrollCalculation>> GetAllCalculationDetailsById(int id);
    }
}
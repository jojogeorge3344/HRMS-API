using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IPayslipConfigurationFieldsRepository : IGenericRepository<PayslipConfigurationFields>
    {
        public Task<int> UpdatePayslipConfigurationFieldsAsync(IEnumerable<PayslipConfigurationFields> payslipConfigurationFields);
    }
}

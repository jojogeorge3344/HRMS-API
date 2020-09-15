using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class PayslipConfigurationService : AsyncService, IPayslipConfigurationService
    {
        private readonly IPayslipConfigurationRepository payslipConfigurationRepository;

        public PayslipConfigurationService(IPayslipConfigurationRepository payslipConfigurationRepository)
        {
            this.payslipConfigurationRepository = payslipConfigurationRepository;
        }

        public async Task<PayslipConfiguration> GetAsync(int id)
        {
            return await payslipConfigurationRepository.GetAsync(id);
        }

        public async Task<PayslipConfiguration> InsertAsync(PayslipConfiguration payslipConfiguration)
        {
            return await payslipConfigurationRepository.InsertAsync(payslipConfiguration);
        }

        public async Task<int> UpdateAsync(PayslipConfiguration payslipConfiguration)
        {
            return await payslipConfigurationRepository.UpdateAsync(payslipConfiguration);
        }

        public Task<int> DeleteAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<IEnumerable<PayslipConfiguration>> GetAllAsync()
        {
            throw new System.NotImplementedException();
        }
    }
}

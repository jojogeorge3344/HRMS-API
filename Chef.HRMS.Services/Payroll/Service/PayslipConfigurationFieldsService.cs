using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class PayslipConfigurationFieldsService : AsyncService, IPayslipConfigurationFieldsService
    {
        private readonly IPayslipConfigurationFieldsRepository payslipConfigurationFieldsRepository;

        public PayslipConfigurationFieldsService(IPayslipConfigurationFieldsRepository payslipConfigurationFieldsRepository)
        {
            this.payslipConfigurationFieldsRepository = payslipConfigurationFieldsRepository;
        }

        public async Task<int> UpdatePayslipConfigurationFieldsAsync(IEnumerable<PayslipConfigurationFields> payslipConfigurationFields)
        {
            return await payslipConfigurationFieldsRepository.UpdatePayslipConfigurationFieldsAsync(payslipConfigurationFields);
        }

        public async Task<IEnumerable<PayslipConfigurationFields>> GetAllAsync()
        {
            return await payslipConfigurationFieldsRepository.GetAllAsync();
        }

        public Task<int> DeleteAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<PayslipConfigurationFields> GetAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<PayslipConfigurationFields> InsertAsync(PayslipConfigurationFields obj)
        {
            throw new System.NotImplementedException();
        }

        public Task<int> UpdateAsync(PayslipConfigurationFields obj)
        {
            throw new System.NotImplementedException();
        }
    }
}

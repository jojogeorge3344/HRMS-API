using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class PayrollComponentConfigurationService : AsyncService, IPayrollComponentConfigurationService
    {
        private readonly IPayrollComponentConfigurationRepository payrollComponentConfigurationRepository;

        public PayrollComponentConfigurationService(IPayrollComponentConfigurationRepository payrollComponentConfigurationRepository)
        {
            this.payrollComponentConfigurationRepository = payrollComponentConfigurationRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await payrollComponentConfigurationRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<PayrollComponentConfiguration>> GetAllAsync()
        {
            return await payrollComponentConfigurationRepository.GetAllAsync();
        }

        public async Task<IEnumerable<PayrollComponentConfiguration>> GetAllByPayrollStuctureId(int payrollStructureId)
        {
            return await payrollComponentConfigurationRepository.GetAllByPayrollStuctureId(payrollStructureId);
        }

        public async Task<PayrollComponentConfiguration> GetAsync(int id)
        {
            return await payrollComponentConfigurationRepository.GetAsync(id);
        }

        public async Task<PayrollComponentConfiguration> InsertAsync(PayrollComponentConfiguration payrollComponentConfiguration)
        {
            return await payrollComponentConfigurationRepository.InsertAsync(payrollComponentConfiguration);
        }
        public async Task<int> InsertAsync(IEnumerable<PayrollComponentConfiguration> payrollComponentConfiguration, IEnumerable<int> PayrollComponentConfigurationIds)
        {
            return await payrollComponentConfigurationRepository.InsertAsync(payrollComponentConfiguration, PayrollComponentConfigurationIds);
        }

        public async Task<int> UpdateAsync(PayrollComponentConfiguration payrollComponentConfiguration)
        {

            int data = await payrollComponentConfigurationRepository.UpdateAsync(payrollComponentConfiguration);
            var isFixed = payrollComponentConfiguration.PayrollComponentType;
            if (data != 0 && isFixed.ToString() == "Fixed")
            {
                PayrollCalculation payrollCalculation = new PayrollCalculation();
                payrollCalculation.PayrollStructureId = payrollComponentConfiguration.PayrollStructureId;
                payrollCalculation.PayrollComponentId = payrollComponentConfiguration.PayrollComponentId;
                payrollCalculation.IsComputed = false;
                data = await payrollComponentConfigurationRepository.InsertPayrollFixedCalculation(payrollCalculation);

            }
            var structureId = payrollComponentConfiguration.PayrollStructureId;
            await payrollComponentConfigurationRepository.SetPayrollStructureIsConfigured(structureId);
            return data;
        }
    }
}
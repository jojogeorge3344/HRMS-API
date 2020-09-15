using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class PayrollBasicComponentService : AsyncService, IPayrollBasicComponentService
    {
        private readonly IPayrollBasicComponentRepository basicComponentRepository;

        public PayrollBasicComponentService(IPayrollBasicComponentRepository basicComponentRepository)
        {
            this.basicComponentRepository = basicComponentRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await basicComponentRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<PayrollBasicComponent>> GetAllAsync()
        {
            return await basicComponentRepository.GetAllAsync();
        }

        public async Task<PayrollBasicComponent> GetAsync(int id)
        {
            return await basicComponentRepository.GetAsync(id);
        }

        public async Task<PayrollBasicComponent> InsertAsync(PayrollBasicComponent basicComponent)
        {
            return await basicComponentRepository.InsertAsync(basicComponent);
        }

        public async Task<int> UpdateAsync(PayrollBasicComponent basicComponent)
        {
            return await basicComponentRepository.UpdateAsync(basicComponent);
        }

        public async Task<IEnumerable<EmployeeSalaryConfigurationView>> GetBasicComponentsByPaygroup(int paygoupId,int year,int month)
        {
            return await basicComponentRepository.GetBasicComponentsByPaygroup(paygoupId, year, month);
        }

        public async Task<int> InsertPayrollBasicComponents(IEnumerable<PayrollBasicComponent> payrollBasicComponents)
        {
            return await basicComponentRepository.InsertPayrollBasicComponents(payrollBasicComponents);
        }

        public async Task<IEnumerable<PayrollBasicComponent>> GetPayrollBasicComponentByPayrollProcessingMethodId(int payrollProcessingMethodId)
        {
            return await basicComponentRepository.GetPayrollBasicComponentByPayrollProcessingMethodId(payrollProcessingMethodId);
        }

        public async Task<IEnumerable<PayrollBasicComponent>> GetPayrollBreakUpByEmployeeId(int employeeId,int payrollProcessingMethodId)
        {
            return await basicComponentRepository.GetPayrollBreakUpByEmployeeId(employeeId, payrollProcessingMethodId);
        }

        public async Task<IEnumerable<EmployeeSalaryConfigurationView>> GetPayrollBasicComponentByEmployeeId(int employeeId)
        {
            return await basicComponentRepository.GetPayrollBasicComponentByEmployeeId(employeeId);
        }

        public async Task<int> InsertOrUpdateAsync(IEnumerable<PayrollBasicComponent> payrollBasicComponents)
        {
            return await basicComponentRepository.InsertOrUpdateAsync(payrollBasicComponents);
        }
    }
}

using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class PayrollComponentService : AsyncService<PayrollComponent>, IPayrollComponentService
    {
        private readonly IPayrollComponentRepository payrollComponentRepository;

        public PayrollComponentService(IPayrollComponentRepository payrollComponentRepository)
        {
            this.payrollComponentRepository = payrollComponentRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await payrollComponentRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<PayrollComponent>> GetAllAsync()
        {
            return await payrollComponentRepository.GetAllAsync();
        }

        public async Task<IEnumerable<int>> GetAllAssignedPayrollComponents()
        {
            return await payrollComponentRepository.GetAllAssignedPayrollComponents();
        }

        public async Task<IEnumerable<PayrollComponent>> GetAllOrderByPayrollComponent()
        {
            return await payrollComponentRepository.GetAllOrderByPayrollComponent();
        }

        public async Task<IEnumerable<PayrollComponent>> GetAllPayrollComponentByType(int payrollComponentType)
        {
            return await payrollComponentRepository.GetAllPayrollComponentByType(payrollComponentType);
        }
        public async Task<PayrollComponent> GetAsync(int id)
        {
            return await payrollComponentRepository.GetAsync(id);
        }

        public async Task<int> InsertAsync(PayrollComponent payrollComponent)
        {
            return await payrollComponentRepository.InsertAsync(payrollComponent);
        }

        public async Task<int> UpdateAsync(PayrollComponent payrollComponent)
        {
            return await payrollComponentRepository.UpdateAsync(payrollComponent);
        }
    }
}
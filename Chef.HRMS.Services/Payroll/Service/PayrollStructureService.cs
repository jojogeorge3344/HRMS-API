using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class PayrollStructureService : AsyncService<PayrollStructure>, IPayrollStructureService
    {
        private readonly IPayrollStructureRepository payrollStructureRepository;

        public PayrollStructureService(IPayrollStructureRepository payrollStructureRepository)
        {
            this.payrollStructureRepository = payrollStructureRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await payrollStructureRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<PayrollStructure>> GetAllActived(int payrollstructureid)
        {
            return await payrollStructureRepository.GetAllActived(payrollstructureid);
        }

        public async Task<IEnumerable<int>> GetAllAssignedPayrollStructure()
        {
            return await payrollStructureRepository.GetAllAssignedPayrollStructure();

        }

        public async Task<IEnumerable<PayrollStructure>> GetAllAsync()
        {
            return await payrollStructureRepository.GetAllAsync();
        }

        public async Task<IEnumerable<PayrollStructure>> GetAllConfiguredPayrollStructures()
        {
            return await payrollStructureRepository.GetAllConfiguredPayrollStructures();
        }

        public async Task<PayrollStructure> GetAsync(int id)
        {
            return await payrollStructureRepository.GetAsync(id);
        }

        public async Task<int> InsertAsync(PayrollStructure payrollStructure)
        {
            return await payrollStructureRepository.InsertAsync(payrollStructure);
        }

        public async Task<int> UpdateAsync(PayrollStructure payrollStructure)
        {
            return await payrollStructureRepository.UpdateAsync(payrollStructure);
        }

        public async Task<int> UpdatePayrollStructure(int id, bool isConfigured)
        {
            return await payrollStructureRepository.UpdatePayrollStructure(id, isConfigured);
        }
    }
}
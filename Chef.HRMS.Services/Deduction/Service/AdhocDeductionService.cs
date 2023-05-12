using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class AdhocDeductionService : AsyncService<AdhocDeduction>, IAdhocDeductionService
    {
        private readonly IAdhocDeductionRepository adhocDeductionRepository;

        public AdhocDeductionService(IAdhocDeductionRepository adhocDeductionRepository)
        {
            this.adhocDeductionRepository = adhocDeductionRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await adhocDeductionRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<AdhocDeductionView>> GetAllAdhocDeductionByPayrollProcessingMethodId(int payGroupId, string fromDate, string toDate)
        {
            return await adhocDeductionRepository.GetAllAdhocDeductionByPayrollProcessingMethodId( payGroupId,  fromDate,  toDate);
        }

        public async Task<IEnumerable<AdhocDeduction>> GetAllAsync()
        {
            return await adhocDeductionRepository.GetAllAsync();
        }

        public async Task<AdhocDeduction> GetAsync(int id)
        {
            return await adhocDeductionRepository.GetAsync(id);
        }

        public async Task<IEnumerable<BenefitTypes>> GetBenefitTypes()
        {
            return await adhocDeductionRepository.GetBenefitTypes();
        }

        public async Task<IEnumerable<AdhocDeductionView>> GetEmployeeAdhocDeductionByPayrollProcessingMethodId(int payrollProcessingMethodId)
        {
            return await adhocDeductionRepository.GetEmployeeAdhocDeductionByPayrollProcessingMethodId(payrollProcessingMethodId);
        }

        public async Task<int> InsertAsync(AdhocDeduction adhocDeduction)
        {
            return await adhocDeductionRepository.InsertAsync(adhocDeduction);
        }

        public async Task<int> UpdateAsync(AdhocDeduction adhocDeduction)
        {
            return await adhocDeductionRepository.UpdateAsync(adhocDeduction);
        }
    }
}

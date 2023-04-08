using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Models.BenefitCategory;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class LeaveComponentService : AsyncService<LeaveComponent>, ILeaveComponentService
    {
        private readonly ILeaveComponentRepository leaveComponentRepository;
        private readonly ILeaveEligibilityRepository leaveEligibilityRepository;

        public LeaveComponentService(ILeaveComponentRepository leaveComponentRepository,ILeaveEligibilityRepository leaveEligibilityRepository)
        {
            this.leaveComponentRepository = leaveComponentRepository;
            this.leaveEligibilityRepository = leaveEligibilityRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
           await leaveComponentRepository.DeleteAsync(id);
           return await leaveEligibilityRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<LeaveComponent>> GetAllAsync()
        {
            return await leaveComponentRepository.GetAllAsync();
        }

        public async Task<IEnumerable<LeaveComponent>> GetAllByLeaveStructure(int leaveStructureId)
        {
            return await leaveComponentRepository.GetAllByLeaveStructure(leaveStructureId);
        }

        public async Task<LeaveComponent> GetAsync(int id)
        {
            return await leaveComponentRepository.GetAsync(id);
        }

        public async Task<int> InsertAsync(LeaveComponent leaveComponent)
        {
            return await leaveComponentRepository.InsertAsync(leaveComponent);
        }
        public async Task<IEnumerable<int>> GetAllAssignedLeaveComponents()
        {
            return await leaveComponentRepository.GetAllAssignedLeaveComponents();
        }

        public async Task<int> UpdateAsync(LeaveComponent leaveComponent)
        {
            return await leaveComponentRepository.UpdateAsync(leaveComponent);
        }

        public async Task<IEnumerable<BenefitCategory>> GetBenefitCategory()
        {
            return await leaveComponentRepository.GetBenefitCategory();
        }

        public async Task<IEnumerable<BenefitTypes>> GetAccrualBenefitType()
        {
            return await leaveComponentRepository.GetAccrualBenefitType();
        }

        public async Task<IEnumerable<BenefitTypes>> GetAccrualType()
        {
            return await leaveComponentRepository.GetAccrualType();
        }

        public async Task<IEnumerable<BenefitTypes>> GetDeductionType()
        {
            return await leaveComponentRepository.GetDeductionType();
        }

        public async Task<IEnumerable<BenefitTypes>> GetBenefitType(int categoryid)
        {
            return await leaveComponentRepository.GetBenefitType(categoryid);
        }
    }
}
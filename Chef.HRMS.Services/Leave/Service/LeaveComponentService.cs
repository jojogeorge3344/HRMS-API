using Chef.Common.Core.Repositories;
using Chef.HRMS.Models;
using Chef.HRMS.Models.BenefitCategory;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class LeaveComponentService : AsyncService<LeaveComponent>, ILeaveComponentService
{
    private readonly ILeaveComponentRepository leaveComponentRepository;
    private readonly ILeaveEligibilityRepository leaveEligibilityRepository;

    public LeaveComponentService(ILeaveComponentRepository leaveComponentRepository,
        ILeaveEligibilityRepository leaveEligibilityRepository )
    {
        this.leaveComponentRepository = leaveComponentRepository;
        this.leaveEligibilityRepository = leaveEligibilityRepository; 
    }

    public new async Task<int> DeleteAsync(int id)
    {
        await leaveComponentRepository.DeleteAsync(id);
        return await leaveEligibilityRepository.DeleteAsync(id);
    }

    public new async Task<IEnumerable<LeaveComponent>> GetAllAsync()
    {
        return await leaveComponentRepository.GetAllAsync();
    }

    public async Task<IEnumerable<LeaveComponent>> GetAllByLeaveStructure(int leaveStructureId)
    {
        return await leaveComponentRepository.GetAllByLeaveStructure(leaveStructureId);
    }

    public async Task<IEnumerable<int>> GetAllAssignedLeaveComponents()
    {
        return await leaveComponentRepository.GetAllAssignedLeaveComponents();
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
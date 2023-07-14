using Chef.HRMS.Models.BenefitCategory;

namespace Chef.HRMS.Repositories;

public interface ILeaveComponentRepository : IGenericRepository<LeaveComponent>
{
    Task<IEnumerable<int>> GetAllAssignedLeaveComponents();
    Task<IEnumerable<LeaveComponent>> GetAllByLeaveStructure(int leaveStructureId);
    Task<IEnumerable<BenefitCategory>> GetBenefitCategory();
    Task<IEnumerable<BenefitTypes>> GetAccrualBenefitType();
    Task<IEnumerable<BenefitTypes>> GetAccrualType();
    Task<IEnumerable<BenefitTypes>> GetDeductionType();
    Task<IEnumerable<BenefitTypes>> GetBenefitType(int categoryid);
}
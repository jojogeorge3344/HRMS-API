using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Chef.HRMS.Models.BenefitCategory;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface ILeaveComponentRepository : IGenericRepository<LeaveComponent>
    {
        Task<IEnumerable<int>> GetAllAssignedLeaveComponents();
        Task<IEnumerable<LeaveComponent>> GetAllByLeaveStructure(int leaveStructureId);
        Task<IEnumerable<BenefitCategory>> GetBenefitCategory();
        Task<IEnumerable<BenefitTypes>> GetBenefitType(int categoryid);


    }
}
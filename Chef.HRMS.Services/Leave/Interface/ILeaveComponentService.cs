using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Models.BenefitCategory;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface ILeaveComponentService : IAsyncService<LeaveComponent>
    {
        Task<IEnumerable<int>> GetAllAssignedLeaveComponents();
        Task<IEnumerable<LeaveComponent>> GetAllByLeaveStructure(int leaveStructureId);
        Task<IEnumerable<BenefitCategory>> GetBenefitCategory();
        Task<IEnumerable<BenefitTypes>> GetBenefitType(int categoryid);
    }
}
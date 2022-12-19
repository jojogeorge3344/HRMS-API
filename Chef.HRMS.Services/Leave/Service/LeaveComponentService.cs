using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class LeaveComponentService : AsyncService<LeaveComponent>, ILeaveComponentService
    {
        private readonly ILeaveComponentRepository leaveComponentRepository;

        public LeaveComponentService(ILeaveComponentRepository leaveComponentRepository)
        {
            this.leaveComponentRepository = leaveComponentRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await leaveComponentRepository.DeleteAsync(id);
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
    }
}
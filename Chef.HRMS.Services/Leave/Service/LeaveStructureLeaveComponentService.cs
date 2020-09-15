using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class LeaveStructureLeaveComponentService : AsyncService, ILeaveStructureLeaveComponentService
    {
        private readonly ILeaveStructureLeaveComponentRepository leaveStructureLeaveComponentRepository;

        public LeaveStructureLeaveComponentService(ILeaveStructureLeaveComponentRepository leaveStructureLeaveComponentRepository)
        {
            this.leaveStructureLeaveComponentRepository = leaveStructureLeaveComponentRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await leaveStructureLeaveComponentRepository.DeleteAsync(id);
        }

        public async Task<int> DeleteAsync(LeaveStructureLeaveComponent leaveStructureLeaveComponent)
        {
            return await leaveStructureLeaveComponentRepository.DeleteAsync(leaveStructureLeaveComponent);
        }

       
        public async Task<IEnumerable<LeaveStructureLeaveComponent>> GetAllAsync()
        {
            return await leaveStructureLeaveComponentRepository.GetAllAsync();
        }

        public async Task<IEnumerable<LeaveStructureLeaveComponent>> GetAllAsync(int leaveStructureId)
        {
            return await leaveStructureLeaveComponentRepository.GetAllAsync(leaveStructureId);
        }

        public async Task<LeaveStructureLeaveComponent> GetAsync(int id)
        {
            return await leaveStructureLeaveComponentRepository.GetAsync(id);
        }

        public async Task<LeaveStructureLeaveComponent> InsertAsync(LeaveStructureLeaveComponent leaveStructureLeaveComponent)
        {
            return await leaveStructureLeaveComponentRepository.InsertAsync(leaveStructureLeaveComponent);
        }

        public async Task<int> InsertAsync(int leaveStructureId, IEnumerable<LeaveStructureLeaveComponent> leaveStructureLeaveComponents, IEnumerable<LeaveStructureLeaveComponent> removeLeaveStructureLeaveComponents)
        {
            return await leaveStructureLeaveComponentRepository.InsertAsync(leaveStructureId, leaveStructureLeaveComponents, removeLeaveStructureLeaveComponents);
        }

        public async Task<int> UpdateAsync(LeaveStructureLeaveComponent leaveStructureLeaveComponent)
        {
            return await leaveStructureLeaveComponentRepository.UpdateAsync(leaveStructureLeaveComponent);
        }

        public async Task<int> UpdateAsync(int leaveStructureId, IEnumerable<LeaveStructureLeaveComponent> leaveStructureLeaveComponents)
        {
            return await leaveStructureLeaveComponentRepository.UpdateAsync(leaveStructureId, leaveStructureLeaveComponents);
        }
    }
}
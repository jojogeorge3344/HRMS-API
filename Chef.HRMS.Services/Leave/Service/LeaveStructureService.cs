using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class LeaveStructureService : AsyncService<LeaveStructure>, ILeaveStructureService
    {
        private readonly ILeaveStructureRepository leaveStructureRepository;

        public LeaveStructureService(ILeaveStructureRepository leaveStructureRepository)
        {
            this.leaveStructureRepository = leaveStructureRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await leaveStructureRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<int>> GetAllAssignedLeaveStructure()
        {
            return await leaveStructureRepository.GetAllAssignedLeaveStructure();
        }

        public async Task<IEnumerable<LeaveStructure>> GetAllAsync()
        {
            return await leaveStructureRepository.GetAllAsync();
        }

        public async Task<IEnumerable<LeaveStructure>> GetAllConfiguredLeaveStructures()
        {
            return await leaveStructureRepository.GetAllConfiguredLeaveStructures();
        }

        public async Task<LeaveStructure> GetAsync(int id)
        {
            return await leaveStructureRepository.GetAsync(id);
        }

        public async Task<int> InsertAsync(LeaveStructure leaveStructure)
        {
            return await leaveStructureRepository.InsertAsync(leaveStructure);
        }

        public async Task<int> UpdateAsync(LeaveStructure leaveStructure)
        {
            return await leaveStructureRepository.UpdateAsync(leaveStructure);
        }

        public async Task<int> UpdateLeaveStructure(int id, bool isConfigured)
        {
            return await leaveStructureRepository.UpdateLeaveStructure(id, isConfigured);
        }
    }
}

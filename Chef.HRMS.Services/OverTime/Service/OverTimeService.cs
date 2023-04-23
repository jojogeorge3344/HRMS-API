using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class OverTimeService : AsyncService<OverTime>, IOverTimeService
    {
        private readonly IOverTimeRepository overTimeRepository;

        public OverTimeService(IOverTimeRepository overTimeRepository)
        {
            this.overTimeRepository = overTimeRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await overTimeRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<OverTime>> GetAllAsync()
        {
            return await overTimeRepository.GetAllAsync();
        }

        public async Task<OverTime> GetAsync(int id)
        {
            return await overTimeRepository.GetAsync(id);
        }

        public async Task<IEnumerable<OverTime>> GetAllOvertimeDetailsById(int employeeId)
        {
            return await overTimeRepository.GetAllOvertimeDetailsById(employeeId);
        }

        public async Task<int> InsertAsync(OverTime overTime)
        {
            return await overTimeRepository.InsertAsync(overTime);
        }

        public async Task<int> InsertNotifyPersonnel(IEnumerable<OverTimeNotifyPersonnel> overTimeNotifyPersonnel)
        {
            return await overTimeRepository.InsertNotifyPersonnel(overTimeNotifyPersonnel);
        }

        public async Task<int> UpdateAsync(OverTime overTime)
        {
            return await overTimeRepository.UpdateAsync(overTime);
        }

        public async Task<int> GetAssignedOverTimePolicy(int employeeId)
        {
            return await overTimeRepository.GetAssignedOverTimePolicy(employeeId);
        }

        public async Task<IEnumerable<OvertimeViewModel>> GetOvertimeNotifyPersonnelByOvertimeId(int overtimeId)
        {
            return await overTimeRepository.GetOvertimeNotifyPersonnelByOvertimeId(overtimeId);
        }

        public async Task<IEnumerable<CalenderView>> GetCalenderDetails(int employeeId)
        {
            return await overTimeRepository.GetCalenderDetails(employeeId);
        }
    }
}

using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class LeaveService : AsyncService<Leave>, ILeaveService
    {
        private readonly ILeaveRepository leaveRepository;

        public LeaveService(ILeaveRepository leaveRepository)
        {
            this.leaveRepository = leaveRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await leaveRepository.DeleteAsync(id);
        }

        public async Task<Leave> GetAsync(int id)
        {
            return await leaveRepository.GetAsync(id);
        }

        public async Task<IEnumerable<Leave>> GetAllAsync()
        {
            return await leaveRepository.GetAllAsync();
        }

        public async Task<int> UpdateAsync(Leave leave)
        {
            return await leaveRepository.UpdateAsync(leave);
        }

        public async Task<int> InsertAsync(Leave leave)
        {
            return await leaveRepository.InsertAsync(leave);
        }

        public async Task<IEnumerable<LeaveComponentLeaveBalanceViewModel>> GetAllLeaveBalanceById(int appliedById)
        {
            return await leaveRepository.GetAllLeaveBalanceById(appliedById);
        }

        public async Task<IEnumerable<Leave>> GetAllLeaveDetailsById(int employeeId)
        {
            return await leaveRepository.GetAllLeaveDetailsById(employeeId);
        }

        public async Task<int> InsertNotifyPersonnel(IEnumerable<LeaveNotifyPersonnel> leaveNotifyPersonnel)
        {
            return await leaveRepository.InsertNotifyPersonnel(leaveNotifyPersonnel);
        }

        public async Task<int> InsertUnmarkedAttendance(IEnumerable<Leave> leave)
        {
            return await leaveRepository.InsertUnmarkedAttendance(leave);
        }

        public async Task<IEnumerable<LeaveSettingsViewModel>> GetAllLeaveSettingsById(int employeeId)
        {
            return await leaveRepository.GetAllLeaveSettingsById(employeeId);
        }

        public async Task<IEnumerable<LeaveNotificationView>> GetApproverById(int leaveRequestId)
        {
            return await leaveRepository.GetApproverById(leaveRequestId);
        }

        public async Task<IEnumerable<LeaveNotifyPersonnel>> GetAllNotifyPersonnelById(int leaveRequestId)
        {
            return await leaveRepository.GetAllNotifyPersonnelById(leaveRequestId);
        }

        public async Task<IEnumerable<Leave>> GetAllUnApprovedLeaveById(int employeeId)
        {
            return await leaveRepository.GetAllUnApprovedLeaveById(employeeId);
        }

        public async Task<IEnumerable<Leave>> GetAllLeaveInfoByEmployeeId(int employeeId)
        {
            return await leaveRepository.GetAllLeaveInfoByEmployeeId(employeeId);
        }
    }
}

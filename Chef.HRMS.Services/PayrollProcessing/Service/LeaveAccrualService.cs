using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services.PayrollProcessing.Service
{
    public class LeaveAccrualService
    {
        private readonly ILeaveAccrualRepository leaveAccrualRepository;

        public LeaveAccrualService(ILeaveAccrualRepository leaveAccrualRepository)
        {
            this.leaveAccrualRepository = leaveAccrualRepository;
        }

        public async Task<IEnumerable<LeaveAndAttendance>> GenerateLeaveAccruals(bool isavail)
        {
            return await leaveAccrualRepository.GenerateLeaveAccruals(isavail);
        }

        public Task<int> DeleteAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<IEnumerable<LeaveAndAttendance>> GetAllAsync()
        {
            throw new System.NotImplementedException();
        }

        public Task<LeaveAndAttendance> GetAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<int> InsertAsync(LeaveAndAttendance obj)
        {
            throw new System.NotImplementedException();
        }

    }
}

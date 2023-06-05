using Chef.Common.Core.Services;
using Chef.Common.Models;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class LeaveAndAttendanceService : AsyncService<LeaveAndAttendanceViewModel>, ILeaveAndAttendanceService
    {
        private readonly ILeaveAndAttendanceRepository leaveAndAttendanceRepository;

        public LeaveAndAttendanceService(ILeaveAndAttendanceRepository leaveAndAttendanceRepository)
        {
            this.leaveAndAttendanceRepository = leaveAndAttendanceRepository;
        }

        public async Task<IEnumerable<LeaveAndAttendanceViewModel>> GetAllLeaveAndAttendanceByPaygroup(int paygroupId, DateTime fromDate, DateTime toDate, int payrollProcessId)
        {
            return await leaveAndAttendanceRepository.GetAllLeaveAndAttendanceByPaygroup(paygroupId, fromDate, toDate,payrollProcessId);
        }

        public async Task<IEnumerable<LeaveDetailsViewModel>> GetAllApprovedLeaveDetailsByEmployeeId(int employeeId, DateTime fromDate, DateTime toDate)
        {
            return await leaveAndAttendanceRepository.GetAllApprovedLeaveDetailsByEmployeeId(employeeId, fromDate, toDate);
        }

        public async Task<IEnumerable<LeaveDetailsViewModel>> GetAllUnapprovedLeaveDetailsByEmployeeId(int employeeId, DateTime fromDate, DateTime toDate)
        {
            return await leaveAndAttendanceRepository.GetAllUnapprovedLeaveDetailsByEmployeeId(employeeId, fromDate, toDate);
        }

        public async Task<IEnumerable<DateTime>> GetAllUnmarkedAttendanceDetailsByEmployeeId(int employeeId, DateTime fromDate, DateTime toDate)
        {
            return await leaveAndAttendanceRepository.GetAllUnmarkedAttendanceDetailsByEmployeeId(employeeId, fromDate, toDate);
        }

        public async Task<int> GetNumberOfEmployeesByPaygroup(int paygroupId)
        {
            return await leaveAndAttendanceRepository.GetNumberOfEmployeesByPaygroup(paygroupId);
        }

        public async Task<int> InsertLeaveAndAttendanceDetailsAsync(IEnumerable<LeaveAndAttendance> leaveAndAttendances)
        {
            return await leaveAndAttendanceRepository.InsertLeaveAndAttendanceDetails(leaveAndAttendances);
        }

        public async Task<IEnumerable<LeaveAndAttendance>> GetLeaveAndAttendanceByPayrollProcessingMethodId(int payrollProcessingMethodId)
        {
            return await leaveAndAttendanceRepository.GetLeaveAndAttendanceByPayrollProcessingMethodId(payrollProcessingMethodId);
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

        public Task<int> UpdateAsync(LeaveAndAttendance obj)
        {
            throw new System.NotImplementedException();
        }

        public async Task<LeaveAndAttendance> GetLeaveAndAttendanceByEmployeeId(int employeeId, int payrollProcessingMethodId)
        {
            return await leaveAndAttendanceRepository.GetLeaveAndAttendanceByEmployeeId(employeeId, payrollProcessingMethodId);
        }

        public async Task<IEnumerable<EmployeeAttendanceViewModel>> GetAllLeaveAndAttendanceByEmployeeId(int employeeId, DateTime fromDate, DateTime toDate)
        {
            return await leaveAndAttendanceRepository.GetAllLeaveAndAttendanceByEmployeeId(employeeId, fromDate, toDate);
        }

        public async Task<IEnumerable<LOPCalculationView>> GetLOPCalculation(DateTime fromDate, DateTime toDate)
        {
            return await leaveAndAttendanceRepository.GetLOPCalculation(fromDate, toDate);
        }

		//public async Task<IEnumerable<LOPCalculationView>> GetLOPCalculationDetail(int payrollProcessingMethodId, DateTime fromDate, DateTime toDate)
		//{
		//	return await leaveAndAttendanceRepository.GetLOPCalculationDetail(payrollProcessingMethodId,fromDate, toDate);
		//}
	}
}

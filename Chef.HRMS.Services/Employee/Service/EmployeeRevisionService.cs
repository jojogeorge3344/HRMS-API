using Chef.Common.Authentication.Models;
using Chef.Common.Authentication.Repositories;
using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class EmployeeRevisionService : AsyncService<EmployeeRevision>, IEmployeeRevisionService
    {
        private readonly IEmployeeRevisionRepository employeeRevisionRepository;
        private readonly IEmployeeRevisionOldService employeeRevisionOldService;
        private readonly IAuthService authService;

        public EmployeeRevisionService(IEmployeeRevisionRepository employeeRevisionRepository, IAuthService authService,
            IEmployeeRevisionOldService employeeRevisionOldService)
        {
            this.employeeRevisionRepository = employeeRevisionRepository;
            this.employeeRevisionOldService = employeeRevisionOldService;
            this.authService = authService;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await employeeRevisionRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<EmployeeRevision>> GetAllAsync()
        {
            return await employeeRevisionRepository.GetAllAsync();
        }

        public async Task<EmployeeRevision> GetAsync(int id)
        {
            return await employeeRevisionRepository.GetAsync(id);
        }

        public async Task<EmployeeRevisionView> GetEmployeeDetail(int employeeId)
        {
            return await employeeRevisionRepository.GetEmployeeDetail(employeeId);
        }

        public new async Task<int> InsertAsync(EmployeeRevision employeeRevision)
        {
            return await employeeRevisionRepository.InsertAsync(employeeRevision);
        }

        public async Task<int> UpdateAsync(EmployeeRevision employeeRevision)
        {

            var empRevOld = await employeeRevisionRepository.GetAsync(employeeRevision.Id);
            //later we need to changes as auto mapper.
            EmployeeRevisionOld employeeRevisionOld = new()
            {
                EmployeeRevisionId = empRevOld.Id,
                AttendanceTrackingId = empRevOld.AttendanceTrackingId,
                IsArchived = empRevOld.IsArchived,
                Id = 0,
                CreatedBy = empRevOld.CreatedBy,
                CreatedDate = empRevOld.CreatedDate,
                DepartmentId = empRevOld.DepartmentId,
                EffectiveFrm = empRevOld.EffectiveFrm,
                EmployeeId = empRevOld.EmployeeId,
                EOSId = empRevOld.EOSId,
                HolidayCategoryId = empRevOld.HolidayCategoryId,
                JobTitleId = empRevOld.JobTitleId,
                LeavesStructureId = empRevOld.LeavesStructureId,
                ModifiedBy = empRevOld.ModifiedBy,
                ModifiedDate = empRevOld.ModifiedDate,
                OverTimePolicyId = empRevOld.OverTimePolicyId,
                PayGroupId = empRevOld.PayGroupId,
                PayrollStructureId = empRevOld.PayrollStructureId,
                Remark = empRevOld.Remark,
                ReqDate = empRevOld.ReqDate,
                ReqNum = empRevOld.ReqNum,
                RevStatus = empRevOld.RevStatus,
                ShiftId = empRevOld.ShiftId,
                TimeType = empRevOld.TimeType,
                WeekOff = empRevOld.WeekOff,
                WorkerType = empRevOld.WorkerType
            };

            await employeeRevisionOldService.InsertAsync(employeeRevisionOld);

            return await employeeRevisionRepository.UpdateAsync(employeeRevision);
        }

        public async Task<IEnumerable<EmployeeRevisionStructureView>> GetPayrollComponent(int payrollStructureId)
        {
            return await employeeRevisionRepository.GetPayrollComponent(payrollStructureId);
        }

        public async Task<int> UpdateEmployeeRevisionStatus(int employeeRevisionid)
        {
            return await employeeRevisionRepository.UpdateEmployeeRevisionStatus(employeeRevisionid);
        }
    }
}
using Chef.Common.Authentication.Repositories;
using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Chef.HRMS.Models.Employee;
using Chef.HRMS.Repositories;
using System;

namespace Chef.HRMS.Services;

public class EmployeeRevisionService : AsyncService<EmployeeRevision>, IEmployeeRevisionService
{
    private readonly IEmployeeRevisionRepository employeeRevisionRepository;
    private readonly IEmployeeRevisionOldRepository employeeRevisionOldRepository;
    private readonly IAuthService authService;
    private readonly IJobFilingService jobFilingService;
    private readonly ITenantSimpleUnitOfWork simpleUnitOfWork;

    public EmployeeRevisionService(IEmployeeRevisionRepository employeeRevisionRepository, IAuthService authService,
        IEmployeeRevisionOldRepository employeeRevisionOldRepository, IJobFilingService jobFilingService, ITenantSimpleUnitOfWork simpleUnitOfWork)
    {
        this.employeeRevisionRepository = employeeRevisionRepository;
        this.employeeRevisionOldRepository = employeeRevisionOldRepository;
        this.authService = authService;
        this.jobFilingService = jobFilingService;
        this.simpleUnitOfWork = simpleUnitOfWork;
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

    public async Task<EmployeeRevisionOld> GetEmployeeDetail(int employeeId)
    {
        return await employeeRevisionRepository.GetEmployeeDetail(employeeId);
    }

    public new async Task<int> InsertAsync(EmployeeRevisionDTO employeeRevisionDTO)
    {
        try
        {
            simpleUnitOfWork.BeginTransaction();

            employeeRevisionDTO.employeeRevision.Id = await employeeRevisionRepository.InsertAsync(employeeRevisionDTO.employeeRevision);

            employeeRevisionDTO.employeeRevision.ReqNum = "REQ-" + employeeRevisionDTO.employeeRevision.Id;
            await employeeRevisionRepository.UpdateAsync(employeeRevisionDTO.employeeRevision);

            var status = (int)(employeeRevisionDTO.employeeRevision.RevStatus = Types.EmployeeRevisionStatus.Approveed);
            var approveStatus = await employeeRevisionRepository.UpdateEmployeeRevisionStatus(employeeRevisionDTO.employeeRevision.Id, status);

            if (employeeRevisionDTO.employeeRevisionsOld != null)
            {
                employeeRevisionDTO.employeeRevisionsOld.EmployeeRevisionId = employeeRevisionDTO.employeeRevision.Id;
                await employeeRevisionOldRepository.InsertAsync(employeeRevisionDTO.employeeRevisionsOld);
            }
            simpleUnitOfWork.Commit();
            return employeeRevisionDTO.employeeRevision.Id;
        }
        catch (Exception ex)
        {
            simpleUnitOfWork.Rollback();
            return 0;
        }
    }

    public async Task<int> UpdateAsync(EmployeeRevision employeeRevision)
    {

        //var empRevOld = await employeeRevisionRepository.GetAsync(employeeRevision.Id);
        ////later we need to changes as auto mapper.
        //EmployeeRevisionOld employeeRevisionOld = new()
        //{
        //    EmployeeRevisionId = empRevOld.Id,
        //    AttendanceTrackingId = empRevOld.AttendanceTrackingId,
        //    IsArchived = empRevOld.IsArchived,
        //    Id = 0,
        //    CreatedBy = empRevOld.CreatedBy,
        //    CreatedDate = empRevOld.CreatedDate,
        //    DepartmentId = empRevOld.DepartmentId,
        //    EffectiveFrm = empRevOld.EffectiveFrm,
        //    EmployeeId = empRevOld.EmployeeId,
        //    EOSId = empRevOld.EOSId,
        //    HolidayCategoryId = empRevOld.HolidayCategoryId,
        //    JobTitleId = empRevOld.JobTitleId,
        //    LeavesStructureId = empRevOld.LeavesStructureId,
        //    ModifiedBy = empRevOld.ModifiedBy,
        //    ModifiedDate = empRevOld.ModifiedDate,
        //    OverTimePolicyId = empRevOld.OverTimePolicyId,
        //    PayGroupId = empRevOld.PayGroupId,
        //    PayrollStructureId = empRevOld.PayrollStructureId,
        //    Remark = empRevOld.Remark,
        //    ReqDate = empRevOld.ReqDate,
        //    ReqNum = empRevOld.ReqNum,
        //    RevStatus = empRevOld.RevStatus,
        //    ShiftId = empRevOld.ShiftId,
        //    TimeType = empRevOld.TimeType,
        //    WeekOff = empRevOld.WeekOff,
        //    WorkerType = empRevOld.WorkerType
        //};

        //await employeeRevisionOldService.InsertAsync(employeeRevisionOld);

        return await employeeRevisionRepository.UpdateAsync(employeeRevision);
    }

    public async Task<IEnumerable<EmployeeRevisionStructureView>> GetPayrollComponent(int payrollStructureId)
    {
        return await employeeRevisionRepository.GetPayrollComponent(payrollStructureId);
    }
    public async Task<IEnumerable<EmployeeRevisionPayrollStructureView>> GetPayrollStructureComponent(int payrollStructureId)
    {
        return await employeeRevisionRepository.GetPayrollStructureComponent(payrollStructureId);
    }

    public async Task<int> UpdateEmployeeRevisionStatus(int employeeRevisionid, int status)
    {
        return await employeeRevisionRepository.UpdateEmployeeRevisionStatus(employeeRevisionid, status);
    }

    public async Task<int> EmployeeRevisionProcess(int employeeRevisionid)
    {
        var empJobFilling = await employeeRevisionRepository.GetAsync(employeeRevisionid);

        var job = await jobFilingService.GetByEmployeeId(empJobFilling.EmployeeId);


        //JobFiling jobFiling = new()
        //{
        job.LeaveStructureId = empJobFilling.LeavesStructureId;
        job.ShiftId = empJobFilling.ShiftId;
        job.WeekOff = empJobFilling.WeekOff;
        job.HolidayCategoryId = empJobFilling.HolidayCategoryId;
        job.EOSId = empJobFilling.EOSId;
        job.AttendanceTracking = (Types.AttendanceTrackingType)empJobFilling.AttendanceTrackingId;
        job.PayrollStructureId = empJobFilling.PayrollStructureId;
        job.PayGroupId = empJobFilling.PayGroupId;
        job.OverTimePolicyId = empJobFilling.OverTimePolicyId;
        //};

        return await jobFilingService.UpdateAsync(job);
    }

    public async Task<bool> IsEmployeeRevisionApproved(int employeeRevisionId)
    {
        return await employeeRevisionRepository.IsEmployeeRevisionApproved(employeeRevisionId);
    }
}
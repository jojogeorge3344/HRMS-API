using Chef.Common.Authentication.Repositories;
using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Chef.HRMS.Models.Employee;
using Chef.HRMS.Repositories;
using Chef.HRMS.Types;
using System;

namespace Chef.HRMS.Services;

public class EmployeeRevisionService : AsyncService<EmployeeRevision>, IEmployeeRevisionService
{
    private readonly IEmployeeRevisionRepository employeeRevisionRepository;
    private readonly IEmployeeRevisionOldRepository employeeRevisionOldRepository;
    private readonly IJobFilingService jobFilingService;
    private readonly ITenantSimpleUnitOfWork simpleUnitOfWork;

    public EmployeeRevisionService(IEmployeeRevisionRepository employeeRevisionRepository, IAuthService authService,
        IEmployeeRevisionOldRepository employeeRevisionOldRepository, IJobFilingService jobFilingService, ITenantSimpleUnitOfWork simpleUnitOfWork)
    {
        this.employeeRevisionRepository = employeeRevisionRepository;
        this.employeeRevisionOldRepository = employeeRevisionOldRepository;
        this.jobFilingService = jobFilingService;
        this.simpleUnitOfWork = simpleUnitOfWork;
    }

    public async Task<EmployeeRevisionOld> GetEmployeeDetail(int employeeId)
    {
        return await employeeRevisionRepository.GetEmployeeDetail(employeeId);
    }

    public async Task<int> InsertAsync(EmployeeRevisionDTO employeeRevisionDTO)
    {
        try
        {
            simpleUnitOfWork.BeginTransaction();

            employeeRevisionDTO.employeeRevision.Id = await employeeRevisionRepository.InsertAsync(employeeRevisionDTO.employeeRevision);

            employeeRevisionDTO.employeeRevision.ReqNum = "REQ-" + employeeRevisionDTO.employeeRevision.Id;
            await employeeRevisionRepository.UpdateAsync(employeeRevisionDTO.employeeRevision);

            var status = (int)(employeeRevisionDTO.employeeRevision.RevStatus = RequestStatusType.Approved);
            var approveStatus = await employeeRevisionRepository.UpdateEmployeeRevisionStatus(employeeRevisionDTO.employeeRevision.Id, status);

            if (employeeRevisionDTO.employeeRevisionsOld != null)
            {
                employeeRevisionDTO.employeeRevisionsOld.EmployeeRevisionId = employeeRevisionDTO.employeeRevision.Id;
                await employeeRevisionOldRepository.InsertAsync(employeeRevisionDTO.employeeRevisionsOld);
            }
            simpleUnitOfWork.Commit();
            return employeeRevisionDTO.employeeRevision.Id;
        }
        catch
        {
            simpleUnitOfWork.Rollback();
            return 0;
        }
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
        simpleUnitOfWork.BeginTransaction();
        try
        {
            int processStatus = (int)RequestStatusType.Processed;
            await employeeRevisionRepository.UpdateEmployeeRevisionStatus(employeeRevisionid, processStatus);
            var job = await jobFilingService.GetByEmployeeId(empJobFilling.EmployeeId);

            //update new salary structure to employee master
            job.LeaveStructureId = empJobFilling.LeavesStructureId;
            job.ShiftId = empJobFilling.ShiftId;
            job.WeekOff = empJobFilling.WeekOff;
            job.HolidayCategoryId = empJobFilling.HolidayCategoryId;
            job.EOSId = empJobFilling.EOSId;
            job.AttendanceTracking = (Types.AttendanceTrackingType)empJobFilling.AttendanceTrackingId;
            job.PayrollStructureId = empJobFilling.PayrollStructureId;
            job.PayGroupId = empJobFilling.PayGroupId;
            job.OverTimePolicyId = empJobFilling.OverTimePolicyId;

            simpleUnitOfWork.Commit();
            return await jobFilingService.UpdateAsync(job);
        }
        catch
        {
            simpleUnitOfWork.Rollback();
            return 0;
        }
    }

    public async Task<bool> IsEmployeeRevisionApproved(int employeeRevisionId)
    {
        return await employeeRevisionRepository.IsEmployeeRevisionApproved(employeeRevisionId);
    }
}
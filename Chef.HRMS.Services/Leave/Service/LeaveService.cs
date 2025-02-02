﻿using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;

namespace Chef.HRMS.Services;

public class LeaveService : AsyncService<Leave>, ILeaveService
{
    private readonly ILeaveRepository leaveRepository;
    private readonly ILeaveDetailsRepository leaveDetailsRepository;

    public LeaveService(ILeaveRepository leaveRepository,
        ILeaveDetailsRepository leaveDetailsRepository)
    {
        this.leaveRepository = leaveRepository;
        this.leaveDetailsRepository = leaveDetailsRepository;
    }

    public new async Task<int> InsertAsync(Leave leave)
    {
        int MaxDay = Convert.ToInt32(leave.NumberOfDays);

        int leaveId = await leaveRepository.InsertAsync(leave);
        DateTime startDate = leave.FromDate;
        for (int i = 1; i <= MaxDay; i++)
        {
            LeaveDetails leaveDetails = new LeaveDetails();

            leaveDetails.EmployeeId = leave.EmployeeId;
            leaveDetails.LeaveId = leaveId;
            leaveDetails.LeaveComponentId = leave.LeaveComponentId;
            if (i == 1)
            {
                if (leave.IsFirstDayFirstHalf || leave.IsFirstDaySecondHalf)
                    leaveDetails.LeaveType = 2;
                else
                    leaveDetails.LeaveType = 1;
            }
            else if (i == MaxDay)
            {
                if (leave.IsSecondDayFirstHalf || leave.IsSecondDaySecondHalf)
                    leaveDetails.LeaveType = 2;
                else
                    leaveDetails.LeaveType = 1;
            }
            else
            {
                leaveDetails.LeaveType = 1;
            }
            leaveDetails.LeaveDate = startDate.AddDays(i - 1);
            leaveDetails.LeaveStatus = leave.LeaveStatus;
            await leaveDetailsRepository.InsertAsync(leaveDetails);
        }
        return leaveId;
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

    public async Task<int> UpdateNotifyPersonnel(IEnumerable<LeaveNotifyPersonnel> leaveNotifyPersonnel)
    {
        return await leaveRepository.UpdateNotifyPersonnel(leaveNotifyPersonnel);
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

    public async Task<IEnumerable<Leave>> GetAllLeaveDetails()
    {
        return await leaveRepository.GetAllLeaveDetails();
    }
}

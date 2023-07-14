﻿using Chef.HRMS.Models;
using System;

namespace Chef.HRMS.Services;

public interface IRegularLoginService : IAsyncService<RegularLogin>
{
    Task<IEnumerable<RegularLogin>> GetAllAttendanceById(int employeeId);

    Task<decimal> GetAverageAttendanceById(int employeeId, int requestType);

    Task<decimal> GetAverageOnTimeDetails(int employeeId, int requestType);

    Task<IEnumerable<UserAttendanceViewModel>> GetAttendanceLog(int employeeId, DateTime startDate, DateTime endDate);
}

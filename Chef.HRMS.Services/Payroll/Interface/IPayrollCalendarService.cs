using Chef.Common.Core.Services;
using Chef.HRMS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IPayrollCalendarService : IAsyncService<PayrollCalendar>
    {
        Task<bool> IsDuplicateValueExists(string name);
        Task<IEnumerable<int>> GetAllAssignedPayCalendar();
        Task<IEnumerable<WeekofDateList>> GetStartDateAndEndDate(string weekstart, string weekend);
        Task<IEnumerable<WeekOff>> GetWeekOff();
    }
}

using Chef.Common.Services;
using Chef.Common.Types;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class EmployeeRevisionBoldService: BaseService, IEmployeeRevisionBoldService
    {
        private readonly IEmployeeRevisionBoldReportRepository employeeRevisionBoldReportRepository;
        public EmployeeRevisionBoldService(IEmployeeRevisionBoldReportRepository employeeRevisionBoldReportRepository)
        {
            this.employeeRevisionBoldReportRepository = employeeRevisionBoldReportRepository;
        }

        public async Task<IEnumerable<EmployeeRevisionBoldDto>> GetemployeeOldDetailsAsync(int id)
        {
            //var result = await employeeRevisionBoldReportRepository.GetemployeeOldDetailsAsync(id);

            List<EmployeeRevisionBoldDto> details = (await employeeRevisionBoldReportRepository.GetemployeeOldDetailsAsync(id)).ToList();
            var department = EnumExtensions.GetDisplayName(details.First().Department);
            var weekoff = EnumExtensions.GetDisplayName(details.First().WeekOff);
            var timetype = EnumExtensions.GetDisplayName(details.First().TimeType);
            var attendancetracking = EnumExtensions.GetDisplayName(details.First().AttendanceTracking);
            return details;
        }
        public async Task<IEnumerable<EmployeeRevisionBoldDto>> GetemployeeNewDetailsAsync(int id)
        {
            //var result = await employeeRevisionBoldReportRepository.GetemployeeNewDetailsAsync(id);
            List<EmployeeRevisionBoldDto> newdetails = (await employeeRevisionBoldReportRepository.GetemployeeNewDetailsAsync(id)).ToList();
            var departments = EnumExtensions.GetDisplayName(newdetails.First().DepartmentNew);
            var weekoffs = EnumExtensions.GetDisplayName(newdetails.First().WeekOffNew);
            var timetypes = EnumExtensions.GetDisplayName(newdetails.First().TimeTypeNew);
            var attendancetrackings = EnumExtensions.GetDisplayName(newdetails.First().AttendanceTrackingNew);
            return newdetails;
        }
        public async Task<IEnumerable<EmployeeSalarayDto>> GetSalaryOldDetailsAsync(int id)
        {
            var result= await employeeRevisionBoldReportRepository.GetSalaryOldDetailsAsync(id);
            return result;
        }
        public async Task<IEnumerable<EmployeeSalarayDto>> GetSalaryNewDetailsAsync(int id)
        {
            var result = await employeeRevisionBoldReportRepository.GetSalaryNewDetailsAsync(id);
            return result;
        }

    }
}

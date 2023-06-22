using Chef.Common.Core;
using Chef.Common.Core.Extensions;
using Chef.Common.Types;
using Chef.HRMS.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models.Report
{
    public class LeaveDetailedReportView : Model
    {
        public int EmployeeId { get; set; }
        public string EmployeeCode { get; set; }
        public string EmployeeFullName { get; set; }
        public string LeaveComponentName { get; set; }
        public string PaygroupName { get; set; }
        public string DesignationName { get; set; }
        public int CountryId { get; set; }
        public string CountryName { get; set; }
        public DepartmentType Department { get; set; }
        public string DepartmentName => EnumExtension.GetDescription(Department);
        public string CategoryName { get; set; }
        public string ReportType { get; set; }
        public DateTime ToDate { get; set; }
        public DateTime FromDate { get; set; }
        public LeaveType LeaveType { get; set; }
        public string LeaveTypeName => EnumExtension.GetDescription(LeaveType);
        public DateTime LeaveDate { get; set; }
    }
}

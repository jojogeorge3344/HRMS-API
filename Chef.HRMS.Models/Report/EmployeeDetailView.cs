using Chef.Common.Core;
using Chef.Common.Models;
using System;

namespace Chef.HRMS.Models
{
    public class EmployeeDetailView : Model
    {
        /// <summary>
        /// Holds employee number
        /// </summary>
        public string EmployeeNumber { get; set; }

        /// <summary>
        /// Holds employee firstname + lastname
        /// </summary>
        public string EmployeeName { get; set; }

        /// <summary>
        /// Holds dob of the employee
        /// </summary>
        public DateTime DateOfBirth { get; set; }

        /// <summary>
        /// Holds Gender
        /// </summary>
        public GenderType Gender { get; set; }

        /// <summary>
        /// Holds date of join
        /// </summary>
        public DateTime DateOfJoin { get; set; }

        /// <summary>
        /// Holds company experience
        /// </summary>
        public string CompanyExperience { get; set; }

        /// <summary>
        /// Holds name of the jobtitle
        /// </summary>
        public string JobTitle { get; set; }

        /// <summary>
        /// Holds department
        /// </summary>
        public DepartmentType Department { get; set; }

        /// <summary>
        /// Holds worker type
        /// </summary>
        public WorkerType WorkerType { get; set; }

        /// <summary>
        /// Holds time type
        /// </summary>
        public TimeType TimeType { get; set; }

        /// <summary>
        /// Holds week off type
        /// </summary>
        public WeekOff WeekOff { get; set; }

        /// <summary>
        /// Holds leavestructureid of the employee
        /// </summary>
        public string LeaveStructure { get; set; }

        /// <summary>
        /// Holds holidaycategoryid of the employee
        /// </summary>
        public string HolidayCategory { get; set; }

        /// <summary>
        /// Holds ShiftId of the employee
        /// </summary>
        public string Shift { get; set; }

        /// <summary>
        /// Holds expensepolicyid of the employee
        /// </summary>
        public string ExpensePolicy { get; set; }

        /// <summary>
        /// Holds payrollstructureid of the employee
        /// </summary>
        public string PayrollStructure { get; set; }

        /// <summary>
        /// Holds pay group id
        /// </summary>
        public string PayGroup { get; set; }

        /// <summary>
        /// Holds overtimepolicyid of the employee
        /// </summary>
        public string OverTimePolicy { get; set; }
    }
}

using Chef.Common.Core;
using System;

namespace Chef.HRMS.Models
{
    public class EmployeeView : Model
    {
        /// <summary>
        /// Holds department Id of the employee
        /// </summary>
        public int Department { get; set; }

        /// <summary>
        /// Holds email of the employee
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Holds employee firstname + lastname
        /// </summary>
        public string EmployeeName { get; set; }

        /// <summary>
        /// Holds first name of the employee
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// Holds middle name of the employee
        /// </summary>
        public string MiddleName { get; set; }

        /// <summary>
        /// Holds last name of employee
        /// </summary>
        public string LastName { get; set; }

        /// <summary>
        /// Holds job details id of the employee
        /// </summary>
        public int JobDetailsId { get; set; }

        /// <summary>
        /// Holds employee number
        /// </summary>
        public string EmployeeNumber { get; set; }

        /// <summary>
        /// Holds the job filing id of the employee
        /// </summary>
        public int JobFilingId { get; set; }

        /// <summary>
        /// Holds location of the employee
        /// </summary>
        public int Location { get; set; }

        /// <summary>
        /// Holds leavestructureid of the employee
        /// </summary>
        public int LeaveStructureId { get; set; }

        /// <summary>
        /// Holds ShiftId of the employee
        /// </summary>
        public int ShiftId { get; set; }

        /// <summary>
        /// Holds holidaycategoryid of the employee
        /// </summary>
        public int HolidayCategoryId { get; set; }

        /// <summary>
        /// Holds expensepolicyid of the employee
        /// </summary>
        public int ExpensePolicyId { get; set; }

        /// <summary>
        /// Holds payrollstructureid of the employee
        /// </summary>
        public int PayrollStructureId { get; set; }

        /// <summary>
        /// Holds overtimepolicyid of the employee
        /// </summary>
        public int OverTimePolicyId { get; set; }
        public int PayGroupId { get; set; }
        public int PaymentMethodeId { get; set; }
        public DateTime DateOfJoin { get; set; }
        public string DocumentName { get; set; }
        public string DocumentPath { get; set; }
        public int DocumentId { get; set; }
        public int NotifyPersonnelId { get; set; }
    }
}
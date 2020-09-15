using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.Text;
using Chef.Common.Models;

namespace Chef.HRMS.Models
{
    public class AttendanceReportView: Model
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
        /// Holds department
        /// </summary>
        public DepartmentType Department { get; set; }
        /// <summary>
        /// Holds date
        /// </summary>
        public DateTime Date { get; set; }

        /// <summary>
        /// Holds day
        /// </summary>
        public string Day { get; set; }

        /// <summary>
        /// Holds shift
        /// </summary>
        public string Shift { get; set; }
        /// <summary>
        /// Holds checkin
        /// </summary>
        public DateTime InTime { get; set; }
        /// <summary>
        /// Holds checkout
        /// </summary>
        public DateTime OutTime { get; set; }
        /// <summary>
        /// Holds workinghours
        /// </summary>
        public string WorkingHours { get; set; }

        /// <summary>
        /// Holds attendancetype
        /// </summary>
        public string AttendanceType { get; set; }
    }
}
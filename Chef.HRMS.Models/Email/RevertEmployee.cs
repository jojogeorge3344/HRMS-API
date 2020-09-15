using System;
using System.Collections.Generic;
using System.Text;

namespace Chef.HRMS.Models
{
   public class RevertEmployee
    {
        /// <summary>
        /// Holds department Id of the employee
        /// </summary>
        public string Department { get; set; }

        /// <summary>
        /// Holds email of the employee
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Holds employee firstname + lastname
        /// </summary>
        public string EmployeeName { get; set; }
        /// <summary>
        /// Holds employee number
        /// </summary>
        public string EmployeeNumber { get; set; }
        /// <summary>
        /// Holds employee firstname + lastname
        /// </summary>
        public string Month { get; set; }

    }
}

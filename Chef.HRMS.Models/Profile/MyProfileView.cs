using Chef.Common.Core;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    public class MyProfileView : Model
    {
        /// <summary>
        /// Holds th eemail id of employee
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Holds the firstname of th employee
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// Holds the middle name of th employee
        /// </summary>
        public string MiddleName { get; set; }

        /// <summary>
        /// Holds the last name of the employee
        /// </summary>
        public string LastName { get; set; }

        /// <summary>
        /// Holds the reporting manger name
        /// </summary>
        public int ReportingManager { get; set; }

        /// <summary>
        /// Holds the employee number
        /// </summary>
        public string EmployeeNumber { get; set; }

        /// <summary>
        /// Holds the date of joining of the employee
        /// </summary>
        public DateTime DateOfJoin { get; set; }

        /// <summary>
        /// Holds the notice period of the employee
        /// </summary>
        public int NoticePeriod { get; set; }

        /// <summary>
        /// Holds the job detaild Id
        /// </summary>
        public int JobDetailsId { get; set; }

        /// <summary>
        /// Holds the job filling Id
        /// </summary>
        public int JobFilingId { get; set; }

        /// <summary>
        /// Holds the job ttitle Id
        /// </summary>
        public int JobTitleId { get; set; }        

        /// <summary>
        /// Holds the department Id
        /// </summary>
        public int Department { get; set; }

        /// <summary>
        /// Holds the location Id
        /// </summary>
        public int Location { get; set; }

        /// <summary>
        /// Holds the gender
        /// </summary>
        public int Gender { get; set; }
    }
}
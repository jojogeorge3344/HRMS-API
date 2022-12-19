using Chef.Common.Core;
using Chef.Common.Models;
using Chef.Common.Types;
using Chef.HRMS.Types;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    public class JobDetails : Model
    {
        /// <summary>
        /// Holds department
        /// </summary>
        public BusinessUnitType BusinessUnit { get; set; }

        /// <summary>
        /// Holds date of join
        /// </summary>
        [Required]
        public DateTime DateOfJoin { get; set; }

        /// <summary>
        /// Holds department
        /// </summary>
        public DepartmentType Department { get; set; }

        /// <summary>
        /// Holds employee id
        /// </summary>
        [Required]
        [ForeignKey("Employee")]
        public int EmployeeId { get; set; }

        /// <summary>
        /// Holds company id
        /// </summary>
        [Required]
        [ForeignKey("HRMSCompany")]
        public int CompanyId { get; set; }

        /// <summary>
        /// Holds branch id
        /// </summary>
        [Required]
        [ForeignKey("HRMSBranch")]
        public int BranchId { get; set; }

        /// <summary>
        /// Holds job title
        /// </summary>
        [Required]
        [ForeignKey("JobTitle")]
        public int JobTitleId { get; set; }

        /// <summary>
        /// Holds number series
        /// </summary>
        [Required]
        [ForeignKey("EmployeeNumberSeries")]
        public int NumberSeriesId { get; set; }

        /// <summary>
        /// Holds employee number
        /// </summary>
        [Required]
        public string EmployeeNumber { get; set; }

        /// <summary>
        /// Holds location
        /// </summary>
        public int Location { get; set; }

        /// <summary>
        /// Holds notice period
        /// </summary>
        public NoticePeriodType NoticePeriod { get; set; }

        /// <summary>
        /// Holds period type
        /// </summary>
        public PeriodType PeriodType { get; set; }

        /// <summary>
        /// Holds probation period
        /// </summary>
        public int ProbationPeriod { get; set; }

        /// <summary>
        /// Holds reporting person
        /// </summary>
        [ForeignKey("Employee")]
        public int ReportingManager { get; set; }

        /// <summary>
        /// Holds secondary job title
        /// </summary>
        public string SecondaryJobTitle { get; set; }

        /// <summary>
        /// Holds time type
        /// </summary>
        public TimeType TimeType { get; set; }

        /// <summary>
        /// Holds worker type
        /// </summary>
        public WorkerType WorkerType { get; set; }
    }
}
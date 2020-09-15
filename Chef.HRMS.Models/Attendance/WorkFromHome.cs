using Chef.Common.Core;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    public class WorkFromHome : Model
    {
        /// <summary>
        /// Holds from date of  work from  home
        /// </summary>
        [Required]
        [Description("From date of work from home")]
        public DateTime FromDate { get; set; }

        /// <summary>
        /// Holds from date of  work from  home
        /// </summary>
        [Required]
        [Description("To date of work from home")]
        public DateTime ToDate { get; set; }

        /// <summary>
        /// Holds the value of if first day is a full day workfromhome
        /// </summary>
        [Description("Is full day work from home")]
        public bool IsFullDay { get; set; }

        /// <summary>
        /// Holds the value of if first day first half is workfromhome
        /// </summary>
        [Description("Is first day first half of work  from home")]
        public bool IsFirstDayFirstHalf { get; set; }

        /// <summary>
        /// Holds the value of if first day second half is workfromhome
        /// </summary>
        
        [Description("Is first day second half of work  from home")]
        public bool IsFirstDaySecondHalf { get; set; }

        /// <summary>
        /// Holds the value of if second day first half is workfromhome
        /// </summary>
        [Description("Is second day  first half of work  from home")]
        public bool IsSecondDayFirstHalf { get; set; }

        /// <summary>
        /// Holds the value of if second day second half is workfromhome
        /// </summary>
        [Description("Is second day   second half of work  from home")]
        public bool IsSecondDaySecondHalf { get; set; }

        /// <summary>
        /// Holds the number of days taking the leave
        /// </summary>
        [Description("Number of days taking the work from home")]
        public decimal NumberOfDays { get; set; }

        /// <summary>
        /// Holds reason of  work from  home
        /// </summary>
        [Required]
        [StringLength(128)]
        [Description("Reason of work from home")]
        public string Reason { get; set; }
        /// <summary>
        /// Holds the details of requested person
        /// </summary>
        [Required]
        [ForeignKey("Employee")]
        [Description("Who is requested for work from home")]
        public int EmployeeId { get; set; }

        

        /// <summary>
        /// Holds the approved status
        /// </summary>
        public bool IsApproved { get; set; }

    }
}

using Chef.Common.Core;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Chef.HRMS.Models
{
    public class LeaveStructure : Model
    {
        /// <summary>
        /// Holds calendar year start date
        /// </summary>
        [Required]
        public DateTime CalendarYearStartDate { get; set; }

        /// <summary>
        /// Holds custom document path
        /// </summary>
        [StringLength(128)]
        public string CustomDocumentPath { get; set; }

        /// <summary>
        /// Holds description
        /// </summary>
        [Required]
        public string Description { get; set; }

        /// <summary>
        /// Holds custom leave policy document available status
        /// </summary>
        public bool IsCustomLeavePolicyDocumentAvailable { get; set; }

        /// <summary>
        /// Holds name of the plan
        /// </summary>
        [Required]
        public string Name { get; set; }

        /// <summary>
        /// Holds show leave policy explanation status
        /// </summary>
        public bool ShowLeavePolicyExplanation { get; set; }

        /// <summary>
        /// Holds the details leave is configured
        /// </summary>
        [Description("Leave is configured")]
        public bool IsConfigured { get; set; }
    }
}
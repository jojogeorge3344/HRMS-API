using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Chef.Common.Core;

namespace Chef.HRMS.Models
{
    [Table("employeeticket")]
    public class EmployeeTicket : Model
    {
        [Required]
        public DateTime TravelDate { get; set; }

        [Required]
        public int TravelMode { get; set; }

        [Required]
        public string TravelFrom { get; set; }

        [Required]
        public string TravelTo { get; set; }

        [Required]
        public bool IsRoundTrip { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public int EmployeeId { get; set; }
    }
}
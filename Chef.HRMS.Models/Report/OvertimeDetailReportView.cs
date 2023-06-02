using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class OvertimeDetailReportView : ViewModel
    {
        public decimal NormalOverTimeHrs { get; set; }
        public decimal HolidayOverTimeHrs { get; set; }
        public decimal SpecialOverTimeHrs { get; set; }
        public decimal NormalOverTimeRate { get; set; }
        public decimal HolidayOverTimeRate { get; set;}
        public decimal SpecialOverTimeRate { get; set; }        
        //public int NormalComponentId { get; set; }
        //public int HolidayComponentId { get; set; }
        //public int SpecialComponentId { get; set; }
        public decimal NormalOverTimeAmount { get; set; }
        public decimal HolidayOverTimeAmount { get; set; }
        public decimal SpecialOverTimeAmount { get; set; }
        public string NormalOverTimeName { get; set; }
        public string HolidayOverTimeName { get; set; }
        public string SpecialOverTimeName { get; set; }
        //public int EmployeeId { get; set; }
    }
}

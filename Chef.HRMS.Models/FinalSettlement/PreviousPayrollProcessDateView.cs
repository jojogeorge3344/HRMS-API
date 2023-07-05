using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class PreviousPayrollProcessDateView
    {
        public bool IsProcessed { get; set; }
        public DateTime PreviousPayrollProcessDate { get; set; }
    }
}

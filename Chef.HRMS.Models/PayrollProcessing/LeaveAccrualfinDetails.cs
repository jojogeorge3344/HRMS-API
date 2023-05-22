using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class LeaveAccrualfinDetails : ViewModel
    {
        public int Id { get; set; }

        public int LeaveAccrualDetailsId { get; set; }
        
        public decimal LeaveAccrualAmount { get; set; }

        public int DrAccount { get; set; }

        public int CrAccount { get; set; }
    }
}

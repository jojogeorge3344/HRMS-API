using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models.PayrollProcessing
{
    public class TicketAccrualfinDetails : ViewModel
    {
        public int Id { get; set; }
        public int TicketAccrualId { get; set; }        
        public decimal TicketAccrualAmount { get; set; }
        public decimal DrAccount { get; set; }
        public decimal CrAccount { get; set; }
        public string Docnum { get; set; }
    }
}

using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class FinalSettlementFindTLS : Model
    {
        public int FinalSettlementId { get; set; }
        public int FinalSettlementDetailsId { get; set; }
        public int PayrollComponentId { get; set; }
        public decimal ComponentAmt { get; set; }
        public int DrLedgerAccountId { get; set; }
        public string DrLedgerAccountCode { get; set; }
        public string DrLedgerAccountName { get; set; }
        public int CrLedgerAccountId { get; set; }
        public string CrLedgerAccountCode { get; set; }
        public string CrLedgerAccountName { get; set; }
        public string DocNum { get; set; }
    }
}

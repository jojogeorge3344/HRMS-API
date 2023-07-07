using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class FinalSettlementProcessView
    {
        public string FinalSettlementProcessStatus { get; set; }
        public List<AssetRaiseRequest> PendingAssets { get; set; }
    }
}

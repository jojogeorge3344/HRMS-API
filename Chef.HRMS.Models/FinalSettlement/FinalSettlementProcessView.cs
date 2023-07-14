using System.Collections.Generic;

namespace Chef.HRMS.Models;

public class FinalSettlementProcessView
{
    public string FinalSettlementProcessStatus { get; set; }
    public List<AssetRaiseRequest> PendingAssets { get; set; }
}

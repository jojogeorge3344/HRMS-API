using Chef.Common.Core;

namespace Chef.HRMS.Models;

public class AssetReasonViewModel : ViewModel
{
    //public AssetChangeType Type  { get; set; }

    public int Type { get; set; }

    public string Comments { get; set; }

    public int Reason { get; set; }


}

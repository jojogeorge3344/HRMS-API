using Chef.Common.Core;

namespace Chef.HRMS.Models;

public class AssetCountViewModel : ViewModel
{
    public int AllocatedAsset { get; set; }
    public int Requests { get; set; }
    public int EmpId { get; set; }
}

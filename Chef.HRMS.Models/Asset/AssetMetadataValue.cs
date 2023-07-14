using Chef.Common.Core;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models;

public class AssetMetadataValue : Model
{

    [ForeignKey("AssetType")]
    public int AssettypeId { get; set; }

    [ForeignKey("AssetTypeMetadata")]
    public int AssettypeMetadataId { get; set; }

    [ForeignKey("Asset")]
    public int AssetId { get; set; }

    //[Required]
    public string Value { get; set; }
}

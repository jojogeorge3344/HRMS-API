using Chef.Common.Core;
using Chef.HRMS.Types;

namespace Chef.HRMS.Models;

public class DocumentDetail : Model
{
    //[Required]
    //[StringLength(128)]
    public string Name { get; set; }
    public string Code { get; set; }
    public bool IsExpired { get; set; }
    public int ExpiryBeforeDays { get; set; }
    public int DisplayOrder { get; set; }
    public Types.DocumentType DocumentType { get; set; }
    public DocumentReturnType DocumentReturnType { get; set; }
    public DocumentUpdateType DocumentUpdateType { get; set; }
    public bool Status { get; set; }
}

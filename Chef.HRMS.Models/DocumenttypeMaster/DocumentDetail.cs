using Chef.Common.Core;
using Chef.Common.Types;
using Chef.HRMS.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class DocumentDetail : Model
    {
        //[Required]
        //[StringLength(128)]
        public string Name { get; set; }
        public string Code { get; set; }
        public bool IsExpired { get; set; }
        public int ExpiryBeforeDays { get; set; }
        public int DisplayOrder { get; set; }
        public DocumentTypeList DocumentTypeList { get; set; }
        public DocumentReturnType DocumentReturnType { get; set; }
        public DocumentUpdateType DocumentUpdateType { get; set; }
    }
}

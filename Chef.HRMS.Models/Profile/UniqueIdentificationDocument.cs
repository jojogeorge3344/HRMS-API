using Chef.Common.Core;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    public class UniqueIdentificationDocument : Model
    {
        /// <summary>
        /// Holds the  unique identification detail id
        /// </summary>
        [Description("id of unique identification detail")]
        [ForeignKey("UniqueIdentificationDetail")]
        public int UniqueIdentificationDetailId { get; set; }

        /// <summary>
        /// Holds the  document id
        /// </summary>
        [Description("id of document")]
        [ForeignKey("Document")]
        public int DocumentId { get; set; }
    }
}

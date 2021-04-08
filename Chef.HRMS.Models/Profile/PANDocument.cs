using Chef.Common.Core;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    [TableType("junctiontable")]
    public class PANDocument : Model
    {
        /// <summary>
        /// Holds the  Pan id
        /// </summary>
        [Description("id of pan")]
        [ForeignKey("Pan")]
        public int PanId { get; set; }

        /// <summary>
        /// Holds the  document id
        /// </summary>
        [Description("id of document")]
        [ForeignKey("Document")]
        public int DocumentId { get; set; }

    }
}

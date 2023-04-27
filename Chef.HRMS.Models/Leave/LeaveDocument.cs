using Chef.Common.Core;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    [TableType("junctiontable")]
    public class LeaveDocument : Model
    {
        /// <summary>
        /// Holds the document Id
        /// </summary>
        [ForeignKey("Document")]
        public int DocumentId { get; set; }

        /// <summary>
        /// Holds the leave Id
        /// </summary>
        [ForeignKey("Leave")]
        public int EducationId { get; set; }
    }
}
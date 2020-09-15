using Chef.Common.Core;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    [TableType("junctiontable")]
    public class PreviousEmploymentDocument : Model
    {
        /// <summary>
        /// Holds the document Id
        /// </summary>
        [ForeignKey("Document")]
        public int DocumentId { get; set; }

        /// <summary>
        /// Holds the previou employment Id
        /// </summary>
        [ForeignKey("PreviousEmployment")]
        public int PreviousEmploymentId { get; set; }
    }
}
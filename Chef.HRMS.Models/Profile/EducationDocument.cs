using Chef.Common.Core;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    [TableType("junctiontable")]
    public class EducationDocument : Model
    {
        /// <summary>
        /// Holds the document Id
        /// </summary>
        [ForeignKey("Document")]
        public int DocumentId { get; set; }

        /// <summary>
        /// Holds the education Id
        /// </summary>
        [ForeignKey("Education")]
        public int EducationId { get; set; }
    }
}
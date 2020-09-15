using Chef.Common.Core;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    public class ExpenseDocument :Model
    {
        /// <summary>
        /// Holds the  expense request id
        /// </summary>
        [Description("id of expense request")]
        [ForeignKey("Expense")]
        public int ExpenseId { get; set; }

        /// <summary>
        /// Holds the  document id
        /// </summary>
        [Description("id of document")]
        [ForeignKey("Document")]
        public int DocumentId { get; set; }
    }
}

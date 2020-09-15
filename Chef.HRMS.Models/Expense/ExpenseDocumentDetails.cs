using System.ComponentModel;

namespace Chef.HRMS.Models
{
    public class ExpenseDocumentDetails
    {
        /// <summary>
        /// Holds the  expense request id
        /// </summary>
        [Description("id of expense request")]
        public int ExpenseId { get; set; }

        /// <summary>
        /// Holds the  expense document id
        /// </summary>
        [Description("id of expense document")]
        public int ExpenseDocumentId { get; set; }

        /// <summary>
        /// Holds the  document id
        /// </summary>
        [Description("id of document")]
        public int DocumentId { get; set; }

        /// <summary>
        /// Holds the extension of the file .pdf, .docx
        /// </summary>
        [Description("File extension")]
        public string Extension { get; set; }

        /// <summary>
        /// Holds the name of the file
        /// </summary>
        [Description("File name")]
        public string Name { get; set; }

        /// <summary>
        /// Holds the full file path
        /// </summary>
        [Description("File path")]
        public string Path { get; set; }
    }
}

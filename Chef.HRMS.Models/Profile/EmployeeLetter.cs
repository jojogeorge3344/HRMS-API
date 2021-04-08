using Chef.Common.Core;

namespace Chef.HRMS.Models
{
    public class EmployeeLetter : Model
    {
        /// <summary>
        /// Holds document name
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Holds document path
        /// </summary>
        public string Path { get; set; }

        /// <summary>
        /// Holds document type
        /// </summary>
        public DocumentType Type { get; set; }
    }
}
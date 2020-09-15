using Chef.Common.Core;

namespace Chef.HRMS.Models
{
    public class JobTitleView : Model
    {
        public string Description { get; set; }

        public string Name { get; set; }

        public int NumberOfEmployees { get; set; }
    }
}

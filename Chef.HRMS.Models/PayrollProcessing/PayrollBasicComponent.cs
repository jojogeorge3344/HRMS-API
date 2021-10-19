using Chef.Common.Core;
using Chef.HRMS.Types;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    public class PayrollBasicComponent : Model
    {
        public string EmployeeCode { get; set; }

        public string EmployeeName { get; set; }

        public string PayrollComponentName { get; set; }

        public string ShortCode { get; set; }

        [ForeignKey("PayrollProcessingMethod")]
        public int PayrollProcessingMethodId { get; set; }

        [ForeignKey("Employee")]
        public int EmployeeId { get; set; }

        [ForeignKey("PayrollComponent")]
        public int PayrollComponentId { get; set; }

        [ForeignKey("PayGroup")]
        public int PayGroupId { get; set; }

        [ForeignKey("PayrollStructure")]
        public int PayrollStructureId { get; set; }

        public PayrollProcessingStatus Status { get; set; }

        public float MonthlyAmount { get; set; }
    }
}

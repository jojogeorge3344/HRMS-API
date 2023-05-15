using Chef.Common.Core;
using Chef.HRMS.Types;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    public class PayrollCalculationViewModel : ViewModel
    {
        public int Id { get; set; }

        public string PayrollStructureName { get; set; }

        public string PayrollComponentName { get; set; }

        public string ShortCode { get; set; }

        public bool IsFixed { get; set; }

        public bool IsComputed { get; set; }

        public string Formula { get; set; }

        [ForeignKey("PayrollComponent")]
        public int PayrollComponentId { get; set; }

        [ForeignKey("PayrollStructure")]
        public int PayrollStructureId { get; set; }

        public bool IsCustomizedAndOverridenAtEmployeeLevel { get; set; }

        public float MaximumLimit { get; set; }
        public PayHeadContractValueType PayHeadContractValueType { get; set; }
        public PayHeadBaseUnitType PayHeadBaseUnitType { get; set; }
        public int Currency { get; set; }
    }
}

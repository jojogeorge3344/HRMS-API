using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Chef.Common.Types;

namespace Chef.HRMS.Models
{
    public class LogPayrollComponentConfiguration : Model
    {
        public ClaimFrequencyType ClaimFrequency { get; set; }
        public float ClaimLimit { get; set; }
        public string Description { get; set; }
        public bool IsCustomizedAndOverridenAtEmployeeLevel { get; set; }
        public bool IsDifferenceAmountAdjustable { get; set; }
        public bool IsLossOfPayAffected { get; set; }
        public bool IsPaidSeparately { get; set; }
        public bool IsPartOfArrearCalculation { get; set; }
        public bool IsPartOfEarningsAndDeductions { get; set; }
        public bool IsPartOfLossOfPayCalculation { get; set; }
        public bool IsProofRequired { get; set; }
        public bool IsRecurring { get; set; }
        public bool IsVisibleInPayslip { get; set; }
        public decimal MaximumLimit { get; set; }
        public string Name { get; set; }
        public PayoutPattern PayoutPattern { get; set; }
        public Chef.HRMS.Types.PayrollComponentType PayrollComponentType { get; set; }
        public int PayrollComponentId { get; set; }
        public int PayrollStructureId { get; set; }
        public string ShortCode { get; set; }
        public bool IsConfigured { get; set; }
        [Write(false)]
        [Skip(false)]
        [SqlKata.Ignore]
        public int CategoryId { get; set; }
        public int PayrollComponentConfigurationId { get; set; }
    }
}

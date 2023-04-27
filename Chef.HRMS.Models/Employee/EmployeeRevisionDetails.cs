using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Chef.Common.Core;
using Chef.Common.Types;
using Chef.HRMS.Types;

namespace Chef.HRMS.Models
{
    [Table("employeerevision")]
    public class EmployeeRevisionDetails : Model
    {
        public int EmployeeRevisionId { get; set; }

        public int PayrollComponentId { get; set; }

        public int PayrollStructureId { get; set; }

        public int PayrollCalculationId { get; set; }

        public Decimal MonthlyAmount { get; set; } 
    }

    public class EmployeeRevisionDetailsOld : EmployeeRevisionDetails
    {
        public int EmployeeRevisionDetailId { get; set; }
    }
}
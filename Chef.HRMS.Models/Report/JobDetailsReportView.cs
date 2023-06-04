using Chef.Common.Core;
using Chef.Common.Types;
using Chef.HRMS.Types;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Chef.Common.Core.Extensions;

namespace Chef.HRMS.Models
{
    public class JobDetailsReportView : ViewModel
    {
        public BusinessUnitType BusinessUnit { get; set; }
        public string BaseUnitType => EnumExtension.GetDescription(BusinessUnit);

        public DateTime DateOfJoin { get; set; }

        public DepartmentType Department { get; set; }
        public string DepartmentName => EnumExtension.GetDescription(Department);

        public int EmployeeId { get; set; }

        public int CompanyId { get; set; }

        public int BranchId { get; set; }

        public int JobTitleId { get; set; }

        public int NumberSeriesId { get; set; }

        public string EmployeeNumber { get; set; }

        public int Location { get; set; }

        public NoticePeriodType NoticePeriod { get; set; }
        public string NoticePeriodTypeName => EnumExtension.GetDescription(NoticePeriod);

        public PeriodType PeriodType { get; set; }
        public string PeriodName => EnumExtension.GetDescription(PeriodType);

        public int ProbationPeriod { get; set; }

        public int ReportingManager { get; set; }

        public string SecondaryJobTitle { get; set; }

        public TimeType TimeType { get; set; }
        public string TimeName => EnumExtension.GetDescription(TimeType);

        public WorkerType WorkerType { get; set; }
        public string WorkName => EnumExtension.GetDescription(WorkerType);


        public int CategoryId { get; set; }

        public int VisaDesignationId { get; set; }

        public string JobTitleName { get; set; }

        public string ReportingManagerName { get; set; }
    }
}

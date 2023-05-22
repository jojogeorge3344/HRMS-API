using Chef.HRMS.Repositories;
using Chef.HRMS.Repositories.PayrollProcessing.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services.PayrollProcessing.Service
{
    public class LeaveAccrualSummaryService
    {
        private readonly ILeaveAccrualSummaryRepository leaveAccrualSummaryRepository;

        public LeaveAccrualSummaryService(ILeaveAccrualSummaryRepository leaveAccrualSummaryRepository)
        {
            this.leaveAccrualSummaryRepository = leaveAccrualSummaryRepository;
        }

    }
}

using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class LeavePrintBoldReportService:BaseService,ILeavePrintBoldReportService
    {
        private readonly ILeavePrintBoldReportRepository leavePrintBoldReportRepository;
        public LeavePrintBoldReportService(ILeavePrintBoldReportRepository leavePrintBoldReportRepository)
        {
            this.leavePrintBoldReportRepository = leavePrintBoldReportRepository;
        }

        public async Task<IEnumerable<LeaveRequestPrintBoldReport>> GetLeaveRequestDetailsAsync(int id)
        {
            var result = await leavePrintBoldReportRepository.GetLeaveRequestDetailsAsync(id);
            return result;
        }

    }
}
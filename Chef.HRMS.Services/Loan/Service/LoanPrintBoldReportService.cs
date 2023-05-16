using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using Chef.Trading.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class LoanPrintBoldReportService: BaseService, ILoanPrintBoldReportService
    {
        private readonly ILoanPrintBoldReportRepository loanPrintBoldReportRepository;
        public LoanPrintBoldReportService(ILoanPrintBoldReportRepository loanPrintBoldReportRepository)
        {
            this.loanPrintBoldReportRepository = loanPrintBoldReportRepository;
        }
        public async Task<IEnumerable<LoanPrintBoldReport>> GetLoanDetailsAsync(int id)
        {
            var result = await loanPrintBoldReportRepository.GetLoanDetailsAsync(id);
            return result;
        }

    }
}

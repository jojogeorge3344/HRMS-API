﻿using Chef.Common.Services;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface ILoanPrintBoldReportService: IBaseService
    {
        Task<IEnumerable<LoanPrintBoldReport>> GetLoanDetailsAsync(int id);
    }
}
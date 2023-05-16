﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
	public interface IPayrollLoanDetailsRepository : IGenericRepository<PayrollLoanDetails>
	{
		Task<int> DeleteByPayrollProcessID (int payrollProcessID);
	}
}

using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
	public class PayrollComponentDetailsService : AsyncService<PayrollComponentDetails>, IPayrollComponentDetailsService
	{
		private readonly IPayrollComponentDetailsRepository payrollComponentDetailsRepository;
		public PayrollComponentDetailsService(IPayrollComponentDetailsRepository payrollComponentDetailsRepository)
		{
			this.payrollComponentDetailsRepository = payrollComponentDetailsRepository;
		}
		public async Task<int> DeleteByPayrollProcessID(int payrollProcessID,int stepNo)
		{
			return await payrollComponentDetailsRepository.DeleteByPayrollProcessID(payrollProcessID,stepNo);
		}
	}
}

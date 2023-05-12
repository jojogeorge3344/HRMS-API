using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class PayrollLeaveDetailsRepository : TenantRepository<PayrollLeaveDetails>, IPayrollLeaveDetailsRepository
    {
        public PayrollLeaveDetailsRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {

        }

        public async Task<int> DeleteByPayrollProcessID(int payrollProcessID)
        {
            string sql = @"UPDATE hrms.payrollleavedetails 
							SET isarchived = true 
							WHERE payrollprocessid = @payrollProcessID 
							AND processStatus != 1"; // PROCESS STATUS 1 IS PROCESSED

            return await Connection.ExecuteAsync(sql, new { payrollProcessID });
        }
    }
}

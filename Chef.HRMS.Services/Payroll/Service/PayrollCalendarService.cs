using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class PayrollCalendarService : AsyncService, IPayrollCalendarService
    {
        private readonly IPayrollCalendarRepository payrollCalendarRepository;

        public PayrollCalendarService(IPayrollCalendarRepository payrollCalendarRepository)
        {
            this.payrollCalendarRepository = payrollCalendarRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await payrollCalendarRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<PayrollCalendar>> GetAllAsync()
        {
            return await payrollCalendarRepository.GetAllAsync();
        }

        public async Task<PayrollCalendar> GetAsync(int id)
        {
            return await payrollCalendarRepository.GetAsync(id);
        }

        public async Task<PayrollCalendar> InsertAsync(PayrollCalendar payrollCalendar)
        {
            return await payrollCalendarRepository.InsertAsync(payrollCalendar);
        }

        public async Task<bool> IsDuplicateValueExists(string name)
        {
            return await payrollCalendarRepository.IsDuplicateValueExists(name);
        }

        public async Task<int> UpdateAsync(PayrollCalendar payrollCalendar)
        {
            return await payrollCalendarRepository.UpdateAsync(payrollCalendar);
        }
        public async Task<IEnumerable<int>> GetAllAssignedPayCalendar()
        {
            return await payrollCalendarRepository.GetAllAssignedPayCalendar();
        }
    }
}

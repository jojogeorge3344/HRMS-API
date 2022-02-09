using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class PayrollProcessingMethodService : AsyncService, IPayrollProcessingMethodService
    {
        private readonly IPayrollProcessingMethodRepository payrollProcessingMethodRepository;

        public PayrollProcessingMethodService(IPayrollProcessingMethodRepository payrollProcessingMethodRepository)
        {
            this.payrollProcessingMethodRepository = payrollProcessingMethodRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await payrollProcessingMethodRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<PayrollProcessingMethod>> GetAllAsync()
        {
            return await payrollProcessingMethodRepository.GetAllAsync();
        }

        public async Task<IEnumerable<PayrollReview>> GetAllPayrollReviewByProcessingMethodId(int payrollProcessingMethodId)
        {
            return await payrollProcessingMethodRepository.GetAllPayrollReviewByProcessingMethodId(payrollProcessingMethodId);
        }

        public async Task<IEnumerable<Employee>> GetAllUnProcessedEmployees(int year, int month)
        {
            return await payrollProcessingMethodRepository.GetAllUnProcessedEmployees(year, month);
        }

        public async Task<PayrollProcessingMethod> GetAsync(int id)
        {
            return await payrollProcessingMethodRepository.GetAsync(id);
        }

        public async Task<int> GetDetailsById(int employeeid,  int month, int year)
        {
            return await payrollProcessingMethodRepository.GetDetailsById(employeeid, month, year);
        }

        public async Task<IEnumerable<PayrollProcessingMethod>> GetPastSixMonthDetails()
        {
            return await payrollProcessingMethodRepository.GetPastSixMonthDetails();
        }

        public async Task<IEnumerable<PayrollReviewBreakup>> GetPayBreakUpByEmployeeId(int employeeId, int payrollProcessingMethodId)
        {
            return await payrollProcessingMethodRepository.GetPayBreakUpByEmployeeId(employeeId, payrollProcessingMethodId);
        }

        public async Task<PayrollProcessingMethod> InsertAsync(PayrollProcessingMethod payrollProcessingMethod)
        {
            return await payrollProcessingMethodRepository.InsertAsync(payrollProcessingMethod);
        }

        public async Task<int> InsertLOPDeduction(IEnumerable<LOPDeduction> lopDeduction)
        {
            return await payrollProcessingMethodRepository.InsertLOPDeduction(lopDeduction);
        }

        public async Task<string> InsertOrAlreadyExist(PayrollProcessingMethod payrollProcessingMethod)
        {
            return await payrollProcessingMethodRepository.InsertOrAlreadyExist(payrollProcessingMethod);
        }

        public async Task<int> UpadtePayrollProcessingStep(int payrollProcessingMethodId, int completedStep)
        {
            return await payrollProcessingMethodRepository.UpadtePayrollProcessingStep(payrollProcessingMethodId, completedStep);
        }

        public async Task<int> UpdateAsync(PayrollProcessingMethod payrollProcessingMethod)
        {
            return await payrollProcessingMethodRepository.UpdateAsync(payrollProcessingMethod);
        }
    }
}

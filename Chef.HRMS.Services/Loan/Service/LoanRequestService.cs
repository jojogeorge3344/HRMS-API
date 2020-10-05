﻿using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class LoanRequestService : AsyncService, ILoanRequestService
    {
        private readonly ILoanRequestRepository loanRequestRepository;

        public LoanRequestService(ILoanRequestRepository loanRequestRepository)
        {
            this.loanRequestRepository = loanRequestRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await loanRequestRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<LoanRequest>> GetAllAsync()
        {
            return await loanRequestRepository.GetAllAsync();
        }

        public async Task<IEnumerable<EmployeeLoanView>> GetAllLoanByEmployeeId(int employeeId, int payrollProcessingMethodId)
        {
            return await loanRequestRepository.GetAllLoanByEmployeeId(employeeId,payrollProcessingMethodId);
        }

        public async Task<IEnumerable<EmployeeLoanView>> GetAllLoanByPayrollProcessingMethodId(int payrollProcessingMethodId)
        {
            return await loanRequestRepository.GetAllLoanByPayrollProcessingMethodId(payrollProcessingMethodId);
        }

        public async Task<LoanRequest> GetAsync(int id)
        {
            return await loanRequestRepository.GetAsync(id);
        }

        public async Task<int> GetLoanLastRequestId()
        {
            return await loanRequestRepository.GetLoanLastRequestId();
        }

        public async Task<LoanRequest> InsertAsync(LoanRequest loanRequest)
        {
            return await loanRequestRepository.InsertAsync(loanRequest);
        }

        public async Task<int> UpdateAsync(LoanRequest loanRequest)
        {
            return await loanRequestRepository.UpdateAsync(loanRequest);
        }
    }
}
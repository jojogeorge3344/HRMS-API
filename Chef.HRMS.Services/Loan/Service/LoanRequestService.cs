using Chef.Common.Core.Services;
using Chef.Common.Repositories;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Models.Loan;
using Chef.HRMS.Repositories;
using Chef.HRMS.Repositories.Loan;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class LoanRequestService : AsyncService<LoanRequest>, ILoanRequestService
    {
        private readonly ILoanRequestRepository loanRequestRepository;
        private readonly ITenantSimpleUnitOfWork tenantSimpleUnitOfWork;
        private readonly ILoanRequestDetailRepository loanRequestDetailRepository; 

        public LoanRequestService(ILoanRequestRepository loanRequestRepository,ITenantSimpleUnitOfWork tenantSimpleUnitOfWork
            ,ILoanRequestDetailRepository loanRequestDetailRepository)
        {
            this.loanRequestRepository = loanRequestRepository;
            this.tenantSimpleUnitOfWork = tenantSimpleUnitOfWork;
            this.loanRequestDetailRepository = loanRequestDetailRepository;
        }

        public async Task<IEnumerable<EmployeeLoanView>> GetAllLoanByEmployeeId(int employeeId, int payrollProcessingMethodId)
        {
            return await loanRequestRepository.GetAllLoanByEmployeeId(employeeId, payrollProcessingMethodId);
        }

        public async Task<IEnumerable<EmployeeLoanView>> GetAllLoanByPayrollProcessingMethodId(int payrollProcessingMethodId)
        {
            return await loanRequestRepository.GetAllLoanByPayrollProcessingMethodId(payrollProcessingMethodId);
        }

        public async Task<LoanRequest> GetLoanDetails(int id)
        {
            LoanRequest loanRequest = new LoanRequest();

            var loanRequests = await loanRequestRepository.GetAsync(id);
            loanRequest = loanRequests;
            var loanDetails = await loanRequestDetailRepository.GetLoanDetailsByLoanRequestId(id);
            loanRequest.LoanRequestDeatails = loanDetails.ToList();

            return loanRequest;
        }

        public async Task<int> GetLoanLastRequestId()
        {
            return await loanRequestRepository.GetLoanLastRequestId();
        }

        public async Task<LoanRequestDetailsView> GetLoanRequestDetails(int loanId)
        {
            return await loanRequestRepository.GetLoanRequestDetails(loanId);
        }

        public async Task<IEnumerable<LoanRequestedViewModel>> GetRequestedDateByEmployeeId(int employeeId)
        {
            return await loanRequestRepository.GetRequestedDateByEmployeeId(employeeId);
        }

        public async Task<int> InsertLoan(LoanRequest loanRequest)
        {
            tenantSimpleUnitOfWork.BeginTransaction();
            int loanRequestId = 0;

            try
            {
                loanRequestId = await loanRequestRepository.InsertAsync(loanRequest);

                if(loanRequest.LoanRequestDeatails != null)
                {
                    loanRequest.LoanRequestDeatails.ForEach(x => x.LoanRequestId = loanRequestId);
                    await loanRequestDetailRepository.BulkInsertAsync(loanRequest.LoanRequestDeatails);
                }

                tenantSimpleUnitOfWork.Commit();
                return loanRequestId;
            }

            catch (Exception ex)
            {
                tenantSimpleUnitOfWork.Rollback();
                return loanRequestId;
            }
        }
    }
}
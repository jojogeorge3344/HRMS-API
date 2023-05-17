using Chef.Common.Core.Services;
using Chef.Common.Models;
﻿using Castle.Core;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Models.PayrollProcessing;
using Chef.HRMS.Repositories;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class PayrollProcessingMethodService : AsyncService<PayrollProcessingMethod>, IPayrollProcessingMethodService
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

        public async Task<IEnumerable<HRMSEmployee>> GetAllUnProcessedEmployees(int year, int month)
        {
            return await payrollProcessingMethodRepository.GetAllUnProcessedEmployees(year, month);
        }

        public async Task<PayrollProcessingMethod> GetAsync(int id)
        {
            return await payrollProcessingMethodRepository.GetAsync(id);
        }

        public async Task<int> GetDetailsById(int employeeid, int month, int year)
        {
            return await payrollProcessingMethodRepository.GetDetailsById(employeeid, month, year);
        }

        public async Task<IEnumerable<PayrollProcessingMethod>> GetDetailsByPaygroupId(int paygroupid, int prevmonth, int prevyear)
        {
            return await payrollProcessingMethodRepository.GetDetailsByPaygroupId(paygroupid, prevmonth, prevyear);
        }

        public async Task<IEnumerable<PayrollProcessingMethod>> GetEmployeeDetails(int employeeid, int paygroupid)
        {
            return await payrollProcessingMethodRepository.GetEmployeeDetails(employeeid, paygroupid);
        }

        public async Task<IEnumerable<PayrollProcessingMethod>> GetPastSixMonthDetails()
        {
            return await payrollProcessingMethodRepository.GetPastSixMonthDetails();
        }

        public async Task<IEnumerable<PayrollReviewBreakup>> GetPayBreakUpByEmployeeId(int employeeId, int payrollProcessingMethodId)
        {
            return await payrollProcessingMethodRepository.GetPayBreakUpByEmployeeId(employeeId, payrollProcessingMethodId);
        }

        public async Task<IEnumerable<PayrollMonth>> GetPayrollProcessingMonth(int paygroupId)
        {
            return await payrollProcessingMethodRepository.GetPayrollProcessingMonth(paygroupId);
        }

        public async Task<int> InsertAsync(PayrollProcessingMethod payrollProcessingMethod)
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

        public async Task<int> InsertPayrollFixedComponentDetaisl(int payrollProcessId, DateTime payrollprocessdate, int paygroupid)
        {
            return await payrollProcessingMethodRepository.InsertPayrollFixedComponentDetails(payrollProcessId,payrollprocessdate, paygroupid);
        }

        public async Task<IEnumerable<PayrollSummary>> GetPayrollComponentsSummary(int payrollprocessid)
        {
            List<PayrollSummary> payrollSummaries = new List<PayrollSummary>();
            var payrollComponentDetails = await payrollProcessingMethodRepository.GetPayrollComponentsSummary(payrollprocessid);
            var empIdList = payrollComponentDetails.Select(e => e.EmployeeId).Distinct();
            foreach (var empId in empIdList)
            {
                PayrollSummary payrollSummary = new PayrollSummary();

                payrollSummary.PayrollComponentDetails = payrollComponentDetails.Where(x => x.EmployeeId == empId).ToList();
                payrollSummary.TotalDeductions = payrollSummary.PayrollComponentDetails.Sum(c=>c.DeductionAmt);
                payrollSummary.EmployeeName = payrollSummary.PayrollComponentDetails.First().EmployeeName;
                payrollSummary.EmployeeCode = payrollSummary.PayrollComponentDetails.First().EmployeeCode;
                payrollSummary.EmployeeId = empId;
                payrollSummary.TotalEarnings = payrollSummary.PayrollComponentDetails.Sum(c => c.EarningsAmt);
                payrollSummary.NetSalaryAmount = payrollSummary.TotalEarnings - payrollSummary.TotalDeductions;
                payrollSummaries.Add(payrollSummary);
            }
            return payrollSummaries; 
        }
    }
}

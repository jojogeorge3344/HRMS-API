using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Chef.HRMS.Models.PayrollProcessing;
using Chef.HRMS.Repositories;
using Chef.HRMS.Services.PayrollProcessing.Interface;
using System;
using System.Linq;

namespace Chef.HRMS.Services;

public class EmployeeEncashmentService : AsyncService<EmployeeEncashment>, IEmployeeEncashmentService
{
    private readonly IEmployeeEncashmentRepository encashmentRepository;
    private readonly ITenantSimpleUnitOfWork tenantSimpleUnitOfWork;
    private readonly IEmployeeEncashmentDetailsRepository encashmentDetailsRepository;
    private readonly ILeaveAccrualSummaryRepository leaveAccrualSummaryRepository;
    private readonly ILeaveAccrualRepository leaveAccrualRepository;
    private readonly ILeaveAccrualService leaveAccrualService;
    private readonly IEOSAccrualService eOSAccrualService;
    private readonly ITicketAccrualService ticketAccrualService;
    private readonly IPayrollComponentDetailsRepository paymentComponentDetailsRepository;

    public EmployeeEncashmentService
        (IEmployeeEncashmentRepository encashmentRepository,
        ITenantSimpleUnitOfWork tenantSimpleUnitOfWork,
        IEmployeeEncashmentDetailsRepository encashmentDetailsRepository,
        ILeaveAccrualSummaryRepository leaveAccrualSummaryRepository,
        ILeaveAccrualRepository leaveAccrualRepository,
        ILeaveAccrualService leaveAccrualService,
        IEOSAccrualService eOSAccrualService,
        ITicketAccrualService ticketAccrualService,
        IPayrollComponentDetailsRepository paymentComponentDetailsRepository)
    {
        this.encashmentRepository = encashmentRepository;
        this.tenantSimpleUnitOfWork = tenantSimpleUnitOfWork;
        this.encashmentDetailsRepository = encashmentDetailsRepository;
        this.leaveAccrualSummaryRepository = leaveAccrualSummaryRepository;
        this.leaveAccrualRepository = leaveAccrualRepository;
        this.leaveAccrualService = leaveAccrualService;
        this.eOSAccrualService = eOSAccrualService;
        this.ticketAccrualService = ticketAccrualService;
        this.paymentComponentDetailsRepository = paymentComponentDetailsRepository;
    }

    public async Task<FianlSettlementLeaveBalanceView> GetLeaveBalanceDetails(DateTime fromDate, DateTime toDate, int employeeId)
    {
        FianlSettlementLeaveBalanceView leaveBalanceView = new FianlSettlementLeaveBalanceView();
        decimal annualLeave = await encashmentRepository.GetFinalLeaveBalance(fromDate, toDate, employeeId);
        leaveBalanceView.AnnualLeaveBalance = annualLeave;
        decimal eos = await encashmentRepository.GetEOSBalanceDays(fromDate, toDate, employeeId);
        leaveBalanceView.EOSBalanceDays = eos;
        decimal ticket = await encashmentRepository.GetFinalTicketAmountBalance(fromDate, toDate, employeeId);
        leaveBalanceView.AccruedTicketAmt = ticket;

        return leaveBalanceView;
    }

    public async Task<EmployeeEncashmentComponentView> GetEmployeeEncashmentComponents(int employeeId)
    {
        EmployeeEncashmentComponentView employeeEncashmentComponentView = new EmployeeEncashmentComponentView();
        var leaveDetails = await encashmentRepository.GetLeaveDetailsByEmployeeId(employeeId);
        if (leaveDetails != null)
        {
            employeeEncashmentComponentView.LeaveComponentId = leaveDetails.LeaveComponentId;
            employeeEncashmentComponentView.LeaveComponentCode = leaveDetails.LeaveComponentCode;
            employeeEncashmentComponentView.LeaveComponentName = leaveDetails.LeaveComponentName;
            employeeEncashmentComponentView.LeaveBalanceAmount = leaveDetails.LeaveBalanceAmount;
        }
        var eosDetails = await encashmentRepository.GetEOSDetailsByEmployeeId(employeeId);
        if (eosDetails != null)
        {
            employeeEncashmentComponentView.EOSId = eosDetails.EOSId;
            employeeEncashmentComponentView.EOSCode = eosDetails.EOSCode;
            employeeEncashmentComponentView.EOSName = eosDetails.EOSName;
            employeeEncashmentComponentView.EOSAmount = eosDetails.EOSAmount;
        }
        var ticketDetails = await encashmentRepository.GetTicketDetailsByEmployeeId(employeeId);
        if (ticketDetails != null)
        {
            employeeEncashmentComponentView.TicketComponentId = ticketDetails.TicketComponentId;
            employeeEncashmentComponentView.TicketComponentCode = ticketDetails.TicketComponentCode;
            employeeEncashmentComponentView.TicketComponentName = ticketDetails.TicketComponentName;
            employeeEncashmentComponentView.TicketBalanceAmount = ticketDetails.TicketBalanceAmount;
        }

        return employeeEncashmentComponentView;
    }

    public async Task<int> EmployeeEncashmentInsert(EmployeeEncashment employeeEncashment)
    {
        tenantSimpleUnitOfWork.BeginTransaction();
        try
        {
            int encashmentId = await encashmentRepository.InsertAsync(employeeEncashment);
            employeeEncashment.RequestNum = "REQ-" + encashmentId;
            employeeEncashment.Id = encashmentId;
            var update = await encashmentRepository.UpdateAsync(employeeEncashment);

            if (employeeEncashment.EmployeeEncashmentDetails != null)
            {
                employeeEncashment.EmployeeEncashmentDetails.ForEach(x => x.EmployeeEncashmentId = encashmentId);
                await encashmentDetailsRepository.BulkInsertAsync(employeeEncashment.EmployeeEncashmentDetails);
            }
            tenantSimpleUnitOfWork.Commit();
            return encashmentId;
        }

        catch (Exception ex)
        {
            tenantSimpleUnitOfWork.Rollback();
            return 0;
        }
    }

    public async Task<int> EmployeeEncashmentUpdate(EmployeeEncashment employeeEncashment)
    {
        tenantSimpleUnitOfWork.BeginTransaction();
        try
        {
            int encashment = await encashmentRepository.UpdateAsync(employeeEncashment);

            await encashmentDetailsRepository.DeleteByEncashmentId(employeeEncashment.Id);

            if (employeeEncashment.EmployeeEncashmentDetails != null)
            {
                employeeEncashment.EmployeeEncashmentDetails.ForEach(x => x.EmployeeEncashmentId = employeeEncashment.Id);
                await encashmentDetailsRepository.BulkInsertAsync(employeeEncashment.EmployeeEncashmentDetails);
            }
            tenantSimpleUnitOfWork.Commit();
            return encashment;
        }
        catch (Exception ex)
        {
            tenantSimpleUnitOfWork.Rollback();
            return 0;
        }
    }

    public async Task<IEnumerable<EmployeeEncashment>> GetEmployeeEncashmentList()
    {
        return await encashmentRepository.GetEmployeeEncashmentList();
    }

    public async Task<int> EmployeeEncashmentDelete(int encashmentId)
    {
        tenantSimpleUnitOfWork.BeginTransaction();
        try
        {
            var encashment = await encashmentRepository.GetAsync(encashmentId);

            if (encashment != null)
            {
                int encashmentDelete = await encashmentRepository.DeleteAsync(encashmentId);
                var encashmentDetails = await encashmentDetailsRepository.GetByEncashmentId(encashmentId);

                foreach (EmployeeEncashmentDetails details in encashmentDetails)
                {
                    await encashmentDetailsRepository.DeleteAsync(details.Id);
                }
            }
            tenantSimpleUnitOfWork.Commit();
            return 1;
        }
        catch (Exception ex)
        {
            tenantSimpleUnitOfWork.Rollback();
            return 0;
        }
    }

    public async Task<EmployeeEncashment> GetEmployeeEncashmentById(int id)
    {
        EmployeeEncashment encashment = new EmployeeEncashment();
        encashment = await encashmentRepository.GetAsync(id);
        var encashmentDetails = await encashmentDetailsRepository.GetByEncashmentId(id);
        encashment.EmployeeEncashmentDetails = encashmentDetails.ToList();

        return encashment;
    }

    public async Task<int> EmployeeEncashmentProcess(EmployeeEncashment employeeEncashment)
    {
        tenantSimpleUnitOfWork.BeginTransaction();
        int processstatus = 0;
        try
        {
            if (employeeEncashment != null)
            {
                //Method for process status update
                int encashmentProcessStatus = (int)employeeEncashment.ProcessStatus;
                await encashmentRepository.UpadteEncashmentProcessStatus(employeeEncashment.Id, encashmentProcessStatus);

                //Calculate leave accrual
                //PreviousAccrualLeave for find latest leaveid
                var previousAccrualLeave = await leaveAccrualSummaryRepository.GetPreviousAccrualSummary(employeeEncashment.EmployeeId);
                if (previousAccrualLeave != null)
                {
                    LeaveAccrual leaveAvailedDetails = new LeaveAccrual();
                    leaveAvailedDetails.EmployeeId = employeeEncashment.EmployeeId;
                    leaveAvailedDetails.AvailDays = employeeEncashment.ApprovedAnnualLeave;
                    leaveAvailedDetails.LeaveId = previousAccrualLeave.LeaveId;
                    //Inserting to leaveaccrual table and leaveaccrualsummary table
                    int leaveAccrual = await leaveAccrualService.GenerateLeaveAvailed(leaveAvailedDetails);
                }
                else
                {
                    throw new Exception("Previous accrual leave details is null");
                }

                //Calculate EOS accrual days
                EOSAccrual endOfServiceAvailed = new EOSAccrual();
                endOfServiceAvailed.EmployeeId = employeeEncashment.EmployeeId;
                endOfServiceAvailed.AvailDays = employeeEncashment.ApprovedEOSDays;
                //Inserting to EOSaccrual table and EOSaccrualsummary table
                int eosAccrual = await eOSAccrualService.GenerateEndOfServiceAvailed(endOfServiceAvailed);

                //Calculate Ticket accrual Amount
                TicketAccrual ticketAvailedDetails = new TicketAccrual();
                ticketAvailedDetails.EmployeeId = employeeEncashment.EmployeeId;
                ticketAvailedDetails.AvailAmount = employeeEncashment.ApprovedTicketAmt;
                //Inserting to ticketaccrual table and ticketaccrualsummary table
                int ticketAccrual = await ticketAccrualService.GenerateTicketAvailed(ticketAvailedDetails);

                //Inserting to common table(payrollcomponetdetails table)
                if (employeeEncashment.EmployeeEncashmentDetails != null)
                {
                    List<PayrollComponentDetails> payrollComponent = employeeEncashment.EmployeeEncashmentDetails.Select(x => new PayrollComponentDetails()
                    {
                        PayrollProcessId = 0,
                        PayrollProcessDate = employeeEncashment.ProcessDate,
                        ProcessStatus = (int)employeeEncashment.ProcessStatus,
                        CrAccount = 0,
                        DrAccount = 0,
                        DeductionAmt = 0,
                        DocNum = "",
                        EarningsAmt = x.ComponentAmt,
                        EmployeeId = employeeEncashment.EmployeeId,
                        PayrollComponentId = x.PayrollComponentId,
                        CreatedBy = x.CreatedBy,
                        ModifiedBy = x.ModifiedBy,
                        CreatedDate = x.CreatedDate,
                        ModifiedDate = x.ModifiedDate,
                        IsArchived = x.IsArchived,
                        StepNo = 0,
                        FinalSettlementId = 0,
                        EmployeeEncashmentId = employeeEncashment.Id,
                    }).ToList();
                    await paymentComponentDetailsRepository.BulkInsertAsync(payrollComponent);
                }
                else
                {
                    throw new Exception("Employee encashment details list is null");
                }
            }
            tenantSimpleUnitOfWork.Commit();
            return processstatus;
        }
        catch (Exception ex)
        {
            tenantSimpleUnitOfWork.Rollback();
            return processstatus;
        }
    }
}

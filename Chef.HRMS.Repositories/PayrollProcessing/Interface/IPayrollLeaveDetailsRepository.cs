namespace Chef.HRMS.Repositories;

public interface IPayrollLeaveDetailsRepository : IGenericRepository<PayrollLeaveDetails>
{
    Task<int> DeleteByPayrollProcessID(int payrollProcessID);
}

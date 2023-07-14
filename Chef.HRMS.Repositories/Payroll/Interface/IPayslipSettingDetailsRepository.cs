namespace Chef.HRMS.Repositories;

public interface IPayslipSettingDetailsRepository : IGenericRepository<PayslipSettingDetails>
{
    Task<int> DeleteByPayslipSettingId(int payslipSettingId);
    Task<IEnumerable<PayslipSettingDetails>> GetPayslipSettingsDetailsByPayslipSettingsId(int id);
}

namespace Chef.HRMS.Repositories;

public interface IPayslipConfigurationFieldsRepository : IGenericRepository<PayslipConfigurationFields>
{
    public Task<int> UpdatePayslipConfigurationFieldsAsync(IEnumerable<PayslipConfigurationFields> payslipConfigurationFields);
}

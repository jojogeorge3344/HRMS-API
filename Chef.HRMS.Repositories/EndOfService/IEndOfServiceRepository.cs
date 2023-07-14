namespace Chef.HRMS.Repositories;

public interface IEndOfServiceRepository : IGenericRepository<EndOfService>
{
    Task<IEnumerable<BenefitTypes>> GetEmployeeEOSAccrualType();
    Task<IEnumerable<BenefitTypes>> GetEmployeeEOSpaymentType();
    Task<bool> IsBFCodeExist(string code);
}

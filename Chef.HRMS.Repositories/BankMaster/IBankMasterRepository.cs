namespace Chef.HRMS.Repositories;

public interface IBankMasterRepository : IGenericRepository<HRMSBank>
{
    Task<bool> IsBankCodeExist(string code);
    Task<bool> IsBankNameExist(string name);
}

namespace Chef.HRMS.Repositories;

public interface IWPSUserRepository : IGenericRepository<WPSUser>
{
    Task<IEnumerable<WPSUser>> GetAllByemployeeId(int employeeId);

    //Task<int> Update(WPSUser wpsUser);
    Task<IEnumerable<HRMSBank>> GetBank();

}

namespace Chef.HRMS.Repositories;

public interface IMyProfileRepository : IGenericRepository<MyProfileView>
{
    Task<MyProfileView> GetMyProfileDetailsAsync(int employeeId);
}

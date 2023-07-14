namespace Chef.HRMS.Repositories;

public interface IReligionRepository : IGenericRepository<Religion>
{
    Task<bool> IsReligionCodeExist(string code);
    Task<bool> IsReligionNameExist(string name);
}

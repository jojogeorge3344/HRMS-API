namespace Chef.HRMS.Repositories;

public interface IWorkFromHomeSettingsRepository : IGenericRepository<WorkFromHomeSettings>
{
    Task<WorkFromHomeSettings> GetTopOneWorkFromHomeSettings();
}

using Chef.Common.Core.Services;

namespace Chef.HRMS.Repositories;

public interface IUserVariableRepository : IAsyncService<Models.UserVariable>
{
    Task<bool> IsUserVariableExist(string code);

}

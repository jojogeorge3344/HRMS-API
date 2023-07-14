using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class SystemVariableService : AsyncService<SystemVariable>, ISystemVariableService
{
    private readonly ISystemVariableRepository systemVariableRepository;

    public SystemVariableService(ISystemVariableRepository systemVariableRepository)
    {
        this.systemVariableRepository = systemVariableRepository;
    }
}

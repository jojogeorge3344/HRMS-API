using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class RoleService : AsyncService<Role>, IRoleService
{
    private readonly IRoleRepository roleRepository;

    public RoleService(IRoleRepository roleRepository)
    {
        this.roleRepository = roleRepository;
    }
}
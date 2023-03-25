using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class SystemVariableService : AsyncService<SystemVariable>, ISystemVariableService
    {
        private readonly ISystemVariableRepository systemVariableRepository;

        public SystemVariableService(ISystemVariableRepository systemVariableRepository)
        {
            this.systemVariableRepository = systemVariableRepository;
        }
    }
}

using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class UserVariableService : AsyncService<UserVariable>, IUserVariableService
    {
        private readonly IUserVariableRepository userVariableRepository;

        public UserVariableService(IUserVariableRepository userVariableRepository)
        {
            this.userVariableRepository = userVariableRepository;
        }

        public async Task<bool> IsUserVariableExist(string code)
        {
            return await userVariableRepository.IsUserVariableExist(code);
        }
    }
}

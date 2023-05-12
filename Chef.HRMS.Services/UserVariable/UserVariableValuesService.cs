using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class UserVariableValuesService : AsyncService<UserVariableValues>, IUserVariableValuesService
    {
        private readonly IUserVariableValuesRepository userVariableValuesRepository;

        public UserVariableValuesService(IUserVariableValuesRepository userVariableValuesRepository)
        {
            this.userVariableValuesRepository = userVariableValuesRepository;
        }

        public async Task<IEnumerable<UserVariable>> GetUserVariables()
        {
            return await userVariableValuesRepository.GetUserVariables();
        }

        public new async Task<IEnumerable<UserVariable>> GetAllAsync()
        {
            return await userVariableValuesRepository.GetAllAsync();
        }
    }
}

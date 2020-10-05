﻿using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IAuthenticationRepository : IGenericRepository<Authentication>
    {
        Task<Authentication> Login(Authentication credentials);

        Task<bool> ResetPassword(Authentication credentials);
    }
}
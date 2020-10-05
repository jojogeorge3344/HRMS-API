﻿using Chef.Common.Repositories;
using Chef.HRMS.Models;

namespace Chef.HRMS.Repositories
{
    public class RoleRepository : GenericRepository<Role>, IRoleRepository
    {
        public RoleRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }
    }
}
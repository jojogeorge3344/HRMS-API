﻿using Chef.Common.Repositories;
using Chef.HRMS.Models;

namespace Chef.HRMS.Repositories
{
    public class UniqueIdentificationDocumentRepository : GenericRepository<UniqueIdentificationDocument>, IUniqueIdentificationDocumentRepository
    {
        public UniqueIdentificationDocumentRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }
    }
}
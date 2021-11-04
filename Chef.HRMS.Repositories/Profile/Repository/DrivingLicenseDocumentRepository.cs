﻿using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Microsoft.AspNetCore.Http;

namespace Chef.HRMS.Repositories
{
    public class DrivingLicenseDocumentRepository : GenericRepository<DrivingLicenseDocument>, IDrivingLicenseDocumentRepository
    {
        public DrivingLicenseDocumentRepository(IHttpContextAccessor httpContextAccessor, DbSession session) : base(httpContextAccessor, session)
        {
        }
    }
}

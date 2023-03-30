﻿using Chef.Common.Types;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IEmployeeDocumentService : IAsyncService<EmployeeDocument>
    {
        Task<IEnumerable<EmployeeDocument>> GetEmployeeId(int id);
        Task<IEnumerable<EmployeeDocumentAttachment>> GetAllByEmployeeId(int employeeId, int documentid);

    }
}

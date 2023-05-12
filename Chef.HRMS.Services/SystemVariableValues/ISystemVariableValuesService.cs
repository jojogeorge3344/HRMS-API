using Chef.Common.Models;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface ISystemVariableValuesService : IAsyncService<SystemVariableValues>
    {
        Task<string> InsertSystemVariableDetails(int PayGroupId);//, PayrollProcessingMethod systemVariableValues);
    }
}

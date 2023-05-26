using Chef.Common.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface ISystemVariableValuesRepository : IGenericRepository<SystemVariableValues>
    {
        Task<string> InsertSystemVariableDetails(int PayGroupId, int ppMId);//, PayrollProcessingMethod systemVariableValues);
        Task<IEnumerable<SystemVariableValues>> GetSystemVariableValuesByEmployeeId(int employeeId);
    }
}

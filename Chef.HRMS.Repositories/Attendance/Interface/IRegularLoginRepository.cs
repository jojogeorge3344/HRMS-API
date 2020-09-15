using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IRegularLoginRepository : IGenericRepository<RegularLogin>
    {
        Task<IEnumerable<RegularLogin>> GetAllAttendanceById(int employeeId);
        Task<decimal> GetAverageAttendanceById(int employeeId, int requestType);
        Task<decimal> GetAverageOnTimeDetails(int employeeId, int requestType);
        Task<IEnumerable<UserAttendanceViewModel>> GetAttendanceLog(int employeeId, DateTime startDate, DateTime endDate);
    }
}

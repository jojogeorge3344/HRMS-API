using Chef.Common.Core.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class ShiftService : AsyncService<Shift>, IShiftService
    {
        private readonly IShiftRepository shiftRepository;

        public ShiftService(IShiftRepository shiftRepository)
        {
            this.shiftRepository = shiftRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await shiftRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<Shift>> GetAllAsync()
        {
            return await shiftRepository.GetAllAsync();
        }

        public async Task<Shift> GetShiftByEmployeeId(int employeeId)
        {
            return await shiftRepository.GetShiftByEmployeeId(employeeId);
        }

        public async Task<Shift> GetAsync(int id)
        {
            return await shiftRepository.GetAsync(id);
        }

        public async Task<int> InsertAsync(Shift shift)
        {
            return await shiftRepository.InsertAsync(shift);
        }

        public async Task<int> UpdateAsync(Shift shift)
        {
            return await shiftRepository.UpdateAsync(shift);
        }

        public async Task<IEnumerable<int>> GetAllAssignedShift()
        {
            return await shiftRepository.GetAllAssignedShift();
        }
    }
}

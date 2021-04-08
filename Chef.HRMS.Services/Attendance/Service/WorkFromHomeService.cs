using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class WorkFromHomeService : IWorkFromHomeService
    {
        private readonly IWorkFromHomeRepository workFromHomeRepository;

        public WorkFromHomeService(IWorkFromHomeRepository workFromHomeRepository)
        {
            this.workFromHomeRepository = workFromHomeRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await workFromHomeRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<WorkFromHome>> GetAllAsync()
        {
            return await workFromHomeRepository.GetAllAsync();
        }

        public async Task<IEnumerable<WorkFromHome>> GetAllWorkFromHomeById(int employeeId)
        {
            return await workFromHomeRepository.GetAllWorkFromHomeById(employeeId);
        }

        public async Task<WorkFromHome> GetAsync(int id)
        {
            return await workFromHomeRepository.GetAsync(id);
        }

        public async Task<WorkFromHomeView> GetTotalRequestedDaysById(int employeeId)
        {
            return await workFromHomeRepository.GetTotalRequestedDaysById(employeeId);
        }

        public async Task<WorkFromHome> InsertAsync(WorkFromHome workFromHome)
        {
            return await workFromHomeRepository.InsertAsync(workFromHome);
        }

        public async Task<int> InsertNotifyPersonnel(IEnumerable<WorkFromHomeNotifyPersonnel> workFromHomeNotifyPersonnel)
        {
            return await workFromHomeRepository.InsertNotifyPersonnel(workFromHomeNotifyPersonnel);
        }

        public async Task<int> UpdateAsync(WorkFromHome workFromHome)
        {
            return await workFromHomeRepository.UpdateAsync(workFromHome);
        }
    }
}

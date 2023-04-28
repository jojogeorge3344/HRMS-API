using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services
{
    public class LeaveDocumentService : AsyncService<LeaveDocument>, ILeaveDocumentService
    {
        private readonly ILeaveDocumentRepository leaveDocumentRepository;

        public LeaveDocumentService(ILeaveDocumentRepository leaveDocumentRepository)
        {
            this.leaveDocumentRepository = leaveDocumentRepository;
        }

        public Task<int> DeleteAsync(int id)
        {
            return leaveDocumentRepository.DeleteAsync(id);
        }

        public Task<IEnumerable<LeaveDocument>> GetAllAsync()
        {
            return leaveDocumentRepository.GetAllAsync();
        }

        public Task<LeaveDocument> GetAsync(int id)
        {
            return leaveDocumentRepository.GetAsync(id);
        }

        public Task<int> InsertAsync(LeaveDocument leaveDocument)
        {
            return leaveDocumentRepository.InsertAsync(leaveDocument);
        }

        public Task<int> UpdateAsync(LeaveDocument leaveDocument)
        {
            return leaveDocumentRepository.UpdateAsync(leaveDocument);
        }
    }
}
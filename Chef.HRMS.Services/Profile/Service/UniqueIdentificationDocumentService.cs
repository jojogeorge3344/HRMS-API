using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class UniqueIdentificationDocumentService : AsyncService <UniqueIdentificationDocument>, IUniqueIdentificationDocumentService
    {
        private readonly IUniqueIdentificationDocumentRepository uniqueIdentificationDocumentRepository;

        public UniqueIdentificationDocumentService(IUniqueIdentificationDocumentRepository uniqueIdentificationDocumentRepository)
        {
            this.uniqueIdentificationDocumentRepository = uniqueIdentificationDocumentRepository;
        }

        public Task<int> DeleteAsync(int id)
        {
            return uniqueIdentificationDocumentRepository.DeleteAsync(id);
        }

        public Task<IEnumerable<UniqueIdentificationDocument>> GetAllAsync()
        {
            return uniqueIdentificationDocumentRepository.GetAllAsync();
        }

        public Task<UniqueIdentificationDocument> GetAsync(int id)
        {
            return uniqueIdentificationDocumentRepository.GetAsync(id);
        }

        public Task<int> InsertAsync(UniqueIdentificationDocument uniqueIdentificationDocument)
        {
            return uniqueIdentificationDocumentRepository.InsertAsync(uniqueIdentificationDocument);
        }

        public Task<int> UpdateAsync(UniqueIdentificationDocument uniqueIdentificationDocument)
        {
            return uniqueIdentificationDocumentRepository.UpdateAsync(uniqueIdentificationDocument);
        }
    }
}

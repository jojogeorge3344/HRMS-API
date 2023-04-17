using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class PANDocumentService : AsyncService<PANDocument>, IPANDocumentService
    {
        private readonly IPANDocumentRepository panDocumentRepository;

        public PANDocumentService(IPANDocumentRepository panDocumentRepository)
        {
            this.panDocumentRepository = panDocumentRepository;
        }

        public Task<int> DeleteAsync(int id)
        {
            return panDocumentRepository.DeleteAsync(id);
        }

        public Task<IEnumerable<PANDocument>> GetAllAsync()
        {
            return panDocumentRepository.GetAllAsync();
        }

        public Task<PANDocument> GetAsync(int id)
        {
            return panDocumentRepository.GetAsync(id);
        }

        public Task<int> InsertAsync(PANDocument panDocument)
        {
            return panDocumentRepository.InsertAsync(panDocument);
        }

        public Task<int> UpdateAsync(PANDocument panDocument)
        {
            return panDocumentRepository.UpdateAsync(panDocument);
        }
    }
}

using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class DocumentService : AsyncService, IDocumentService
    {
        private readonly IDocumentRepository documentRepository;

        public DocumentService(IDocumentRepository documentRepository)
        {
            this.documentRepository = documentRepository;
        }

        public Task<int> DeleteAsync(int id)
        {
            return documentRepository.DeleteAsync(id);
        }

        public Task<IEnumerable<Document>> GetAllAsync()
        {
            return documentRepository.GetAllAsync();
        }

        public Task<Document> GetAsync(int id)
        {
            return documentRepository.GetAsync(id);
        }

        public Task<Document> InsertAsync(Document document)
        {
            return documentRepository.InsertAsync(document);
        }

        public Task<int> UpdateAsync(Document document)
        {
            return documentRepository.UpdateAsync(document);
        }
    }
}
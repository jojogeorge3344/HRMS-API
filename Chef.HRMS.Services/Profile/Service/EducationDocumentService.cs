using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class EducationDocumentService : AsyncService<EducationDocument>, IEducationDocumentService
    {
        private readonly IEducationDocumentRepository educationDocumentRepository;

        public EducationDocumentService(IEducationDocumentRepository educationDocumentRepository)
        {
            this.educationDocumentRepository = educationDocumentRepository;
        }

        public Task<int> DeleteAsync(int id)
        {
            return educationDocumentRepository.DeleteAsync(id);
        }

        public Task<IEnumerable<EducationDocument>> GetAllAsync()
        {
            return educationDocumentRepository.GetAllAsync();
        }

        public Task<EducationDocument> GetAsync(int id)
        {
            return educationDocumentRepository.GetAsync(id);
        }

        public Task<int> InsertAsync(EducationDocument educationDocument)
        {
            return educationDocumentRepository.InsertAsync(educationDocument);
        }

        public Task<int> UpdateAsync(EducationDocument educationDocument)
        {
            return educationDocumentRepository.UpdateAsync(educationDocument);
        }
    }
}
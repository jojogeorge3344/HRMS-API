using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class DocumentTypeMasterService : AsyncService<DocumentTypeMaster>, IDocumentTypeMasterService
    {
        private readonly IDocumentTypeMasterRepository documentTypeMasterRepository;

        public DocumentTypeMasterService(IDocumentTypeMasterRepository documentTypeMasterRepository)
        {
            this.documentTypeMasterRepository = documentTypeMasterRepository;
        }

        public async Task<IEnumerable<DocumentTypeMasterView>> GetAllByEmployeeId(int employeeId)
        {
            return await documentTypeMasterRepository.GetAllByEmployeeId(employeeId);
        }

        public async Task<IEnumerable<DocumentTypeMaster>> GetEmployeeId(int id)
        {
            return await documentTypeMasterRepository.GetEmployeeId(id);
        }
    }
}

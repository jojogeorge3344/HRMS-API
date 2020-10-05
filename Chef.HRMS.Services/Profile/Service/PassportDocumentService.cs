﻿using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class PassportDocumentService : AsyncService, IPassportDocumentService
    {
        private readonly IPassportDocumentRepository passportDocumentRepository;

        public PassportDocumentService(IPassportDocumentRepository passportDocumentRepository)
        {
            this.passportDocumentRepository = passportDocumentRepository;
        }

        public Task<int> DeleteAsync(int id)
        {
            return passportDocumentRepository.DeleteAsync(id);
        }

        public Task<IEnumerable<PassportDocument>> GetAllAsync()
        {
            return passportDocumentRepository.GetAllAsync();
        }

        public Task<PassportDocument> GetAsync(int id)
        {
            return passportDocumentRepository.GetAsync(id);
        }

        public Task<PassportDocument> InsertAsync(PassportDocument passportDocument)
        {
            return passportDocumentRepository.InsertAsync(passportDocument);
        }

        public Task<int> UpdateAsync(PassportDocument passportDocument)
        {
            return passportDocumentRepository.UpdateAsync(passportDocument);
        }
    }
}
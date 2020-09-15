﻿using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class PANDocumentService : AsyncService, IPANDocumentService
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

        public Task<PANDocument> InsertAsync(PANDocument panDocument)
        {
            return panDocumentRepository.InsertAsync(panDocument);
        }

        public Task<int> UpdateAsync(PANDocument panDocument)
        {
            return panDocumentRepository.UpdateAsync(panDocument);
        }
    }
}

using Chef.Common.Models;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class CompanyService : ICompanyService
    {
        private readonly ICompanyRepository companyRepository;

        public CompanyService(ICompanyRepository companyRepository)
        {
            this.companyRepository = companyRepository;
        }

        public Task<int> DeleteAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<IEnumerable<HRMSCompany>> GetAllAsync()
        {
            throw new System.NotImplementedException();
        }

        public async Task<HRMSCompany> GetAsync()
        {
            return await companyRepository.GetAsync();
        }

        public Task<HRMSCompany> GetAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public async Task<IEnumerable<KeyValue>> GetBusinessTypeAsync()
        {
            return await Task.Run(() =>
            {
                IEnumerable<KeyValue> enums = ((BusinessType[])Enum.GetValues(typeof(BusinessType))).Select(c => new KeyValue() { Key = (int)c, Value = (EnumExtensions.GetDisplayName(c)) }).AsEnumerable<KeyValue>();
                return enums;
            });
        }

        public Task<HRMSCompany> InsertAsync(HRMSCompany obj)
        {
            throw new System.NotImplementedException();
        }

        public async Task<int> UpdateAsync(HRMSCompany company)
        {
            return await companyRepository.UpdateAsync(company);
        }
    }
}
using Chef.Common.Models;
using Chef.Common.Types;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Linq;

namespace Chef.HRMS.Services;

public class CompanyService : AsyncService<HRMSCompany>, ICompanyService
{
    private readonly ICompanyRepository companyRepository;

    public CompanyService(ICompanyRepository companyRepository)
    {
        this.companyRepository = companyRepository;
    }

    public async Task<HRMSCompany> GetAsync()
    {
        return await companyRepository.GetAsync();
    }

    public async Task<IEnumerable<KeyValue>> GetBusinessTypeAsync()
    {
        return await Task.Run(() =>
        {
            IEnumerable<KeyValue> enums = ((BusinessType[])Enum.GetValues(typeof(BusinessType))).Select(c => new KeyValue() { Key = (int)c, Value = (EnumExtensions.GetDisplayName(c)) }).AsEnumerable<KeyValue>();
            return enums;
        });
    }
}
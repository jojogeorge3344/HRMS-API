using Chef.Common.Models;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class SystemVariableValuesService : AsyncService<SystemVariableValues>, ISystemVariableValuesService
    {
        private readonly ISystemVariableValuesRepository systemVariableValuesRepository;
        private readonly IBulkUploadRepository bulkUploadRepository;
        public SystemVariableValuesService(ISystemVariableValuesRepository systemVariableValuesRepository, IBulkUploadRepository bulkUploadRepository)
        {
            this.systemVariableValuesRepository = systemVariableValuesRepository;
            this.bulkUploadRepository = bulkUploadRepository;
        }

        public async Task<string> InsertSystemVariableDetails(int PayGroupId)//, PayrollProcessingMethod systemVariableValues)
        {
            return await systemVariableValuesRepository.InsertSystemVariableDetails(PayGroupId);//, systemVariableValues);
            //bulkUploadRepository.BulkInsertSystemVariableValues()
            //List<SystemVariableValues> dd = new List<SystemVariableValues>();
            //var dvd = bulkUploadRepository.BulkInsertSystemVariableValues(dd);
        }
    }
}

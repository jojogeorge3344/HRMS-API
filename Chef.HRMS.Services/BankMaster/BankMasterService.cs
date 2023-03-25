using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class BankMasterService : AsyncService<HRMSBank>, IBankMasterService
    {
        private readonly IBankMasterRepository bankMasterRepository;

        public BankMasterService(IBankMasterRepository bankMasterRepository)
        {
            this.bankMasterRepository = bankMasterRepository;
        }
    }
}

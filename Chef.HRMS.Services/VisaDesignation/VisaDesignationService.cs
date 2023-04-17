using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class VisaDesignationService : AsyncService<VisaDesignation>, IVisaDesignationService
    {
        private readonly IVisaDesignationRepository visaDesignationRepository;

        public VisaDesignationService(IVisaDesignationRepository visaDesignationRepository)
        {
            this.visaDesignationRepository = visaDesignationRepository;
        }
    }
}

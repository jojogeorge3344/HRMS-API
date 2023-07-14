using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class VisaDesignationService : AsyncService<VisaDesignation>, IVisaDesignationService
{
    private readonly IVisaDesignationRepository visaDesignationRepository;

    public VisaDesignationService(IVisaDesignationRepository visaDesignationRepository)
    {
        this.visaDesignationRepository = visaDesignationRepository;
    }
}

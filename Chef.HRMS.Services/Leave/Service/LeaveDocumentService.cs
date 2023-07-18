using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class LeaveDocumentService : AsyncService<LeaveDocument>, ILeaveDocumentService
{
    private readonly ILeaveDocumentRepository leaveDocumentRepository;

    public LeaveDocumentService(ILeaveDocumentRepository leaveDocumentRepository)
    {
        this.leaveDocumentRepository = leaveDocumentRepository;
    }
}
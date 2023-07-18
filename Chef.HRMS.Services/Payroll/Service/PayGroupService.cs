using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class PayGroupService : AsyncService<PayGroup>, IPayGroupService
{
    private readonly IPayGroupRepository payGroupRepository;

    public PayGroupService(IPayGroupRepository payGroupRepository)
    {
        this.payGroupRepository = payGroupRepository;
    }

    public async Task<IEnumerable<int>> GetAllAssignedPayGroup()
    {
        return await payGroupRepository.GetAllAssignedPayGroup();
    }

    public async Task<IEnumerable<EmployeeView>> GetAllEmployeeByPayGroupId(int paygroupId, int year, int month)
    {
        return await payGroupRepository.GetAllEmployeeByPayGroupId(paygroupId, year, month);
    }
}

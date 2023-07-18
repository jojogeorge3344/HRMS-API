using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class ContactService : AsyncService<Contact>, IContactService
{
    private readonly IContactRepository contactRepository;

    public ContactService(IContactRepository contactRepository)
    {
        this.contactRepository = contactRepository;
    }

    public Task<IEnumerable<Contact>> GetAllByEmployeeId(int employeeId)
    {
        return contactRepository.GetAllByEmployeeId(employeeId);
    }
}
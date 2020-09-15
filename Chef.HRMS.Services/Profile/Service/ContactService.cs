using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class ContactService : AsyncService, IContactService
    {
        private readonly IContactRepository contactRepository;

        public ContactService(IContactRepository contactRepository)
        {
            this.contactRepository = contactRepository;
        }

        public Task<int> DeleteAsync(int id)
        {
            return contactRepository.DeleteAsync(id);
        }

        public Task<IEnumerable<Contact>> GetAllAsync()
        {
            return contactRepository.GetAllAsync();
        }

        public Task<IEnumerable<Contact>> GetAllByEmployeeId(int employeeId)
        {
            return contactRepository.GetAllByEmployeeId(employeeId);
        }

        public Task<Contact> GetAsync(int id)
        {
            return contactRepository.GetAsync(id);
        }

        public Task<Contact> InsertAsync(Contact contact)
        {
            return contactRepository.InsertAsync(contact);
        }

        public Task<int> UpdateAsync(Contact contact)
        {
            return contactRepository.UpdateAsync(contact);
        }
    }
}
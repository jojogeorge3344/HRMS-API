namespace Chef.HRMS.Repositories;

public interface IEmployeeDocumentRepository : IGenericRepository<EmployeeDocument>
{
    Task<IEnumerable<EmployeeDocument>> GetEmployeeId(int id);
    Task<IEnumerable<EmployeeDocumentAttachment>> GetAllByEmployeeId(int employeeId, int documentid);
    Task<bool> IsDocumentCodeExist(string documentnumber);
    Task<IEnumerable<DocumentDetail>> GetAllActiveDocumentsTypes();
}

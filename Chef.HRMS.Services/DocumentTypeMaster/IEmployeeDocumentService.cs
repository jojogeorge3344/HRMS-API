using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IEmployeeDocumentService : IAsyncService<EmployeeDocument>
{
    Task<IEnumerable<EmployeeDocument>> GetEmployeeId(int id);
    Task<IEnumerable<EmployeeDocumentAttachment>> GetAllByEmployeeId(int employeeId, int documentid);
    Task<bool> IsDocumentCodeExist(string documentnumber);
    Task<byte[]> GetPDFViewer(string filePath);
    //Task<string> ConvertPdfToHtml(byte[] pdfBytes);
    Task<IEnumerable<DocumentDetail>> GetAllActiveDocumentsTypes();
}

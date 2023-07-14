using Chef.Common.Models;

namespace Chef.HRMS.Services;

public interface IDMSService
{
    Task<string> SaveFileStream(DocumentFile documentFile, string token);
    Task<string> SaveAttachment(DocumentFile documentFile, string token);
    Task<string> GetAttachment(int fileId);
    Task<string> DeleteAttachment(int fileId);
}

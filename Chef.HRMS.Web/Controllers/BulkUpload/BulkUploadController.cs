using Chef.HRMS.Models;
using Chef.HRMS.Services;
using ExcelDataReader;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BulkUploadController : ControllerBase
    {
        private readonly IBulkUploadService bulkUploadService;

        public BulkUploadController(IBulkUploadService bulkUploadService)
        {
            this.bulkUploadService = bulkUploadService;
        }

        public T enumConverter<T>(object o)
        {
            T enumVal = (T)Enum.Parse(typeof(T), o.ToString());
            return enumVal;
        }
        [HttpPost("ExcelRead")]
        public async Task<IActionResult> ExcelRead(IFormFile file, [FromForm] string path, [FromForm] int type)
        {
            var fileName = path;
            if (file == null)
                return Content("file not selected");
            var uploadDetails = 0;
            if (file.Length > 0)
            {


                // For .net core, the next line requires the NuGet package, 
                // System.Text.Encoding.CodePages
                Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
                using (var stream = new MemoryStream())
                {
                    file.CopyTo(stream);
                    stream.Position = 0;
                    using (var reader = ExcelReaderFactory.CreateReader(stream))
                    {


                        if (type == 1)
                        {
                            List<Chef.HRMS.Models.Leave> leave = new List<Chef.HRMS.Models.Leave>();
                            while (reader.Read()) //Each row of the file
                            {
                                leave.Add(new Chef.HRMS.Models.Leave
                                {


                                });

                            }
                            uploadDetails = await bulkUploadService.BulkInsertLeave(leave);
                        }
                        else if (type == 2)
                        {
                            List<OnDuty> onDuty = new List<OnDuty>();
                            while (reader.Read()) //Each row of the file
                            {
                                var isHalfDay = reader?.GetValue(7)?.ToString();
                                var isFirstDayFirstHalf = true;
                                var isFirstDaySecondHalf = true;
                                var numbersOfDays = "1";
                                if (isHalfDay.ToLower() == "No")
                                {
                                    isHalfDay = "1";
                                    numbersOfDays = "1";
                                }
                                else
                                {
                                    isHalfDay = "0";
                                    numbersOfDays = "0.5";
                                    if (String.IsNullOrEmpty(reader?.GetValue(8)?.ToString()))
                                    {
                                        isFirstDayFirstHalf = false;
                                    }
                                    else
                                    {
                                        isFirstDaySecondHalf = false;
                                    }

                                }

                                onDuty.Add(new OnDuty
                                {
                                    EmployeeId = Convert.ToInt32(reader?.GetValue(0)),
                                    FromDate = Convert.ToDateTime(reader?.GetValue(3)),
                                    ToDate = Convert.ToDateTime(reader?.GetValue(3)),
                                    IsFullDay = Convert.ToBoolean(isHalfDay),
                                    IsFirstDayFirstHalf = isFirstDayFirstHalf,
                                    IsFirstDaySecondHalf = isFirstDaySecondHalf,
                                    IsSecondDayFirstHalf = false,
                                    IsSecondDaySecondHalf = false,
                                    NumberOfDays = Convert.ToDecimal(numbersOfDays),
                                    IsApproved = false,
                                    Reason = reader?.GetValue(10)?.ToString()


                                });

                            }
                            uploadDetails = await bulkUploadService.BulkInsertOnduty(onDuty);
                        }
                        else if (type == 3 || type == 4)
                        {
                            List<RegularLogin> regularLogin = new List<RegularLogin>();
                            var isRemoteLogin = false;
                            if (type == 3)
                            {
                                isRemoteLogin = true;

                            }
                            while (reader.Read()) //Each row of the file
                            {
                                regularLogin.Add(new RegularLogin
                                {
                                    EmployeeId = Convert.ToInt32(reader?.GetValue(0)?.ToString()),
                                    CheckInTime = Convert.ToDateTime(reader?.GetValue(4)),
                                    CheckOutTime = Convert.ToDateTime(reader?.GetValue(5)),
                                    IsRemoteLogin = isRemoteLogin


                                });

                            }
                            uploadDetails = await bulkUploadService.BulkInsertRegularLogin(regularLogin);
                        }
                        else if (type == 5)
                        {
                            List<WorkFromHome> workFromHome = new List<WorkFromHome>();
                            while (reader.Read()) //Each row of the file
                            {
                                var isHalfDay = reader?.GetValue(7)?.ToString();
                                var isFirstDayFirstHalf = true;
                                var isFirstDaySecondHalf = true;
                                var numbersOfDays = "1";
                                if (isHalfDay.ToLower() == "No")
                                {
                                    isHalfDay = "1";
                                    numbersOfDays = "1";
                                }
                                else
                                {
                                    isHalfDay = "0";
                                    numbersOfDays = "0.5";
                                    if (String.IsNullOrEmpty(reader?.GetValue(8)?.ToString()))
                                    {
                                        isFirstDayFirstHalf = false;
                                    }
                                    else
                                    {
                                        isFirstDaySecondHalf = false;
                                    }

                                }
                                workFromHome.Add(new WorkFromHome
                                {
                                    EmployeeId = Convert.ToInt32(reader?.GetValue(0)),
                                    FromDate = Convert.ToDateTime(reader?.GetValue(3)),
                                    ToDate = Convert.ToDateTime(reader?.GetValue(3)),
                                    IsFullDay = Convert.ToBoolean(isHalfDay),
                                    IsFirstDayFirstHalf = isFirstDayFirstHalf,
                                    IsFirstDaySecondHalf = isFirstDaySecondHalf,
                                    IsSecondDayFirstHalf = false,
                                    IsSecondDaySecondHalf = false,
                                    NumberOfDays = Convert.ToDecimal(numbersOfDays),
                                    IsApproved = false,
                                    Reason = reader?.GetValue(10)?.ToString()

                                });

                            }
                            uploadDetails = await bulkUploadService.BulkInsertWorkFromHome(workFromHome);
                        }
                    }
                }



            }
            return Ok(uploadDetails);
        }

        [HttpGet("ExportExcelFormat")]
        public async Task<ActionResult<byte[]>> ExportExcelFormat()
        {
            return await bulkUploadService.ExportExcelFormat();

        }
    }
}
using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SendEmailController : ControllerBase
{
    private readonly IEmailSendFactory emailSendFactory;
    private readonly IWebHostEnvironment hostingEnvironment;

    public SendEmailController(IEmailSendFactory emailSendFactory, IWebHostEnvironment hostingEnvironment)
    {
        this.emailSendFactory = emailSendFactory;
        this.hostingEnvironment = hostingEnvironment;
    }

    [HttpPost]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [Route("sendrevertemployeeemail")]
    public async Task<IActionResult> Insert(RevertEmployee RevertEmployee)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        string logoUrl = string.Empty;
        string ticks = DateTime.Now.ToString();
        string banner = string.Empty;
        string email = RevertEmployee.Email;
        string subject = $"Revert Employee  {ticks}";
        using (WebClient client = new WebClient())
        {
            string rootPath = hostingEnvironment.WebRootPath;
            string emailHtml = client.DownloadString(rootPath + "/RevertAttendanceEmail.html");
            banner = "https://thomsun.s3.ap-south-1.amazonaws.com/ThomsunBanner.jpg";
            logoUrl = "https://thomsun.s3.ap-south-1.amazonaws.com/logo.png";

            emailHtml = emailHtml.Replace("#Logo#", logoUrl);
            emailHtml = emailHtml.Replace("#Department#", RevertEmployee.Department);
            emailHtml = emailHtml.Replace("#BackgroundImg#", banner);
            emailHtml = emailHtml.Replace("#Ticks#", ticks);
            emailHtml = emailHtml.Replace("#Name#", RevertEmployee.EmployeeName);
            emailHtml = emailHtml.Replace("#EmployeeNumber#", RevertEmployee.EmployeeNumber);
            emailHtml = emailHtml.Replace("#Month#", RevertEmployee.Month);

            await emailSendFactory.SendEmailAsync(email, subject, emailHtml);

        }
        return Ok("Email send successfully.");
    }
}
using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Chef.HRMS.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace Chef.HRMS.Test;

public class JobFilingControllerTest : BaseTest
{
    private readonly Mock<IJobFilingService> mockService;
    private readonly JobFilingController jobFilingController;

    public JobFilingControllerTest()
    {
        mockService = new Mock<IJobFilingService>();
        jobFilingController = new JobFilingController(mockService.Object);
    }

    [Fact]
    public async void Get_WhenCalled_ReturnsOkResult()
    {
        //Arrange
        var id = 2;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(await Task.FromResult(GetMockJobFiling()));

        // Act
        var okResult = await jobFilingController.Get(id);

        // Assert
        Assert.IsType<OkObjectResult>(okResult.Result);
    }

    [Fact]
    public async void Get_WhenCalled_ReturnsNotFoundResult()
    {
        //Arrange
        var id = -1;

        // Act
        var notFoundResult = await jobFilingController.Get(id);

        // Assert
        Assert.IsType<NotFoundResult>(notFoundResult.Result);
    }

    [Fact]
    public async void GetAll_WhenCalled_ReturnsItems()
    {
        //Arrange
        mockService.Setup(repo => repo.GetAllAsync()).Returns(await Task.FromResult(GetMockJobFilingList()));

        // Act
        var okResult = await jobFilingController.GetAll();

        // Assert
        var result = okResult.Result as OkObjectResult;
        var items = Assert.IsType<List<JobFiling>>(result.Value);

        Assert.True(items.Count > 0);
    }

    [Fact]
    public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
    {
        //Arrange
        JobFiling jobFiling = GetMockJobFiling();
        mockService.Setup(service => service.InsertAsync(It.IsAny<JobFiling>())).Returns(await Task.FromResult(GetMockJobFiling()));

        // Act
        var createdResponse = await jobFilingController.Insert(jobFiling) as CreatedAtActionResult;
        var item = createdResponse.Value as JobFiling;

        // Assert
        Assert.IsType<JobFiling>(item);
        Assert.NotNull(createdResponse);
    }

    [Fact]
    public async void Remove_NotExistingLeave_ReturnsNotFoundResponse()
    {
        // Arrange
        var notExistingId = -1;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>()));

        // Act
        var badResponse = await jobFilingController.Delete(notExistingId);

        // Assert
        Assert.IsType<NotFoundResult>(badResponse.Result);
    }

    [Fact]
    public async void Remove_ExistingLeave_ReturnsOkResult()
    {
        // Arrange
        var existingId = 3;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(await Task.FromResult(GetMockJobFiling()));
        mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns(await Task.FromResult(1));

        // Act
        var okResult = await jobFilingController.Delete(existingId);

        // Assert
        Assert.IsType<OkObjectResult>(okResult.Result);
    }

    private static JobFiling GetMockJobFiling()
    {
        return new JobFiling()
        {
            AttendanceTracking = AttendanceTrackingType.WebCheckin,
            AttendanceCaptureScheme = AttendanceCaptureSchemeType.CXOAttendance,
            ExpensePolicyId = 1,
            ShiftId = 1,
            WeekOff = WeekOff.SaturdaysAndSundays
        };
    }

    private static IEnumerable<JobFiling> GetMockJobFilingList()
    {
        List<JobFiling> jobFilingList = new List<JobFiling>();
        JobFiling jobFiling = new JobFiling
        {
            AttendanceTracking = AttendanceTrackingType.WebCheckin,
            AttendanceCaptureScheme = AttendanceCaptureSchemeType.CXOAttendance,
            ExpensePolicyId = 1,
            ShiftId = 1,
            WeekOff = WeekOff.SaturdaysAndSundays
        };
        jobFilingList.Add(jobFiling);
        return jobFilingList;


    }
}

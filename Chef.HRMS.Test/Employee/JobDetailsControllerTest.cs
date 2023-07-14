using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Chef.HRMS.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace Chef.HRMS.Test;

public class JobDetailsControllerTest : BaseTest
{
    private readonly Mock<IJobDetailsService> mockService;
    private readonly JobDetailsController jobDetailsController;

    public JobDetailsControllerTest()
    {
        mockService = new Mock<IJobDetailsService>();
        jobDetailsController = new JobDetailsController(mockService.Object);
    }

    [Fact]
    public async void Get_WhenCalled_ReturnsOkResult()
    {
        //Arrange
        var id = 1;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(await Task.FromResult(GetMockJobDetails()));

        // Act
        var okResult = await jobDetailsController.Get(id);

        // Assert
        Assert.IsType<OkObjectResult>(okResult.Result);
    }

    [Fact]
    public async void Get_WhenCalled_ReturnsNotFoundResult()
    {
        //Arrange
        var id = -1;

        // Act
        var notFoundResult = await jobDetailsController.Get(id);

        // Assert
        Assert.IsType<NotFoundResult>(notFoundResult.Result);
    }

    [Fact]
    public async void GetAll_WhenCalled_ReturnsItems()
    {
        //Arrange
        mockService.Setup(repo => repo.GetAllAsync()).Returns(await Task.FromResult(GetMockJobDetailsList()));

        // Act
        var okResult = await jobDetailsController.GetAll();

        // Assert
        var result = okResult.Result as OkObjectResult;
        var items = Assert.IsType<List<JobDetails>>(result.Value);

        Assert.True(items.Count > 0);
    }

    [Fact]
    public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
    {
        //Arrange
        JobDetails jobDetails = GetMockJobDetails();
        mockService.Setup(service => service.InsertAsync(It.IsAny<JobDetails>())).Returns(await Task.FromResult(GetMockJobDetails()));

        // Act
        var createdResponse = await jobDetailsController.Insert(jobDetails) as CreatedAtActionResult;
        var item = createdResponse.Value as JobDetails; ;

        // Assert
        Assert.IsType<JobDetails>(item);
        Assert.NotNull(createdResponse);
    }

    [Fact]
    public async void Add_InvalidObjectPassed_ReturnsBadRequest()
    {
        //Arrange
        JobDetails nameMissingJobDetails = GetMockJobDetails();
        nameMissingJobDetails.EmployeeNumber = null;
        jobDetailsController.ModelState.AddModelError("ShortName", "Required");
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(await Task.FromResult(GetMockJobDetails()));

        // Act
        var badResponse = await jobDetailsController.Insert(nameMissingJobDetails);

        // Assert
        Assert.IsType<BadRequestObjectResult>(badResponse);
    }

    [Fact]
    public async void Remove_NotExistingJobDetails_ReturnsNotFoundResponse()
    {
        // Arrange
        var notExistingId = -1;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>()));

        // Act
        var badResponse = await jobDetailsController.Delete(notExistingId);

        // Assert
        Assert.IsType<NotFoundResult>(badResponse.Result);
    }

    [Fact]
    public async void Remove_ExistingJobDetails_ReturnsOkResult()
    {
        // Arrange
        var existingId = 3;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(await Task.FromResult(GetMockJobDetails()));
        mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns(await Task.FromResult(1));

        // Act
        var okResult = await jobDetailsController.Delete(existingId);

        // Assert
        Assert.IsType<OkObjectResult>(okResult.Result);
    }

    private static JobDetails GetMockJobDetails()
    {
        return new JobDetails()
        {
            Department = Common.Models.DepartmentType.Engineering,
            EmployeeNumber = "TIC005"
        };
    }
    private static IEnumerable<JobDetails> GetMockJobDetailsList()
    {
        List<JobDetails> jobDetailsList = new List<JobDetails>();
        JobDetails jobDetails = new JobDetails()
        {
            Department = Common.Models.DepartmentType.Engineering,
            EmployeeNumber = "TIC005"
        };
        jobDetailsList.Add(jobDetails);
        return jobDetailsList;
    }
}

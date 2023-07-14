using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Chef.HRMS.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace Chef.HRMS.Test;

public class PreviousEmploymentControllerTest : BaseTest
{
    private readonly Mock<IPreviousEmploymentService> mockService;
    private readonly PreviousEmploymentController previousEmploymentController;

    public PreviousEmploymentControllerTest()
    {
        mockService = new Mock<IPreviousEmploymentService>();
        previousEmploymentController = new PreviousEmploymentController(mockService.Object);
    }

    [Fact]
    public async void Get_WhenCalled_ReturnsOkResult()
    {
        //Arrange
        var id = 2;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(await Task.FromResult(GetMockPreviousEmployment()));

        // Act
        var okResult = await previousEmploymentController.Get(id);

        // Assert
        Assert.IsType<OkObjectResult>(okResult.Result);
    }

    [Fact]
    public async void Get_WhenCalled_ReturnsNotFoundResult()
    {
        //Arrange
        var id = -1;

        // Act
        var notFoundResult = await previousEmploymentController.Get(id);

        // Assert
        Assert.IsType<NotFoundResult>(notFoundResult.Result);
    }

    [Fact]
    public async void GetAll_WhenCalled_ReturnsItems()
    {
        //Arrange
        mockService.Setup(repo => repo.GetAllAsync()).Returns(await Task.FromResult(GetMockPreviousEmploymentList()));

        // Act
        var okResult = await previousEmploymentController.GetAll();

        // Assert
        var result = okResult.Result as OkObjectResult;
        var items = Assert.IsType<List<PreviousEmployment>>(result.Value);

        Assert.True(items.Count > 0);
    }

    [Fact]
    public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
    {
        PreviousEmployment previousEmployment = GetMockPreviousEmployment();
        mockService.Setup(service => service.InsertAsync(It.IsAny<PreviousEmployment>())).Returns(await Task.FromResult(GetMockPreviousEmployment()));

        // Act
        var createdResponse = await previousEmploymentController.Insert(previousEmployment) as CreatedAtActionResult;
        var item = createdResponse.Value as PreviousEmployment; ;

        // Assert
        Assert.IsType<PreviousEmployment>(item);
        Assert.NotNull(createdResponse);
    }

    [Fact]
    public async void Remove_NotExistingLeave_ReturnsNotFoundResponse()
    {
        // Arrange
        var notExistingId = -1;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>()));

        // Act
        var badResponse = await previousEmploymentController.Delete(notExistingId);

        // Assert
        Assert.IsType<NotFoundResult>(badResponse.Result);
    }

    [Fact]
    public async void Remove_ExistingLeave_ReturnsOkResult()
    {
        // Arrange
        var existingId = 3;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(await Task.FromResult(GetMockPreviousEmployment()));
        mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns(await Task.FromResult(1));

        // Act
        var okResult = await previousEmploymentController.Delete(existingId);

        // Assert
        Assert.IsType<ActionResult<int>>(okResult);
    }

    private static PreviousEmployment GetMockPreviousEmployment()
    {
        return new PreviousEmployment()
        {
            Id = 1,
            EmployeeId = 1,

        };
    }

    private static IEnumerable<PreviousEmployment> GetMockPreviousEmploymentList()
    {
        List<PreviousEmployment> previousEmploymentList = new List<PreviousEmployment>();
        PreviousEmployment previousEmployment = new PreviousEmployment
        {
            Id = 1,
            EmployeeId = 1,

        };
        previousEmploymentList.Add(previousEmployment);
        return previousEmploymentList;
    }
}

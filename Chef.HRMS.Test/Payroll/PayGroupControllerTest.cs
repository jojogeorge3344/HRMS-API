using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Chef.HRMS.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace Chef.HRMS.Test;

public class PayGroupControllerTest : BaseTest
{
    private readonly Mock<IPayGroupService> mockService;
    private readonly PayGroupController payGroupController;

    public PayGroupControllerTest()
    {
        mockService = new Mock<IPayGroupService>();
        payGroupController = new PayGroupController(mockService.Object);
    }

    [Fact]
    public async void Get_WhenCalled_ReturnsOkResult()
    {
        //Arrange
        var id = 2;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(await Task.FromResult(GetMockPayGroup()));

        // Act
        var okResult = await payGroupController.Get(id);

        // Assert
        Assert.IsType<OkObjectResult>(okResult.Result);
    }

    [Fact]
    public async void Get_WhenCalled_ReturnsNotFoundResult()
    {
        //Arrange
        var id = -1;

        // Act
        var notFoundResult = await payGroupController.Get(id);

        // Assert
        Assert.IsType<NotFoundResult>(notFoundResult.Result);
    }

    [Fact]
    public async void GetAll_WhenCalled_ReturnsItems()
    {
        //Arrange
        mockService.Setup(repo => repo.GetAllAsync()).Returns(await Task.FromResult(GetMockPayGroupList()));

        // Act
        var okResult = await payGroupController.GetAll();

        // Assert
        var result = okResult.Result as OkObjectResult;
        var items = Assert.IsType<List<PayGroup>>(result.Value);

        Assert.True(items.Count > 0);
    }

    [Fact]
    public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
    {
        PayGroup payGroup = GetMockPayGroup();
        mockService.Setup(service => service.InsertAsync(It.IsAny<PayGroup>())).Returns(await Task.FromResult(GetMockPayGroup()));

        // Act
        var createdResponse = await payGroupController.Insert(payGroup) as CreatedAtActionResult;
        var item = createdResponse.Value as PayGroup;

        // Assert
        Assert.IsType<PayGroup>(item);
        Assert.NotNull(createdResponse);
    }

    [Fact]
    public async void Remove_ExistingLeave_ReturnsOkResult()
    {
        // Arrange
        var existingId = 3;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(await Task.FromResult(GetMockPayGroup()));
        mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns(await Task.FromResult(1));

        // Act
        var okResult = await payGroupController.Delete(existingId);

        // Assert
        Assert.IsType<ActionResult<int>>(okResult);
    }

    private static PayGroup GetMockPayGroup()
    {
        return new PayGroup()
        {
            Id = 1,
            Name = "General payroll Calendar",

        };
    }

    private static IEnumerable<PayGroup> GetMockPayGroupList()
    {
        List<PayGroup> payGroupList = new List<PayGroup>();
        PayGroup payGroup = new PayGroup
        {
            Id = 1,
            Name = "General payroll Calendar",

        };
        payGroupList.Add(payGroup);
        return payGroupList;
    }
}

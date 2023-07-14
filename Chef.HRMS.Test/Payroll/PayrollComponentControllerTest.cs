using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Chef.HRMS.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace Chef.HRMS.Test;

public class PayrollComponentControllerTest : BaseTest
{
    private readonly Mock<IPayrollComponentService> mockService;
    private readonly PayrollComponentController payrollComponentController;

    public PayrollComponentControllerTest()
    {
        mockService = new Mock<IPayrollComponentService>();
        payrollComponentController = new PayrollComponentController(mockService.Object);
    }

    [Fact]
    public async void Get_WhenCalled_ReturnsOkResult()
    {
        //Arrange
        var id = 2;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(await Task.FromResult(GetMockPayrollComponent()));

        // Act
        var okResult = await payrollComponentController.Get(id);

        // Assert
        Assert.IsType<OkObjectResult>(okResult.Result);
    }

    [Fact]
    public async void Get_WhenCalled_ReturnsNotFoundResult()
    {
        //Arrange
        var id = -1;

        // Act
        var notFoundResult = await payrollComponentController.Get(id);

        // Assert
        Assert.IsType<NotFoundResult>(notFoundResult.Result);
    }

    [Fact]
    public async void GetAll_WhenCalled_ReturnsItems()
    {
        //Arrange
        mockService.Setup(repo => repo.GetAllAsync()).Returns(await Task.FromResult(GetMockPayrollComponentList()));

        // Act
        var okResult = await payrollComponentController.GetAll();

        // Assert
        var result = okResult.Result as OkObjectResult;
        var items = Assert.IsType<List<PayrollComponent>>(result.Value);

        Assert.True(items.Count > 0);
    }

    [Fact]
    public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
    {
        PayrollComponent payrollComponent = GetMockPayrollComponent();
        mockService.Setup(service => service.InsertAsync(It.IsAny<PayrollComponent>())).Returns(await Task.FromResult(GetMockPayrollComponent()));

        // Act
        var createdResponse = await payrollComponentController.Insert(payrollComponent) as CreatedAtActionResult;
        var item = createdResponse.Value as PayrollComponent;

        // Assert
        Assert.IsType<PayrollComponent>(item);
        Assert.NotNull(createdResponse);
    }

    [Fact]
    public async void Remove_ExistingLeave_ReturnsOkResult()
    {
        // Arrange
        var existingId = 3;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(await Task.FromResult(GetMockPayrollComponent()));
        mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns(await Task.FromResult(1));

        // Act
        var okResult = await payrollComponentController.Delete(existingId);

        // Assert
        Assert.IsType<ActionResult<int>>(okResult);
    }

    private static PayrollComponent GetMockPayrollComponent()
    {
        return new PayrollComponent()
        {
            Id = 1,
            Name = "General payroll component",
            ShortCode = "GPC",
        };
    }

    private static IEnumerable<PayrollComponent> GetMockPayrollComponentList()
    {
        List<PayrollComponent> payrollComponentList = new List<PayrollComponent>();
        PayrollComponent payrollComponent = new PayrollComponent
        {
            Id = 1,
            Name = "General payroll component",
            ShortCode = "GPC",
        };
        payrollComponentList.Add(payrollComponent);
        return payrollComponentList;
    }
}

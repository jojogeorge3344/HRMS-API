using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Chef.HRMS.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace Chef.HRMS.Test;

public class ExpenseTypeControllerTest : BaseTest
{
    private readonly Mock<IExpenseTypeService> mockService;
    private readonly ExpenseTypeController expenseTypeController;

    public ExpenseTypeControllerTest()
    {
        mockService = new Mock<IExpenseTypeService>();
        expenseTypeController = new ExpenseTypeController(mockService.Object);
    }

    [Fact]
    public async void Get_WhenCalled_ReturnsOkResult()
    {
        //Arrange
        var id = 2;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(await Task.FromResult(GetMockExpenseType()));

        // Act
        var okResult = await expenseTypeController.Get(id);

        // Assert
        Assert.IsType<OkObjectResult>(okResult.Result);
    }

    [Fact]
    public async void Get_WhenCalled_ReturnsNotFoundResult()
    {
        //Arrange
        var id = -1;

        // Act
        var notFoundResult = await expenseTypeController.Get(id);

        // Assert
        Assert.IsType<NotFoundResult>(notFoundResult.Result);
    }

    [Fact]
    public async void GetAll_WhenCalled_ReturnsItems()
    {
        //Arrange
        mockService.Setup(repo => repo.GetAllAsync()).Returns(await Task.FromResult(GetMockExpenseTypeList()));

        // Act
        var okResult = await expenseTypeController.GetAll();

        // Assert
        var result = okResult.Result as OkObjectResult;
        var items = Assert.IsType<List<ExpenseType>>(result.Value);

        Assert.True(items.Count > 0);
    }

    [Fact]
    public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
    {
        ExpenseType expenseType = GetMockExpenseType();
        mockService.Setup(service => service.InsertAsync(It.IsAny<ExpenseType>())).Returns(await Task.FromResult(GetMockExpenseType()));

        // Act
        var createdResponse = await expenseTypeController.Insert(expenseType) as CreatedAtActionResult;
        var item = createdResponse.Value as ExpenseType;

        // Assert
        Assert.IsType<ExpenseType>(item);
        Assert.NotNull(createdResponse);
    }

    [Fact]
    public async void Remove_NotExistingLeave_ReturnsNotFoundResponse()
    {
        // Arrange
        var notExistingId = -1;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>()));

        // Act
        var badResponse = await expenseTypeController.Delete(notExistingId);

        // Assert
        Assert.IsType<NotFoundResult>(badResponse.Result);
    }

    [Fact]
    public async void Remove_ExistingLeave_ReturnsOkResult()
    {
        // Arrange
        var existingId = 3;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(await Task.FromResult(GetMockExpenseType()));
        mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns(await Task.FromResult(1));

        // Act
        var okResult = await expenseTypeController.Delete(existingId);

        // Assert
        Assert.IsType<ActionResult<int>>(okResult);
    }

    private static ExpenseType GetMockExpenseType()
    {
        return new ExpenseType()
        {
            Id = 1,
        };
    }

    private static IEnumerable<ExpenseType> GetMockExpenseTypeList()
    {
        List<ExpenseType> expenseTypeList = new List<ExpenseType>();
        ExpenseType expenseType = new ExpenseType
        {
            Id = 1,

        };
        expenseTypeList.Add(expenseType);
        return expenseTypeList;
    }
}

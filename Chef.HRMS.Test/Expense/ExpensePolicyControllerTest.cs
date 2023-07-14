using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Chef.HRMS.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace Chef.HRMS.Test;

public class ExpensePolicyControllerTest : BaseTest
{
    private readonly Mock<IExpensePolicyService> mockService;
    private readonly ExpensePolicyController expensePolicyController;

    public ExpensePolicyControllerTest()
    {
        mockService = new Mock<IExpensePolicyService>();
        expensePolicyController = new ExpensePolicyController(mockService.Object);
    }

    [Fact]
    public async void Get_WhenCalled_ReturnsOkResult()
    {
        //Arrange
        var id = 2;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(await Task.FromResult(GetMockExpensePolicy()));

        // Act
        var okResult = await expensePolicyController.Get(id);

        // Assert
        Assert.IsType<OkObjectResult>(okResult.Result);
    }

    [Fact]
    public async void Get_WhenCalled_ReturnsNotFoundResult()
    {
        //Arrange
        var id = -1;

        // Act
        var notFoundResult = await expensePolicyController.Get(id);

        // Assert
        Assert.IsType<NotFoundResult>(notFoundResult.Result);
    }

    [Fact]
    public async void GetAll_WhenCalled_ReturnsItems()
    {
        //Arrange
        mockService.Setup(repo => repo.GetAllAsync()).Returns(await Task.FromResult(GetMockExpensePolicyList()));

        // Act
        var okResult = await expensePolicyController.GetAll();

        // Assert
        var result = okResult.Result as OkObjectResult;
        var items = Assert.IsType<List<ExpensePolicy>>(result.Value);

        Assert.True(items.Count > 0);
    }

    [Fact]
    public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
    {
        ExpensePolicy expensePolicy = GetMockExpensePolicy();
        mockService.Setup(service => service.InsertAsync(It.IsAny<ExpensePolicy>())).Returns(await Task.FromResult(GetMockExpensePolicy()));

        // Act
        var createdResponse = await expensePolicyController.Insert(expensePolicy) as CreatedAtActionResult;
        var item = createdResponse.Value as ExpensePolicy; ;

        // Assert
        Assert.IsType<ExpensePolicy>(item);
        Assert.NotNull(createdResponse);
    }

    [Fact]
    public async void Remove_NotExistingLeave_ReturnsNotFoundResponse()
    {
        // Arrange
        var notExistingId = -1;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>()));

        // Act
        var badResponse = await expensePolicyController.Delete(notExistingId);

        // Assert
        Assert.IsType<NotFoundResult>(badResponse.Result);
    }

    [Fact]
    public async void Remove_ExistingLeave_ReturnsOkResult()
    {
        // Arrange
        var existingId = 3;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(await Task.FromResult(GetMockExpensePolicy()));
        mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns(await Task.FromResult(1));

        // Act
        var okResult = await expensePolicyController.Delete(existingId);

        // Assert
        Assert.IsType<ActionResult<int>>(okResult);
    }

    private static ExpensePolicy GetMockExpensePolicy()
    {
        return new ExpensePolicy()
        {
            Id = 1,
        };
    }

    private static IEnumerable<ExpensePolicy> GetMockExpensePolicyList()
    {
        List<ExpensePolicy> expensePolicyList = new List<ExpensePolicy>();
        ExpensePolicy expensePolicy = new ExpensePolicy
        {
            Id = 1,

        };
        expensePolicyList.Add(expensePolicy);
        return expensePolicyList;
    }
}

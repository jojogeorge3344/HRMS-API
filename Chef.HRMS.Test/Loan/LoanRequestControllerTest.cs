using Chef.Common.Models;
using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Chef.HRMS.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace Chef.HRMS.Test;

public class LoanRequestControllerTest : BaseTest
{
    private readonly Mock<ILoanRequestService> mockService;
    private readonly LoanRequestController loanRequestController;

    public LoanRequestControllerTest()
    {
        mockService = new Mock<ILoanRequestService>();
        loanRequestController = new LoanRequestController(mockService.Object);
    }

    [Fact]
    public async void Get_WhenCalled_ReturnsOkResult()
    {
        //Arrange
        var id = 2;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(await Task.FromResult(GetMockLoanRequest()));

        // Act
        var okResult = await loanRequestController.Get(id);

        // Assert
        Assert.IsType<OkObjectResult>(okResult.Result);
    }

    [Fact]
    public async void Get_WhenCalled_ReturnsNotFoundResult()
    {
        //Arrange
        var id = -1;

        // Act
        var notFoundResult = await loanRequestController.Get(id);

        // Assert
        Assert.IsType<NotFoundResult>(notFoundResult.Result);
    }

    [Fact]
    public async void GetAll_WhenCalled_ReturnsItems()
    {
        //Arrange
        mockService.Setup(repo => repo.GetAllAsync()).Returns(await Task.FromResult(GetMockLoanRequestList()));

        // Act
        var okResult = await loanRequestController.GetAll();

        // Assert
        var result = okResult.Result as OkObjectResult;
        var items = Assert.IsType<List<LoanRequest>>(result.Value);

        Assert.True(items.Count > 0);
    }

    [Fact]
    public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
    {
        LoanRequest loanRequest = GetMockLoanRequest();
        mockService.Setup(service => service.InsertAsync(It.IsAny<LoanRequest>())).Returns(await Task.FromResult(GetMockLoanRequest()));

        // Act
        var createdResponse = await loanRequestController.Insert(loanRequest) as CreatedAtActionResult;
        var item = createdResponse.Value as LoanRequest; ;

        // Assert
        Assert.IsType<LoanRequest>(item);
        Assert.NotNull(createdResponse);
    }

    [Fact]
    public async void Remove_NotExistingLeave_ReturnsNotFoundResponse()
    {
        // Arrange
        var notExistingId = -1;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>()));

        // Act
        var badResponse = await loanRequestController.Delete(notExistingId);

        // Assert
        Assert.IsType<NotFoundResult>(badResponse.Result);
    }

    [Fact]
    public async void Remove_ExistingLeave_ReturnsOkResult()
    {
        // Arrange
        var existingId = 3;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(await Task.FromResult(GetMockLoanRequest()));
        mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns(await Task.FromResult(1));

        // Act
        var okResult = await loanRequestController.Delete(existingId);

        // Assert
        Assert.IsType<ActionResult<int>>(okResult);
    }

    private static LoanRequest GetMockLoanRequest()
    {
        return new LoanRequest()
        {
            Id = 1,
            EmployeeID = 1,
            LoanNo = "LN0020/MAY19",
            RequestedDate = System.DateTime.Now,
            LoanType = LoanType.Advance,
            LoanAmount = 8700,
            PaymentType = PaymentType.AlongWithPayroll,
            ExpectedOn = System.DateTime.Now,
            //EMIStartsFrom = System.DateTime.Now,
            RepaymentTerm = 2,
            Comments = "test"
        };
    }

    private static IEnumerable<LoanRequest> GetMockLoanRequestList()
    {
        List<LoanRequest> loanRequestList = new List<LoanRequest>();
        LoanRequest loanRequest = new LoanRequest
        {
            Id = 1,
            EmployeeID = 1,
            LoanNo = "LN0020/MAY19",
            RequestedDate = System.DateTime.Now,
            LoanType = LoanType.Advance,
            LoanAmount = 8700,
            PaymentType = PaymentType.AlongWithPayroll,
            ExpectedOn = System.DateTime.Now,
            //EMIStartsFrom = System.DateTime.Now,
            RepaymentTerm = 2,
            Comments = "test"
        };
        loanRequestList.Add(loanRequest);
        return loanRequestList;
    }
}

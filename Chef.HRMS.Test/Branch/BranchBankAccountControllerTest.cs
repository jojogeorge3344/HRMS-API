using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Chef.HRMS.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace Chef.HRMS.Test;

public class BranchBankAccountControllerTest : BaseTest
{
    private readonly Mock<IBranchBankAccountService> mockService;
    private readonly BranchBankAccountController branchBankAccountController;

    public BranchBankAccountControllerTest()
    {
        mockService = new Mock<IBranchBankAccountService>();
        branchBankAccountController = new BranchBankAccountController(mockService.Object);
    }

    [Fact]
    public async void Get_WhenCalled_ReturnsOkResult()
    {
        //Arrange
        var id = 12;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(await Task.FromResult(GetMockBranchBankAccount()));

        // Act
        var okResult = await branchBankAccountController.Get(id);

        // Assert
        Assert.IsType<OkObjectResult>(okResult.Result);
    }

    [Fact]
    public async void Get_WhenCalled_ReturnsNotFoundResult()
    {
        //Arrange
        var id = -1;

        // Act
        var notFoundResult = await branchBankAccountController.Get(id);

        // Assert
        Assert.IsType<NotFoundResult>(notFoundResult.Result);
    }

    [Fact]
    public async void GetAll_WhenCalled_ReturnsItems()
    {
        //Arrange
        mockService.Setup(repo => repo.GetAllAsync()).Returns(await Task.FromResult(GetMockBranchBankAccountList()));

        // Act
        var okResult = await branchBankAccountController.GetAll();

        // Assert
        var result = okResult.Result as OkObjectResult;
        var items = Assert.IsType<List<HRMSBranchBankAccount>>(result.Value);
        Assert.True(items.Count > 0);
    }

    [Fact]
    public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
    {
        //Assert
        HRMSBranchBankAccount BranchBankAccount = GetMockBranchBankAccount();
        mockService.Setup(repo => repo.InsertAsync(It.IsAny<HRMSBranchBankAccount>())).Returns(await Task.FromResult(GetMockBranchBankAccount()));

        // Act
        var createdResponse = await branchBankAccountController.Insert(BranchBankAccount) as CreatedAtActionResult;
        var item = createdResponse.Value as HRMSBranchBankAccount;

        // Assert
        Assert.IsType<HRMSBranchBankAccount>(item);
        Assert.NotNull(createdResponse);
    }

    [Fact]
    public async void Add_InvalidObjectPassed_ReturnsBadRequest()
    {
        //Arrange
        HRMSBranchBankAccount nameMissingBranchBankAccount = GetMockBranchBankAccount();
        nameMissingBranchBankAccount.BankName = null;
        branchBankAccountController.ModelState.AddModelError("BankName", "Required");

        // Act
        var badResponse = await branchBankAccountController.Insert(nameMissingBranchBankAccount);

        // Assert
        Assert.IsType<BadRequestObjectResult>(badResponse);
    }

    [Fact]
    public async void Remove_NotExistingBranchBankAccount_ReturnsNotFoundResponse()
    {
        // Arrange
        var notExistingId = -1;
        var mockService = new Mock<IBranchBankAccountService>();
        var branchBankAccountController = new BranchBankAccountController(mockService.Object);
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>()));

        // Act
        var badResponse = await branchBankAccountController.Delete(notExistingId);

        // Assert
        Assert.IsType<NotFoundResult>(badResponse.Result);
    }

    [Fact]
    public async void Remove_ExistingBranchBankAccount_ReturnsOkResult()
    {
        // Arrange
        var existingId = 12;
        var mockService = new Mock<IBranchBankAccountService>();
        var branchBankAccountController = new BranchBankAccountController(mockService.Object);
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(await Task.FromResult(GetMockBranchBankAccount()));
        mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns(await Task.FromResult(1));

        // Act
        var okResponse = await branchBankAccountController.Delete(existingId);

        // Assert
        Assert.IsType<ActionResult<int>>(okResponse);
    }

    private static HRMSBranchBankAccount GetMockBranchBankAccount()
    {
        int random = new Random().Next(0, 100);
        return new HRMSBranchBankAccount()
        {
            AccountNumber = "Account-" + random,
            BankName = "ABC Bank " + random,
            BranchName = "Kakkanad",
            CorporateId = "CID1AZE",
            IFSCCode = "ABC1000100",
            BranchId = 14
        };
    }
    private static IEnumerable<HRMSBranchBankAccount> GetMockBranchBankAccountList()
    {
        var branchBankAccountList = new List<HRMSBranchBankAccount>();
        int random = new Random().Next(0, 100);
        HRMSBranchBankAccount branchBankAccount = new HRMSBranchBankAccount
        {
            AccountNumber = "Account-" + random,
            BankName = "ABC Bank " + random,
            BranchName = "Kakkanad",
            CorporateId = "CID1AZE",
            IFSCCode = "ABC1000100",
            BranchId = 14
        };
        branchBankAccountList.Add(branchBankAccount);
        return branchBankAccountList;
    }
}

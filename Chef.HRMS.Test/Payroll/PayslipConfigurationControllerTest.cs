using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Chef.HRMS.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Threading.Tasks;
using Xunit;

namespace Chef.HRMS.Test;

public class PayslipConfigurationControllerTest : BaseTest
{
    private readonly Mock<IPayslipConfigurationService> mockService;
    private readonly PayslipConfigurationController payslipConfigurationController;

    public PayslipConfigurationControllerTest()
    {
        mockService = new Mock<IPayslipConfigurationService>();
        payslipConfigurationController = new PayslipConfigurationController(mockService.Object);
    }

    [Fact]
    public async void Get_WhenCalled_ReturnsOkResult()
    {
        //Arrange
        var id = 2;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(await Task.FromResult(GetMockPayslipConfiguration()));

        // Act
        var okResult = await payslipConfigurationController.Get(id);

        // Assert
        Assert.IsType<OkObjectResult>(okResult.Result);
    }

    [Fact]
    public async void Get_WhenCalled_ReturnsNotFoundResult()
    {
        //Arrange
        var id = -1;

        // Act
        var notFoundResult = await payslipConfigurationController.Get(id);

        // Assert
        Assert.IsType<NotFoundResult>(notFoundResult.Result);
    }

    [Fact]
    public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
    {
        PayslipConfiguration payslipConfiguration = GetMockPayslipConfiguration();
        mockService.Setup(service => service.InsertAsync(It.IsAny<PayslipConfiguration>())).Returns(await Task.FromResult(GetMockPayslipConfiguration()));

        // Act
        var createdResponse = await payslipConfigurationController.Insert(payslipConfiguration) as CreatedAtActionResult;
        var item = createdResponse.Value as PayslipConfiguration;

        // Assert
        Assert.IsType<PayslipConfiguration>(item);
        Assert.NotNull(createdResponse);
    }

    private static PayslipConfiguration GetMockPayslipConfiguration()
    {
        return new PayslipConfiguration()
        {
            Id = 1,
            IncludeFullNameOfComponents = true,
            IncludeNotApplicableComponents = true,
            IncludeLoanOrAdvanceDetails = false,
            EnablePasswordProtection = false
        };
    }
}


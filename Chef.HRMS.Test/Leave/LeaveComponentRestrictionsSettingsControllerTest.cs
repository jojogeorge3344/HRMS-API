using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Chef.HRMS.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Threading.Tasks;
using Xunit;

namespace Chef.HRMS.Test;

public class LeaveComponentRestrictionsSettingsControllerTest : BaseTest
{
    private readonly LeaveComponentRestrictionSettingsController LeaveRestrictionsSettingsController;
    private readonly Mock<ILeaveComponentRestrictionSettingsService> mockService;

    public LeaveComponentRestrictionsSettingsControllerTest()
    {
        mockService = new Mock<ILeaveComponentRestrictionSettingsService>();
        LeaveRestrictionsSettingsController = new LeaveComponentRestrictionSettingsController(mockService.Object);
    }

    [Fact]
    public async void Get_WhenCalled_ReturnsNotFoundResult()
    {
        //Arrange
        var leaveStructureId = -1;
        var leaveComponentId = -1;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>(), It.IsAny<int>()));

        // Act
        var notFoundResult = await LeaveRestrictionsSettingsController.Get(leaveStructureId, leaveComponentId);

        // Assert
        Assert.Null(notFoundResult.Value);
    }

    [Fact]
    public async void Get_WhenCalled_ReturnsOkResult()
    {
        //Arrange
        var leaveStructureId = 2;
        var leaveComponentId = 2;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>(), It.IsAny<int>())).Returns(await Task.FromResult(GetMockLeaveRestrictionsSettings()));

        // Act
        var okResult = await LeaveRestrictionsSettingsController.Get(leaveStructureId, leaveComponentId);

        // Assert
        Assert.IsType<OkObjectResult>(okResult.Result);
    }

    private static LeaveComponentRestrictionSettings GetMockLeaveRestrictionsSettings()
    {
        return new LeaveComponentRestrictionSettings()
        {
        };
    }
}
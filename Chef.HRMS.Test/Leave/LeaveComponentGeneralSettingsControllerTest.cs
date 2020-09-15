using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Chef.HRMS.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Threading.Tasks;
using Xunit;

namespace Chef.HRMS.Test
{
    public class LeaveComponentGeneralSettingsControllerTest : BaseTest
    {
        private readonly Mock<ILeaveComponentGeneralSettingsService> mockService;
        private readonly LeaveComponentGeneralSettingsController leaveGeneralSettingsController;

        public LeaveComponentGeneralSettingsControllerTest()
        {
            mockService = new Mock<ILeaveComponentGeneralSettingsService>();
            leaveGeneralSettingsController = new LeaveComponentGeneralSettingsController(mockService.Object);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsOkResult()
        {
            //Arrange
            var leaveStructureId = 2;
            var leaveComponentId = 2;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>(), It.IsAny<int>())).Returns(Task.FromResult(GetMockLeaveAccrualSettings()));

            // Act
            var okResult = await leaveGeneralSettingsController.Get(leaveStructureId, leaveComponentId);

            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsNotFoundResult()
        {
            //Arrange
            var leaveStructureId = -1;
            var leaveComponentId = -1;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>(), It.IsAny<int>()));

            // Act
            var result = await leaveGeneralSettingsController.Get(leaveStructureId, leaveComponentId);

            // Assert
            Assert.Null(result.Value);
        }

        private static LeaveComponentGeneralSettings GetMockLeaveAccrualSettings()
        {
            return new LeaveComponentGeneralSettings()
            {
                //CanAvailEntireQuota = true,
            };
        }
    }
}
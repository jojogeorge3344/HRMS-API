using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Chef.HRMS.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Threading.Tasks;
using Xunit;

namespace Chef.HRMS.Test
{
    public class LeaveStructureLeaveComponentControllerTest : BaseTest
    {
        private readonly LeaveStructureLeaveComponentController leaveStructureLeaveComponentController;
        private readonly Mock<ILeaveStructureLeaveComponentService> mockService;

        public LeaveStructureLeaveComponentControllerTest()
        {
            mockService = new Mock<ILeaveStructureLeaveComponentService>();
            leaveStructureLeaveComponentController = new LeaveStructureLeaveComponentController(mockService.Object);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsNotFoundResult()
        {
            //Arrange
            var id = -1;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>()));

            // Act
            var notFoundResult = await leaveStructureLeaveComponentController.GetAll(id);

            // Assert
            Assert.Null(notFoundResult.Value);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsOkResult()
        {
            //Arrange
            var id = 29;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns( await Task.FromResult(GetMockLeaveStructureType()));

            // Act
            var okResult = await leaveStructureLeaveComponentController.GetAll(id);

            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        private static LeaveStructureLeaveComponent GetMockLeaveStructureType()
        {
            return new LeaveStructureLeaveComponent()
            {
                LeaveStructureId = 1,
                LeaveComponentId = 1
            };
        }
    }
}
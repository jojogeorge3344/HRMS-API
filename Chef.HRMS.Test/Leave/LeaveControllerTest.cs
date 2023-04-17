using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Chef.HRMS.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace Chef.HRMS.Test
{
    public class LeaveControllerTest : BaseTest
    {
        private readonly Mock<ILeaveService> mockService;
        private readonly LeaveController leaveController;

        public LeaveControllerTest()
        {
            mockService = new Mock<ILeaveService>();
            leaveController = new LeaveController(mockService.Object);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsOkResult()
        {
            //Arrange
            var id = 2;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns( await Task.FromResult(GetMockLeave()));

            // Act
            var okResult = await leaveController.Get(id);

            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsNotFoundResult()
        {
            //Arrange
            var id = -1;

            // Act
            var notFoundResult = await leaveController.Get(id);

            // Assert
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
        }

        [Fact]
        public async void GetAll_WhenCalled_ReturnsItems()
        {
            //Arrange
            mockService.Setup(repo => repo.GetAllAsync()).Returns( await Task.FromResult(GetMockLeaveList()));

            // Act
            var okResult = await leaveController.GetAll();

            // Assert
            var result = okResult.Result as OkObjectResult;
            var items = Assert.IsType<List<Leave>>(result.Value);

            Assert.True(items.Count > 0);
        }

        [Fact]
        public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
        {
            //Arrange
            Leave Leave = GetMockLeave();
            mockService.Setup(service => service.InsertAsync(It.IsAny<Leave>())).Returns( await Task.FromResult(GetMockLeave()));

            // Act
            var createdResponse = await leaveController.Insert(Leave) as CreatedAtActionResult;
            var item = createdResponse.Value as Leave;

            // Assert
            Assert.IsType<Leave>(item);
            Assert.NotNull(createdResponse);
        }

        [Fact]
        public async void Remove_NotExistingLeave_ReturnsNotFoundResponse()
        {
            // Arrange
            var notExistingId = -1;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>()));

            // Act
            var badResponse = await leaveController.Delete(notExistingId);

            // Assert
            Assert.IsType<NotFoundResult>(badResponse);
        }

        [Fact]
        public async void Remove_ExistingLeave_ReturnsOkResult()
        {
            // Arrange
            var existingId = 3;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns( await Task.FromResult(GetMockLeave()));
            mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns( await Task.FromResult(1));

            // Act
            var okResult = await leaveController.Delete(existingId);

            // Assert
            Assert.IsType<OkObjectResult>(okResult);
        }

        private static Leave GetMockLeave()
        {
            return new Leave()
            {
                ApprovedBy = 1,
                Description = "Test"
            };
        }
        private static IEnumerable<Leave> GetMockLeaveList()
        {
            List<Leave> leaveList = new List<Leave>();
            Leave leave = new Leave
            {
                ApprovedBy = 1,
                Description = "Test"
            };
            leaveList.Add(leave);
            return leaveList;
        }
    }
}
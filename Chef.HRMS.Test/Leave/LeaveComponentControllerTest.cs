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
    public class LeaveComponentControllerTest : BaseTest
    {
        private readonly Mock<ILeaveComponentService> mockService;
        private readonly LeaveComponentController addLeaveComponentController;

        public LeaveComponentControllerTest()
        {
            mockService = new Mock<ILeaveComponentService>();
            addLeaveComponentController = new LeaveComponentController(mockService.Object);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsOkResult()
        {
            //Arrange
            var id = 31;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(Task.FromResult(GetMockAddLeaveComponent()));

            // Act
            var okResult = await addLeaveComponentController.Get(id);

            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsNotFoundResult()
        {
            //Arrange
            var id = -1;

            // Act
            var notFoundResult = await addLeaveComponentController.Get(id);

            // Assert
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
        }

        [Fact]
        public async void GetAll_WhenCalled_ReturnsItems()
        {
            //Arrange
            mockService.Setup(repo => repo.GetAllAsync()).Returns(Task.FromResult(GetMockAddLeaveComponentList()));

            // Act
            var okResult = await addLeaveComponentController.GetAll();

            // Assert
            var result = okResult.Result as OkObjectResult;
            var items = Assert.IsType<List<LeaveComponent>>(result.Value);

            Assert.True(items.Count > 0);
        }

        [Fact]
        public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
        {
            //Arrange
            LeaveComponent AddLeaveComponent = GetMockAddLeaveComponent();
            mockService.Setup(service => service.InsertAsync(It.IsAny<LeaveComponent>())).Returns(Task.FromResult(GetMockAddLeaveComponent()));

            // Act
            var createdResponse = await addLeaveComponentController.Insert(AddLeaveComponent) as CreatedAtActionResult;
            var item = createdResponse.Value as LeaveComponent;

            // Assert
            Assert.IsType<LeaveComponent>(item);
            Assert.NotNull(createdResponse);
        }

        [Fact]
        public async void Remove_NotExistingAddLeaveComponent_ReturnsNotFoundResponse()
        {
            // Arrange
            var notExistingId = -1;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>()));

            // Act
            var badResponse = await addLeaveComponentController.Delete(notExistingId);

            // Assert
            Assert.IsType<NotFoundResult>(badResponse);
        }

        [Fact]
        public async void Remove_ExistingAddLeaveComponent_ReturnsOkResult()
        {
            // Arrange
            var existingId = 31;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(Task.FromResult(GetMockAddLeaveComponent()));
            mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns(Task.FromResult(1));

            // Act
            var okResult = await addLeaveComponentController.Delete(existingId);

            // Assert
            Assert.IsType<OkObjectResult>(okResult);
        }

        private static LeaveComponent GetMockAddLeaveComponent()
        {
            return new LeaveComponent()
            {
                Code = "",
                IsPaidLeave = true,
                IsRestrictedToGender = true,
                IsRestrictedToMaritalStatus = false

            };
        }
        private static IEnumerable<LeaveComponent> GetMockAddLeaveComponentList()
        {
            List<LeaveComponent> leaveComponentList = new List<LeaveComponent>();
            LeaveComponent leaveComponent = new LeaveComponent
            {
                Code = "",
                IsPaidLeave = true,
                IsRestrictedToGender = true,
                IsRestrictedToMaritalStatus = false
            };
            leaveComponentList.Add(leaveComponent);
            return leaveComponentList;
        }
    }
}
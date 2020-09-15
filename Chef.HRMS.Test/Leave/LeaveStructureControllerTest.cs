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
    public class LeaveStructureControllerTest : BaseTest
    {
        private readonly Mock<ILeaveStructureService> mockService;
        private readonly LeaveStructureController leaveStructureController;

        public LeaveStructureControllerTest()
        {
            mockService = new Mock<ILeaveStructureService>();
            leaveStructureController = new LeaveStructureController(mockService.Object);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsOkResult()
        {
            //Arrange
            var id = 2;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(Task.FromResult(GetMockLeaveStructure()));

            // Act
            var okResult = await leaveStructureController.Get(id);

            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsNotFoundResult()
        {
            //Arrange
            var id = -1;

            // Act
            var notFoundResult = await leaveStructureController.Get(id);

            // Assert
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
        }

        [Fact]
        public async void GetAll_WhenCalled_ReturnsItems()
        {
            //Arrange
            mockService.Setup(repo => repo.GetAllAsync()).Returns(Task.FromResult(GetMockLeaveStructureList()));

            // Act
            var okResult = await leaveStructureController.GetAll();

            // Assert
            var result = okResult.Result as OkObjectResult;
            var items = Assert.IsType<List<LeaveStructure>>(result.Value);

            Assert.True(items.Count > 0);
        }

        [Fact]
        public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
        {
            //Arrange
            LeaveStructure LeaveStructure = GetMockLeaveStructure();
            mockService.Setup(service => service.InsertAsync(It.IsAny<LeaveStructure>())).Returns(Task.FromResult(GetMockLeaveStructure()));

            // Act
            var createdResponse = await leaveStructureController.Insert(LeaveStructure) as CreatedAtActionResult;
            var item = createdResponse.Value as LeaveStructure;

            // Assert
            Assert.IsType<LeaveStructure>(item);
            Assert.NotNull(createdResponse);
        }

        [Fact]
        public async void Remove_NotExistingLeaveStructure_ReturnsNotFoundResponse()
        {
            // Arrange
            var notExistingId = -1;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>()));

            // Act
            var badResponse = await leaveStructureController.Delete(notExistingId);

            // Assert
            Assert.IsType<NotFoundResult>(badResponse);
        }

        [Fact]
        public async void Remove_ExistingLeaveStructure_ReturnsOkResult()
        {
            // Arrange
            var existingId = 3;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(Task.FromResult(GetMockLeaveStructure()));
            mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns(Task.FromResult(1));

            // Act
            var okResult = await leaveStructureController.Delete(existingId);

            // Assert
            Assert.IsType<OkObjectResult>(okResult);
        }

        private static LeaveStructure GetMockLeaveStructure()
        {
            return new LeaveStructure()
            {
                IsCustomLeavePolicyDocumentAvailable = true,
                ShowLeavePolicyExplanation = true,
                Description = "Test",
                IsArchived = false
            };
        }
        private static IEnumerable<LeaveStructure> GetMockLeaveStructureList()
        {
            List<LeaveStructure> leaveStructureList = new List<LeaveStructure>();
            LeaveStructure leaveStructure = new LeaveStructure
            {
                IsCustomLeavePolicyDocumentAvailable = true,
                ShowLeavePolicyExplanation = true,
                Description = "Test",
                IsArchived = false
            };
            leaveStructureList.Add(leaveStructure);
            return leaveStructureList;
        }
    }
}
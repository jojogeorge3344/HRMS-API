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
    public class WorkFromHomeControllerTest : BaseTest
    {
        private readonly Mock<IWorkFromHomeService> mockService;
        private readonly WorkFromHomeController workFromHomeController;

        public WorkFromHomeControllerTest()
        {
            mockService = new Mock<IWorkFromHomeService>();
            workFromHomeController = new WorkFromHomeController(mockService.Object);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsOkResult()
        {
            //Arrange
            var id = 2;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns( await Task.FromResult(GetMockWorkFromHome()));

            // Act
            var okResult = await workFromHomeController.Get(id);

            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsNotFoundResult()
        {
            //Arrange
            var id = -1;

            // Act
            var notFoundResult = await workFromHomeController.Get(id);

            // Assert
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
        }

        [Fact]
        public async void GetAll_WhenCalled_ReturnsItems()
        {
            //Arrange
            mockService.Setup(repo => repo.GetAllAsync()).Returns( await Task.FromResult(GetMockWorkFromHomeList()));

            // Act
            var okResult = await workFromHomeController.GetAll();

            // Assert
            var result = okResult.Result as OkObjectResult;
            var items = Assert.IsType<List<WorkFromHome>>(result.Value);

            Assert.True(items.Count > 0);
        }

        [Fact]
        public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
        {
            WorkFromHome WorkFromHome = GetMockWorkFromHome();
            mockService.Setup(service => service.InsertAsync(It.IsAny<WorkFromHome>())).Returns( await Task.FromResult(GetMockWorkFromHome()));

            // Act
            var createdResponse = await workFromHomeController.Insert(WorkFromHome) as CreatedAtActionResult;
            var item = createdResponse.Value as WorkFromHome; ;

            // Assert
            Assert.IsType<WorkFromHome>(item);
            Assert.NotNull(createdResponse);
        }

        [Fact]
        public async void Remove_NotExistingLeave_ReturnsNotFoundResponse()
        {
            // Arrange
            var notExistingId = -1;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>()));

            // Act
            var badResponse = await workFromHomeController.Delete(notExistingId);

            // Assert
            Assert.IsType<NotFoundResult>(badResponse.Result);
        }

        [Fact]
        public async void Remove_ExistingLeave_ReturnsOkResult()
        {
            // Arrange
            var existingId = 3;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns( await Task.FromResult(GetMockWorkFromHome()));
            mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns( await Task.FromResult(1));

            // Act
            var okResult = await workFromHomeController.Delete(existingId);

            // Assert
            Assert.IsType<ActionResult<int>>(okResult);
        }

        private static WorkFromHome GetMockWorkFromHome()
        {
            return new WorkFromHome()
            {
                Id = 1,
            };
        }

        private static IEnumerable<WorkFromHome> GetMockWorkFromHomeList()
        {
            List<WorkFromHome> WorkFromHomeList = new List<WorkFromHome>();
            WorkFromHome WorkFromHome = new WorkFromHome
            {
                Id = 1,

            };
            WorkFromHomeList.Add(WorkFromHome);
            return WorkFromHomeList;
        }
    }
}

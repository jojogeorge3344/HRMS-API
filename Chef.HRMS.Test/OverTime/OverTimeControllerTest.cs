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
    public class OverTimeControllerTest : BaseTest
    {
        private readonly Mock<IOverTimeService> mockService;
        private readonly OverTimeController overTimeController;

        public OverTimeControllerTest()
        {
            mockService = new Mock<IOverTimeService>();
            overTimeController = new OverTimeController(mockService.Object);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsOkResult()
        {
            //Arrange
            var id = 2;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns( await Task.FromResult(GetMockOverTime()));

            // Act
            var okResult = await overTimeController.Get(id);

            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsNotFoundResult()
        {
            //Arrange
            var id = -1;

            // Act
            var notFoundResult = await overTimeController.Get(id);

            // Assert
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
        }

        [Fact]
        public async void GetAll_WhenCalled_ReturnsItems()
        {
            //Arrange
            mockService.Setup(repo => repo.GetAllAsync()).Returns( await Task.FromResult(GetMockOverTimeList()));

            // Act
            var okResult = await overTimeController.GetAll();

            // Assert
            var result = okResult.Result as OkObjectResult;
            var items = Assert.IsType<List<OverTime>>(result.Value);

            Assert.True(items.Count > 0);
        }

        [Fact]
        public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
        {
            OverTime overTime = GetMockOverTime();
            mockService.Setup(service => service.InsertAsync(It.IsAny<OverTime>())).Returns( await Task.FromResult(GetMockOverTime()));

            // Act
            var createdResponse = await overTimeController.Insert(overTime) as CreatedAtActionResult;
            var item = createdResponse.Value as OverTime; ;

            // Assert
            Assert.IsType<OverTime>(item);
            Assert.NotNull(createdResponse);
        }

        [Fact]
        public async void Remove_NotExistingLeave_ReturnsNotFoundResponse()
        {
            // Arrange
            var notExistingId = -1;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>()));

            // Act
            var badResponse = await overTimeController.Delete(notExistingId);

            // Assert
            Assert.IsType<NotFoundResult>(badResponse.Result);
        }

        [Fact]
        public async void Remove_ExistingLeave_ReturnsOkResult()
        {
            // Arrange
            var existingId = 3;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns( await Task.FromResult(GetMockOverTime()));
            mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns( await Task.FromResult(1));

            // Act
            var okResult = await overTimeController.Delete(existingId);

            // Assert
            Assert.IsType<ActionResult<int>>(okResult);
        }

        private static OverTime GetMockOverTime()
        {
            return new OverTime()
            {
                Id = 1,
            };
        }

        private static IEnumerable<OverTime> GetMockOverTimeList()
        {
            List<OverTime> overTimeList = new List<OverTime>();
            OverTime overTime = new OverTime
            {
                Id = 1,

            };
            overTimeList.Add(overTime);
            return overTimeList;
        }
    }
}

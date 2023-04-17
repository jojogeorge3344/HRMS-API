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
    public class OverTimePolicyConfigurationControllerTest : BaseTest
    {
        private readonly Mock<IOverTimePolicyConfigurationService> mockService;
        private readonly OverTimePolicyConfigurationController OverTimePolicyConfigurationController;

        public OverTimePolicyConfigurationControllerTest()
        {
            mockService = new Mock<IOverTimePolicyConfigurationService>();
            OverTimePolicyConfigurationController = new OverTimePolicyConfigurationController(mockService.Object);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsOkResult()
        {
            //Arrange
            var id = 2;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns( await Task.FromResult(GetMockOverTimePolicyConfiguration()));

            // Act
            var okResult = await OverTimePolicyConfigurationController.Get(id);

            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsNotFoundResult()
        {
            //Arrange
            var id = -1;

            // Act
            var notFoundResult = await OverTimePolicyConfigurationController.Get(id);

            // Assert
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
        }

        [Fact]
        public async void GetAll_WhenCalled_ReturnsItems()
        {
            //Arrange
            mockService.Setup(repo => repo.GetAllAsync()).Returns( await Task.FromResult(GetMockOverTimePolicyConfigurationList()));

            // Act
            var okResult = await OverTimePolicyConfigurationController.GetAll();

            // Assert
            var result = okResult.Result as OkObjectResult;
            var items = Assert.IsType<List<OverTimePolicyConfiguration>>(result.Value);

            Assert.True(items.Count > 0);
        }

        [Fact]
        public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
        {
            OverTimePolicyConfiguration overTimePolicyConfiguration = GetMockOverTimePolicyConfiguration();
            mockService.Setup(service => service.InsertAsync(It.IsAny<OverTimePolicyConfiguration>())).Returns( await Task.FromResult(GetMockOverTimePolicyConfiguration()));

            // Act
            var createdResponse = await OverTimePolicyConfigurationController.Insert(overTimePolicyConfiguration) as CreatedAtActionResult;
            var item = createdResponse.Value as OverTimePolicyConfiguration; ;

            // Assert
            Assert.IsType<OverTimePolicyConfiguration>(item);
            Assert.NotNull(createdResponse);
        }

        [Fact]
        public async void Remove_NotExistingLeave_ReturnsNotFoundResponse()
        {
            // Arrange
            var notExistingId = -1;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>()));

            // Act
            var badResponse = await OverTimePolicyConfigurationController.Delete(notExistingId);

            // Assert
            Assert.IsType<NotFoundResult>(badResponse.Result);
        }

        [Fact]
        public async void Remove_ExistingLeave_ReturnsOkResult()
        {
            // Arrange
            var existingId = 3;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns( await Task.FromResult(GetMockOverTimePolicyConfiguration()));
            mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns( await Task.FromResult(1));

            // Act
            var okResult = await OverTimePolicyConfigurationController.Delete(existingId);

            // Assert
            Assert.IsType<ActionResult<int>>(okResult);
        }

        private static OverTimePolicyConfiguration GetMockOverTimePolicyConfiguration()
        {
            return new OverTimePolicyConfiguration()
            {
                Id = 1,
            };
        }

        private static IEnumerable<OverTimePolicyConfiguration> GetMockOverTimePolicyConfigurationList()
        {
            List<OverTimePolicyConfiguration> overTimePolicyConfigurationList = new List<OverTimePolicyConfiguration>();
            OverTimePolicyConfiguration overTimePolicyConfiguration = new OverTimePolicyConfiguration
            {
                Id = 1,

            };
            overTimePolicyConfigurationList.Add(overTimePolicyConfiguration);
            return overTimePolicyConfigurationList;
        }
    }
}

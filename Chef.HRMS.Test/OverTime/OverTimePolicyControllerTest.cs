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
    public class OverTimePolicyControllerTest : BaseTest
    {
        private readonly Mock<IOverTimePolicyService> mockService;
        private readonly OverTimePolicyController overTimePolicyController;

        public OverTimePolicyControllerTest()
        {
            mockService = new Mock<IOverTimePolicyService>();
            overTimePolicyController = new OverTimePolicyController(mockService.Object);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsOkResult()
        {
            //Arrange
            var id = 2;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns( await Task.FromResult(GetMockOverTimePolicy()));

            // Act
            var okResult = await overTimePolicyController.Get(id);

            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsNotFoundResult()
        {
            //Arrange
            var id = -1;

            // Act
            var notFoundResult = await overTimePolicyController.Get(id);

            // Assert
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
        }

        [Fact]
        public async void GetAll_WhenCalled_ReturnsItems()
        {
            //Arrange
            mockService.Setup(repo => repo.GetAllAsync()).Returns( await Task.FromResult(GetMockOverTimePolicyList()));

            // Act
            var okResult = await overTimePolicyController.GetAll();

            // Assert
            var result = okResult.Result as OkObjectResult;
            var items = Assert.IsType<List<OverTimePolicy>>(result.Value);

            Assert.True(items.Count > 0);
        }

        [Fact]
        public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
        {
            OverTimePolicy overTimePolicy = GetMockOverTimePolicy();
            mockService.Setup(service => service.InsertAsync(It.IsAny<OverTimePolicy>())).Returns( await Task.FromResult(GetMockOverTimePolicy()));

            // Act
            var createdResponse = await overTimePolicyController.Insert(overTimePolicy) as CreatedAtActionResult;
            var item = createdResponse.Value as OverTimePolicy; ;

            // Assert
            Assert.IsType<OverTimePolicy>(item);
            Assert.NotNull(createdResponse);
        }

        [Fact]
        public async void Remove_NotExistingLeave_ReturnsNotFoundResponse()
        {
            // Arrange
            var notExistingId = -1;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>()));

            // Act
            var badResponse = await overTimePolicyController.Delete(notExistingId);

            // Assert
            Assert.IsType<NotFoundResult>(badResponse.Result);
        }

        [Fact]
        public async void Remove_ExistingLeave_ReturnsOkResult()
        {
            // Arrange
            var existingId = 3;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns( await Task.FromResult(GetMockOverTimePolicy()));
            mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns( await Task.FromResult(1));

            // Act
            var okResult = await overTimePolicyController.Delete(existingId);

            // Assert
            Assert.IsType<ActionResult<int>>(okResult);
        }

        private static OverTimePolicy GetMockOverTimePolicy()
        {
            return new OverTimePolicy()
            {
                Id = 1,
            };
        }

        private static IEnumerable<OverTimePolicy> GetMockOverTimePolicyList()
        {
            List<OverTimePolicy> overTimePolicyList = new List<OverTimePolicy>();
            OverTimePolicy overTimePolicy = new OverTimePolicy
            {
                Id = 1,

            };
            overTimePolicyList.Add(overTimePolicy);
            return overTimePolicyList;
        }
    }
}

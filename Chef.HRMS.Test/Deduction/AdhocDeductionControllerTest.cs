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
    public class AdhocDeductionControllerTest : BaseTest
    {
        private readonly Mock<IAdhocDeductionService> mockService;
        private readonly AdhocDeductionController adhocDeductionController;

        public AdhocDeductionControllerTest()
        {
            mockService = new Mock<IAdhocDeductionService>();
            adhocDeductionController = new AdhocDeductionController(mockService.Object);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsOkResult()
        {
            //Arrange
            var id = 2;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns( await Task.FromResult(GetMockAdhocDeduction()));

            // Act
            var okResult = await adhocDeductionController.Get(id);

            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsNotFoundResult()
        {
            //Arrange
            var id = -1;

            // Act
            var notFoundResult = await adhocDeductionController.Get(id);

            // Assert
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
        }

        [Fact]
        public async void GetAll_WhenCalled_ReturnsItems()
        {
            //Arrange
            mockService.Setup(repo => repo.GetAllAsync()).Returns( await Task.FromResult(GetMockAdhocDeductionList()));

            // Act
            var okResult = await adhocDeductionController.GetAll();

            // Assert
            var result = okResult.Result as OkObjectResult;
            var items = Assert.IsType<List<AdhocDeduction>>(result.Value);

            Assert.True(items.Count > 0);
        }

        [Fact]
        public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
        {
            AdhocDeduction adhocDeduction = GetMockAdhocDeduction();
            mockService.Setup(service => service.InsertAsync(It.IsAny<AdhocDeduction>())).Returns( await Task.FromResult(GetMockAdhocDeduction()));

            // Act
            var createdResponse = await adhocDeductionController.Insert(adhocDeduction) as CreatedAtActionResult;
            var item = createdResponse.Value as AdhocDeduction; ;

            // Assert
            Assert.IsType<AdhocDeduction>(item);
            Assert.NotNull(createdResponse);
        }

        [Fact]
        public async void Remove_NotExistingLeave_ReturnsNotFoundResponse()
        {
            // Arrange
            var notExistingId = -1;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>()));

            // Act
            var badResponse = await adhocDeductionController.Delete(notExistingId);

            // Assert
            Assert.IsType<NotFoundResult>(badResponse.Result);
        }

        [Fact]
        public async void Remove_ExistingLeave_ReturnsOkResult()
        {
            // Arrange
            var existingId = 3;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns( await Task.FromResult(GetMockAdhocDeduction()));
            mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns( await Task.FromResult(1));

            // Act
            var okResult = await adhocDeductionController.Delete(existingId);

            // Assert
            Assert.IsType<ActionResult<int>>(okResult);
        }

        private static AdhocDeduction GetMockAdhocDeduction()
        {
            return new AdhocDeduction()
            {
                Id = 1,
            };
        }

        private static IEnumerable<AdhocDeduction> GetMockAdhocDeductionList()
        {
            List<AdhocDeduction> adhocDeductionList = new List<AdhocDeduction>();
            AdhocDeduction adhocDeduction = new AdhocDeduction
            {
                Id = 1,

            };
            adhocDeductionList.Add(adhocDeduction);
            return adhocDeductionList;
        }
    }
}

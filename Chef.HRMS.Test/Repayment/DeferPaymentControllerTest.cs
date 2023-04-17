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
    public class DeferPaymentControllerTest : BaseTest
    {
        private readonly Mock<IDeferPaymentService> mockService;
        private readonly DeferPaymentController deferPaymentController;

        public DeferPaymentControllerTest()
        {
            mockService = new Mock<IDeferPaymentService>();
            deferPaymentController = new DeferPaymentController(mockService.Object);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsOkResult()
        {
            //Arrange
            var id = 2;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns( await Task.FromResult(GetMockDeferPayment()));

            // Act
            var okResult = await deferPaymentController.Get(id);

            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsNotFoundResult()
        {
            //Arrange
            var id = -1;

            // Act
            var notFoundResult = await deferPaymentController.Get(id);

            // Assert
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
        }

        [Fact]
        public async void GetAll_WhenCalled_ReturnsItems()
        {
            //Arrange
            mockService.Setup(repo => repo.GetAllAsync()).Returns( await Task.FromResult(GetMockDeferPaymentList()));

            // Act
            var okResult = await deferPaymentController.GetAll();

            // Assert
            var result = okResult.Result as OkObjectResult;
            var items = Assert.IsType<List<DeferPayment>>(result.Value);

            Assert.True(items.Count > 0);
        }

        [Fact]
        public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
        {
            DeferPayment deferPayment = GetMockDeferPayment();
            mockService.Setup(service => service.InsertAsync(It.IsAny<DeferPayment>())).Returns( await Task.FromResult(GetMockDeferPayment()));

            // Act
            var createdResponse = await deferPaymentController.Insert(deferPayment) as CreatedAtActionResult;
            var item = createdResponse.Value as DeferPayment; ;

            // Assert
            Assert.IsType<DeferPayment>(item);
            Assert.NotNull(createdResponse);
        }

        [Fact]
        public async void Remove_NotExistingLeave_ReturnsNotFoundResponse()
        {
            // Arrange
            var notExistingId = -1;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>()));

            // Act
            var badResponse = await deferPaymentController.Delete(notExistingId);

            // Assert
            Assert.IsType<NotFoundResult>(badResponse.Result);
        }

        [Fact]
        public async void Remove_ExistingLeave_ReturnsOkResult()
        {
            // Arrange
            var existingId = 3;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns( await Task.FromResult(GetMockDeferPayment()));
            mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns( await Task.FromResult(1));

            // Act
            var okResult = await deferPaymentController.Delete(existingId);

            // Assert
            Assert.IsType<ActionResult<int>>(okResult);
        }

        private static DeferPayment GetMockDeferPayment()
        {
            return new DeferPayment()
            {
                Id = 1,
            };
        }

        private static IEnumerable<DeferPayment> GetMockDeferPaymentList()
        {
            List<DeferPayment> deferPaymentList = new List<DeferPayment>();
            DeferPayment deferPayment = new DeferPayment
            {
                Id = 1,

            };
            deferPaymentList.Add(deferPayment);
            return deferPaymentList;
        }
    }
}

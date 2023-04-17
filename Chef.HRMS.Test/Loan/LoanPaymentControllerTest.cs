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
    public class LoanPaymentControllerTest : BaseTest
    {
        private readonly Mock<ILoanPaymentService> mockService;
        private readonly LoanPaymentController loanPaymentController;

        public LoanPaymentControllerTest()
        {
            mockService = new Mock<ILoanPaymentService>();
            loanPaymentController = new LoanPaymentController(mockService.Object);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsOkResult()
        {
            //Arrange
            var id = 2;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns( await Task.FromResult(GetMockLoanPayment()));

            // Act
            var okResult = await loanPaymentController.Get(id);

            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsNotFoundResult()
        {
            //Arrange
            var id = -1;

            // Act
            var notFoundResult = await loanPaymentController.Get(id);

            // Assert
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
        }

        [Fact]
        public async void GetAll_WhenCalled_ReturnsItems()
        {
            //Arrange
            mockService.Setup(repo => repo.GetAllAsync()).Returns( await Task.FromResult(GetMockLoanPaymentList()));

            // Act
            var okResult = await loanPaymentController.GetAll();

            // Assert
            var result = okResult.Result as OkObjectResult;
            var items = Assert.IsType<List<LoanPayment>>(result.Value);

            Assert.True(items.Count > 0);
        }

        //[Fact]
        //public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
        //{
        //    LoanPayment loanPayment = GetMockLoanPayment();
        //    mockService.Setup(service => service.InsertAsync(It.IsAny<LoanPayment>())).Returns( await Task.FromResult(GetMockLoanPayment()));

        //    // Act
        //    var createdResponse = await loanPaymentController.Insert(loanPayment) as CreatedAtActionResult;
        //    var item = createdResponse.Value as LoanPayment; ;

        //    // Assert
        //    Assert.IsType<LoanPayment>(item);
        //    Assert.NotNull(createdResponse);
        //}

        [Fact]
        public async void Remove_NotExistingLeave_ReturnsNotFoundResponse()
        {
            // Arrange
            var notExistingId = -1;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>()));

            // Act
            var badResponse = await loanPaymentController.Delete(notExistingId);

            // Assert
            Assert.IsType<NotFoundResult>(badResponse.Result);
        }

        [Fact]
        public async void Remove_ExistingLeave_ReturnsOkResult()
        {
            // Arrange
            var existingId = 3;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns( await Task.FromResult(GetMockLoanPayment()));
            mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns( await Task.FromResult(1));

            // Act
            var okResult = await loanPaymentController.Delete(existingId);

            // Assert
            Assert.IsType<ActionResult<int>>(okResult);
        }

        private static LoanPayment GetMockLoanPayment()
        {
            return new LoanPayment()
            {
                Id = 1,
            };
        }

        private static IEnumerable<LoanPayment> GetMockLoanPaymentList()
        {
            List<LoanPayment> loanPaymentList = new List<LoanPayment>();
            LoanPayment loanPayment = new LoanPayment
            {
                Id = 1,

            };
            loanPaymentList.Add(loanPayment);
            return loanPaymentList;
        }
    }
}

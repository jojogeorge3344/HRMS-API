using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Chef.HRMS.Web.Controllers.Loan;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Chef.HRMS.Test
{
    public class LoanSettingControllerTest : BaseTest
    {
        private readonly Mock<ILoanSettingService> mockService;
        private readonly LoanSettingController loanSettingController;

        public LoanSettingControllerTest()
        {
            mockService = new Mock<ILoanSettingService>();
            loanSettingController = new LoanSettingController(mockService.Object);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsOkResult()
        {
            //Arrange
            var id = 2;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(Task.FromResult(GetMockLoanSetting()));

            // Act
            var okResult = await loanSettingController.Get(id);

            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsNotFoundResult()
        {
            //Arrange
            var id = -1;

            // Act
            var notFoundResult = await loanSettingController.Get(id);

            // Assert
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
        }

        [Fact]
        public async void GetAll_WhenCalled_ReturnsItems()
        {
            //Arrange
            mockService.Setup(repo => repo.GetAllAsync()).Returns(Task.FromResult(GetMockLoanSettingList()));

            // Act
            var okResult = await loanSettingController.GetAll();

            // Assert
            var result = okResult.Result as OkObjectResult;
            var items = Assert.IsType<List<LoanSetting>>(result.Value);

            Assert.True(items.Count > 0);
        }

        [Fact]
        public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
        {
            LoanSetting loanSetting = GetMockLoanSetting();
            mockService.Setup(service => service.InsertAsync(It.IsAny<LoanSetting>())).Returns(Task.FromResult(GetMockLoanSetting()));

            // Act
            var createdResponse = await loanSettingController.Insert(loanSetting) as CreatedAtActionResult;
            var item = createdResponse.Value as LoanSetting; ;

            // Assert
            Assert.IsType<LoanSetting>(item);
            Assert.NotNull(createdResponse);
        }

        [Fact]
        public async void Remove_NotExistingLeave_ReturnsNotFoundResponse()
        {
            // Arrange
            var notExistingId = -1;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>()));

            // Act
            var badResponse = await loanSettingController.Delete(notExistingId);

            // Assert
            Assert.IsType<NotFoundResult>(badResponse.Result);
        }

        [Fact]
        public async void Remove_ExistingLeave_ReturnsOkResult()
        {
            // Arrange
            var existingId = 3;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(Task.FromResult(GetMockLoanSetting()));
            mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns(Task.FromResult(1));

            // Act
            var okResult = await loanSettingController.Delete(existingId);

            // Assert
            Assert.IsType<ActionResult<int>>(okResult);
        }

        private static LoanSetting GetMockLoanSetting()
        {
            return new LoanSetting()
            {
                Id = 1,
            };
        }

        private static IEnumerable<LoanSetting> GetMockLoanSettingList()
        {
            List<LoanSetting> loanSettingList = new List<LoanSetting>();
            LoanSetting loanSetting = new LoanSetting
            {
                Id = 1,

            };
            loanSettingList.Add(loanSetting);
            return loanSettingList;
        }
    }
}

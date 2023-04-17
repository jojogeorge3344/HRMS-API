using Chef.Common.Models;
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
    public class PayrollComponentConfigurationControllerTest : BaseTest
    {
        private readonly Mock<IPayrollComponentConfigurationService> mockService;
        private readonly PayrollComponentConfigurationController payrollComponentConfigurationController;

        public PayrollComponentConfigurationControllerTest()
        {
            mockService = new Mock<IPayrollComponentConfigurationService>();
            payrollComponentConfigurationController = new PayrollComponentConfigurationController(mockService.Object);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsOkResult()
        {
            //Arrange
            var id = 2;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns( await Task.FromResult(GetMockPayrollComponentConfiguration()));

            // Act
            var okResult = await payrollComponentConfigurationController.Get(id);

            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsNotFoundResult()
        {
            //Arrange
            var id = -1;

            // Act
            var notFoundResult = await payrollComponentConfigurationController.Get(id);

            // Assert
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
        }

        [Fact]
        public async void GetAll_WhenCalled_ReturnsItems()
        {
            //Arrange
            mockService.Setup(repo => repo.GetAllAsync()).Returns( await Task.FromResult(GetMockPayrollComponentConfigurationList()));

            // Act
            var okResult = await payrollComponentConfigurationController.GetAll();

            // Assert
            var result = okResult.Result as OkObjectResult;
            var items = Assert.IsType<List<PayrollComponentConfiguration>>(result.Value);

            Assert.True(items.Count > 0);
        }

        //[Fact]
        //public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
        //{
        //    PayrollComponentConfiguration payrollComponentConfiguration = GetMockPayrollComponentConfiguration();
        //    mockService.Setup(service => service.InsertAsync(It.IsAny<PayrollComponentConfiguration>())).Returns( await Task.FromResult(GetMockPayrollComponentConfiguration()));

        //    // Act
        //    var createdResponse = await payrollComponentConfigurationController.Insert(payrollComponentConfiguration) as CreatedAtActionResult;
        //    var item = createdResponse.Value as PayrollComponentConfiguration; ;

        //    // Assert
        //    Assert.IsType<PayrollComponentConfiguration>(item);
        //    Assert.NotNull(createdResponse);
        //}

        [Fact]
        public async void Remove_ExistingLeave_ReturnsOkResult()
        {
            // Arrange
            var existingId = 3;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns( await Task.FromResult(GetMockPayrollComponentConfiguration()));
            mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns( await Task.FromResult(1));

            // Act
            var okResult = await payrollComponentConfigurationController.Delete(existingId);

            // Assert
            Assert.IsType<ActionResult<int>>(okResult);
        }

        private static PayrollComponentConfiguration GetMockPayrollComponentConfiguration()
        {
            return new PayrollComponentConfiguration()
            {
                Id = 1,
                Name = "General payroll component",
                ClaimFrequency = ClaimFrequencyType.Monthly,
                ClaimLimit = 1000,

            };
        }

        private static IEnumerable<PayrollComponentConfiguration> GetMockPayrollComponentConfigurationList()
        {
            List<PayrollComponentConfiguration> payrollComponentConfigurationList = new List<PayrollComponentConfiguration>();
            PayrollComponentConfiguration payrollComponentConfiguration = new PayrollComponentConfiguration
            {
                Id = 1,
                Name = "General payroll component",
                ClaimFrequency = ClaimFrequencyType.Monthly,
                ClaimLimit = 1000,

            };
            payrollComponentConfigurationList.Add(payrollComponentConfiguration);
            return payrollComponentConfigurationList;
        }
    }
}

using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Chef.HRMS.Types;
using Chef.HRMS.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace Chef.HRMS.Test
{
    public class PayrollProcessingMethodControllerTest : BaseTest
    {
        private readonly Mock<IPayrollProcessingMethodService> mockService;
        private readonly PayrollProcessingMethodController payrollProcessingMethodController;

        public PayrollProcessingMethodControllerTest()
        {
            mockService = new Mock<IPayrollProcessingMethodService>();
            payrollProcessingMethodController = new PayrollProcessingMethodController(mockService.Object);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsOkResult()
        {
            //Arrange
            var id = 2;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns( await Task.FromResult(GetMockPayrollProcessingMethod()));

            // Act
            var okResult = await payrollProcessingMethodController.Get(id);

            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsNotFoundResult()
        {
            //Arrange
            var id = -1;

            // Act
            var notFoundResult = await payrollProcessingMethodController.Get(id);

            // Assert
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
        }

        [Fact]
        public async void GetAll_WhenCalled_ReturnsItems()
        {
            //Arrange
            mockService.Setup(repo => repo.GetAllAsync()).Returns( await Task.FromResult(GetMockPayrollProcessingMethodList()));

            // Act
            var okResult = await payrollProcessingMethodController.GetAll();

            // Assert
            var result = okResult.Result as OkObjectResult;
            var items = Assert.IsType<List<PayrollProcessingMethod>>(result.Value);

            Assert.True(items.Count > 0);
        }

        [Fact]
        public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
        {
            PayrollProcessingMethod payrollProcessingMethod = GetMockPayrollProcessingMethod();
            mockService.Setup(service => service.InsertAsync(It.IsAny<PayrollProcessingMethod>())).Returns( await Task.FromResult(GetMockPayrollProcessingMethod()));

            // Act
            var createdResponse = await payrollProcessingMethodController.Insert(payrollProcessingMethod) as CreatedAtActionResult;
            var item = createdResponse.Value as PayrollProcessingMethod;

            // Assert
            Assert.IsType<PayrollProcessingMethod>(item);
            Assert.NotNull(createdResponse);
        }

        [Fact]
        public async void Remove_ExistingLeave_ReturnsOkResult()
        {
            // Arrange
            var existingId = 3;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns( await Task.FromResult(GetMockPayrollProcessingMethod()));
            mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns( await Task.FromResult(1));

            // Act
            var okResult = await payrollProcessingMethodController.Delete(existingId);

            // Assert
            Assert.IsType<ActionResult<int>>(okResult);
        }

        private static PayrollProcessingMethod GetMockPayrollProcessingMethod()
        {
            return new PayrollProcessingMethod()
            {
                Id = 1,
                ModeOfProcessing = ModeOfProcessing.PayGroup,
                PayGroupId = 2,
                EmployeeId = 49

            };
        }

        private static IEnumerable<PayrollProcessingMethod> GetMockPayrollProcessingMethodList()
        {
            List<PayrollProcessingMethod> payrollProcessingMethodList = new List<PayrollProcessingMethod>();
            PayrollProcessingMethod payrollProcessingMethod = new PayrollProcessingMethod
            {
                Id = 1,
                ModeOfProcessing = ModeOfProcessing.Employee,
                PayGroupId = 2,
                EmployeeId = 49

            };
            payrollProcessingMethodList.Add(payrollProcessingMethod);
            return payrollProcessingMethodList;

        }
    }
}

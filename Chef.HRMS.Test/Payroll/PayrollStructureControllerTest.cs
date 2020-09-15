using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Chef.HRMS.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace Chef.HRMS.Test
{
    public class PayrollStructureControllerTest : BaseTest
    {
        private readonly Mock<IPayrollStructureService> mockService;
        private readonly PayrollStructureController payrollStructureController;
        private readonly ILogger<PayrollStructureController> logger;

        public PayrollStructureControllerTest()
        {
            mockService = new Mock<IPayrollStructureService>();
            payrollStructureController = new PayrollStructureController(mockService.Object, logger);
            logger.LogDebug(1, "NLog injected into SalaryStructureController");
        }

        [Fact(Skip = "Logger implementation pending")]
        public async void Get_WhenCalled_ReturnsOkResult()
        {
            //Arrange
            var id = 2;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(Task.FromResult(GetMockPayrollStructure()));

            // Act
            var okResult = await payrollStructureController.Get(id);

            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact(Skip = "Logger implementation pending")]
        public async void Get_WhenCalled_ReturnsNotFoundResult()
        {
            //Arrange
            var id = -1;

            // Act
            var notFoundResult = await payrollStructureController.Get(id);

            // Assert
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
        }

        [Fact(Skip = "Logger implementation pending")]
        public async void GetAll_WhenCalled_ReturnsItems()
        {
            //Arrange
            mockService.Setup(repo => repo.GetAllAsync()).Returns(Task.FromResult(GetMockPayrollStructureList()));

            // Act
            var okResult = await payrollStructureController.GetAll();

            // Assert
            var result = okResult.Result as OkObjectResult;
            var items = Assert.IsType<List<PayrollStructure>>(result.Value);

            Assert.True(items.Count > 0);
        }

        [Fact(Skip = "Logger implementation pending")]
        public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
        {
            PayrollStructure payrollStructure = GetMockPayrollStructure();
            mockService.Setup(service => service.InsertAsync(It.IsAny<PayrollStructure>())).Returns(Task.FromResult(GetMockPayrollStructure()));

            // Act
            var createdResponse = await payrollStructureController.Insert(payrollStructure) as CreatedAtActionResult;
            var item = createdResponse.Value as PayrollStructure;

            // Assert
            Assert.IsType<PayrollStructure>(item);
            Assert.NotNull(createdResponse);
        }

        [Fact(Skip = "Logger implementation pending")]
        public async void Remove_ExistingLeave_ReturnsOkResult()
        {
            // Arrange
            var existingId = 3;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(Task.FromResult(GetMockPayrollStructure()));
            mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns(Task.FromResult(1));

            // Act
            var okResult = await payrollStructureController.Delete(existingId);

            // Assert
            Assert.IsType<ActionResult<int>>(okResult);
        }

        private static PayrollStructure GetMockPayrollStructure()
        {
            return new PayrollStructure()
            {
                Id = 1,
                Name = "General payroll component",

            };
        }

        private static IEnumerable<PayrollStructure> GetMockPayrollStructureList()
        {
            List<PayrollStructure> payrollStructureList = new List<PayrollStructure>();
            PayrollStructure payrollStructure = new PayrollStructure
            {
                Id = 1,
                Name = "General payroll component",

            };

            payrollStructureList.Add(payrollStructure);
            return payrollStructureList;
        }
    }
}

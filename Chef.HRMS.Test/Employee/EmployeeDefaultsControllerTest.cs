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
    public class EmployeeDefaultsControllerTest : BaseTest
    {
        private readonly Mock<IEmployeeDefaultsServices> mockService;
        private readonly EmployeeDefaultController employeeDefaultController;

        public EmployeeDefaultsControllerTest()
        {
            mockService = new Mock<IEmployeeDefaultsServices>();
            employeeDefaultController = new EmployeeDefaultController(mockService.Object);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsOkResult()
        {
            //Arrange
            var id = 2;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns( await Task.FromResult(GetMockEmployeeDefault()));

            // Act
            var okResult = await employeeDefaultController.Get(id);

            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsNotFoundResult()
        {
            //Arrange
            var id = -1;

            // Act
            var notFoundResult = await employeeDefaultController.Get(id);

            // Assert
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
        }

        [Fact]
        public async void GetAll_WhenCalled_ReturnsItems()
        {
            //Arrange
            mockService.Setup(repo => repo.GetAllAsync()).Returns( await Task.FromResult(GetMockEmployeeDefaultList()));

            // Act
            var okResult = await employeeDefaultController.GetAll();

            // Assert
            var result = okResult.Result as OkObjectResult;
            var items = Assert.IsType<List<EmployeeDefaults>>(result.Value);

            Assert.True(items.Count > 0);
        }

        [Fact]
        public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
        {
            //Arrange
            EmployeeDefaults employeeDefault = GetMockEmployeeDefault();
          //  mockService.Setup(service => service.InsertAsync(It.IsAny<EmployeeDefaults>())).Returns(await Task.FromResult(GetMockEmployeeDefault()));

            // Act
            var createdResponse = await employeeDefaultController.Insert(employeeDefault) as CreatedAtActionResult;
            var item = createdResponse.Value as EmployeeDefaults;

            // Assert
            Assert.IsType<EmployeeDefaults>(item);
            Assert.NotNull(createdResponse);
        }

        [Fact]
        public async void Remove_NotExistingLeave_ReturnsNotFoundResponse()
        {
            // Arrange
            var notExistingId = -1;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>()));

            // Act
            var badResponse = await employeeDefaultController.Delete(notExistingId);

            // Assert
            Assert.IsType<NotFoundResult>(badResponse);
        }

        [Fact]
        public async void Remove_ExistingLeave_ReturnsOkResult()
        {
            // Arrange
            var existingId = 6;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns( await Task.FromResult(GetMockEmployeeDefault()));
            mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns( await Task.FromResult(1));

            // Act
            var okResult = await employeeDefaultController.Delete(existingId);

            // Assert
            Assert.IsType<OkObjectResult>(okResult);
        }

        private static EmployeeDefaults GetMockEmployeeDefault()
        {
            return new EmployeeDefaults()
            {
                ProbationDuration = 6,
                WorkerType = WorkerType.Permanent,
                TimeType = TimeType.FullTime,
            };
        }

        private static IEnumerable<EmployeeDefaults> GetMockEmployeeDefaultList()
        {
            List<EmployeeDefaults> listEmployeeDefaults = new List<EmployeeDefaults>();
            EmployeeDefaults employeeDefaults = new EmployeeDefaults
            {
                ProbationDuration = 6,
                WorkerType = WorkerType.Permanent,
                TimeType = TimeType.FullTime,
            };
            listEmployeeDefaults.Add(employeeDefaults);
            return listEmployeeDefaults;
        }
    }
}

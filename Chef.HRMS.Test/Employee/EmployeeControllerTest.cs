using Chef.Common.Models;
using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Chef.HRMS.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace Chef.HRMS.Test
{
    public class EmployeeControllerTest : BaseTest
    {
        private readonly Mock<IEmployeeService> mockService;
        private readonly EmployeeController employeeController;

        public EmployeeControllerTest()
        {
            mockService = new Mock<IEmployeeService>();
            employeeController = new EmployeeController(mockService.Object);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsOkResult()
        {
            //Arrange
            var id = 2;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(Task.FromResult(GetMockEmployeeDetails()));

            // Act
            var okResult = await employeeController.Get(id);

            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsNotFoundResult()
        {
            //Arrange
            var id = -1;

            // Act
            var notFoundResult = await employeeController.Get(id);

            // Assert
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
        }

        [Fact]
        public async void GetAll_WhenCalled_ReturnsItems()
        {
            //Arrange
            mockService.Setup(repo => repo.GetAllAsync()).Returns(Task.FromResult(GetMockEmployeeList()));

            // Act
            var okResult = await employeeController.GetAll();

            // Assert
            var result = okResult.Result as OkObjectResult;
            var items = Assert.IsType<List<Employee>>(result.Value);

            Assert.True(items.Count > 0);
        }

        [Fact]
        public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
        {
            Employee employee = GetMockEmployeeDetails();
            mockService.Setup(service => service.InsertAsync(It.IsAny<Employee>())).Returns(Task.FromResult(GetMockEmployeeDetails()));

            // Act
            var createdResponse = await employeeController.Insert(employee) as CreatedAtActionResult;
            var item = createdResponse.Value as Employee;;

            // Assert
            Assert.IsType<Employee>(item);
            Assert.NotNull(createdResponse);
        }

        [Fact]
        public async void Remove_NotExistingLeave_ReturnsNotFoundResponse()
        {
            // Arrange
            var notExistingId = -1;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>()));

            // Act
            var badResponse = await employeeController.Delete(notExistingId);

            // Assert
            Assert.IsType<NotFoundResult>(badResponse.Result);
        }

        [Fact]
        public async void Remove_ExistingLeave_ReturnsOkResult()
        {
            // Arrange
            var existingId = 3;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(Task.FromResult(GetMockEmployeeDetails()));
            mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns(Task.FromResult(1));

            // Act
            var okResult = await employeeController.Delete(existingId);

            // Assert
            Assert.IsType<ActionResult<int>>(okResult);
        }

        private static Employee  GetMockEmployeeDetails()
        {
            return new Employee()
            {
                FirstName = "Soumya",
                MiddleName = "",
                LastName = "Sridhar",
                DisplayName = "soumyasridhar",
                Gender = GenderType.Female,
                DateOfBirth = DateTime.Now,
                Email = "test@chef.com"
            };
        }

        private static IEnumerable<Employee> GetMockEmployeeList()
        {
            List<Employee> employeeList = new List<Employee>();
            Employee employee = new Employee
            {
                FirstName = "Soumya",
                MiddleName = "",
                LastName = "Sridhar",
                DisplayName = "soumyasridhar",
                Gender = GenderType.Female,
                DateOfBirth = DateTime.Now,
                Email = "test@chef.com"
            };
            employeeList.Add(employee);
            return employeeList;
        }
    }
}

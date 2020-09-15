using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Chef.HRMS.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Chef.HRMS.Test
{
    public class ExpensePolicyConfigurationControllerTest : BaseTest
    {
        private readonly Mock<IExpensePolicyConfigurationService> mockService;
        private readonly ExpensePolicyConfigurationController expensePolicyConfigurationController;

        public ExpensePolicyConfigurationControllerTest()
        {
            mockService = new Mock<IExpensePolicyConfigurationService>();
            expensePolicyConfigurationController = new ExpensePolicyConfigurationController(mockService.Object);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsOkResult()
        {
            //Arrange
            var id = 2;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(Task.FromResult(GetMockExpensePolicyConfiguration()));

            // Act
            var okResult = await expensePolicyConfigurationController.Get(id);

            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsNotFoundResult()
        {
            //Arrange
            var id = -1;

            // Act
            var notFoundResult = await expensePolicyConfigurationController.Get(id);

            // Assert
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
        }

        [Fact]
        public async void GetAll_WhenCalled_ReturnsItems()
        {
            //Arrange
            mockService.Setup(repo => repo.GetAllAsync()).Returns(Task.FromResult(GetMockExpensePolicyConfigurationList()));

            // Act
            var okResult = await expensePolicyConfigurationController.GetAll();

            // Assert
            var result = okResult.Result as OkObjectResult;
            var items = Assert.IsType<List<ExpensePolicyConfiguration>>(result.Value);

            Assert.True(items.Count > 0);
        }

        //[Fact]
        //public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
        //{
        //    ExpensePolicyConfiguration ExpensePolicyConfiguration = GetMockExpensePolicyConfiguration();
        //    mockService.Setup(service => service.InsertAsync(It.IsAny<ExpensePolicyConfiguration>())).Returns(Task.FromResult(GetMockExpensePolicyConfiguration()));

        //    // Act
        //    var createdResponse = await expensePolicyConfigurationController.Insert(ExpensePolicyConfiguration) as CreatedAtActionResult;
        //    var item = createdResponse.Value as ExpensePolicyConfiguration; ;

        //    // Assert
        //    Assert.IsType<ExpensePolicyConfiguration>(item);
        //    Assert.NotNull(createdResponse);
        //}

        [Fact]
        public async void Remove_NotExistingLeave_ReturnsNotFoundResponse()
        {
            // Arrange
            var notExistingId = -1;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>()));

            // Act
            var badResponse = await expensePolicyConfigurationController.Delete(notExistingId);

            // Assert
            Assert.IsType<NotFoundResult>(badResponse.Result);
        }

        [Fact]
        public async void Remove_ExistingLeave_ReturnsOkResult()
        {
            // Arrange
            var existingId = 3;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(Task.FromResult(GetMockExpensePolicyConfiguration()));
            mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns(Task.FromResult(1));

            // Act
            var okResult = await expensePolicyConfigurationController.Delete(existingId);

            // Assert
            Assert.IsType<ActionResult<int>>(okResult);
        }

        private static ExpensePolicyConfiguration GetMockExpensePolicyConfiguration()
        {
            return new ExpensePolicyConfiguration()
            {
                Id = 1,
            };
        }

        private static IEnumerable<ExpensePolicyConfiguration> GetMockExpensePolicyConfigurationList()
        {
            List<ExpensePolicyConfiguration> ExpensePolicyConfigurationList = new List<ExpensePolicyConfiguration>();
            ExpensePolicyConfiguration ExpensePolicyConfiguration = new ExpensePolicyConfiguration
            {
                Id = 1,

            };
            ExpensePolicyConfigurationList.Add(ExpensePolicyConfiguration);
            return ExpensePolicyConfigurationList;
        }
    }
}

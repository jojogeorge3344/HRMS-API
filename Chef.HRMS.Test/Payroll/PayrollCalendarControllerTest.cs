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
    public class PayrollCalendarControllerTest : BaseTest
    {
        private readonly Mock<IPayrollCalendarService> mockService;
        private readonly PayrollCalendarController PayrollCalendarController;

        public PayrollCalendarControllerTest()
        {
            mockService = new Mock<IPayrollCalendarService>();
            PayrollCalendarController = new PayrollCalendarController(mockService.Object);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsOkResult()
        {
            //Arrange
            var id = 2;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(Task.FromResult(GetMockPayrollCalendar()));

            // Act
            var okResult = await PayrollCalendarController.Get(id);

            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsNotFoundResult()
        {
            //Arrange
            var id = -1;

            // Act
            var notFoundResult = await PayrollCalendarController.Get(id);

            // Assert
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
        }

        [Fact]
        public async void GetAll_WhenCalled_ReturnsItems()
        {
            //Arrange
            mockService.Setup(repo => repo.GetAllAsync()).Returns(Task.FromResult(GetMockPayrollCalendarList()));

            // Act
            var okResult = await PayrollCalendarController.GetAll();

            // Assert
            var result = okResult.Result as OkObjectResult;
            var items = Assert.IsType<List<PayrollCalendar>>(result.Value);

            Assert.True(items.Count > 0);
        }

        [Fact]
        public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
        {
            PayrollCalendar PayrollCalendar = GetMockPayrollCalendar();
            mockService.Setup(service => service.InsertAsync(It.IsAny<PayrollCalendar>())).Returns(Task.FromResult(GetMockPayrollCalendar()));

            // Act
            var createdResponse = await PayrollCalendarController.Insert(PayrollCalendar) as CreatedAtActionResult;
            var item = createdResponse.Value as PayrollCalendar;

            // Assert
            Assert.IsType<PayrollCalendar>(item);
            Assert.NotNull(createdResponse);
        }

        [Fact]
        public async void Remove_ExistingLeave_ReturnsOkResult()
        {
            // Arrange
            var existingId = 3;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(Task.FromResult(GetMockPayrollCalendar()));
            mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns(Task.FromResult(1));

            // Act
            var okResult = await PayrollCalendarController.Delete(existingId);

            // Assert
            Assert.IsType<ActionResult<int>>(okResult);
        }

        private static PayrollCalendar GetMockPayrollCalendar()
        {
            return new PayrollCalendar()
            {
                Id = 1,
                Name = "General payroll Calendar",
               
            };
        }

        private static IEnumerable<PayrollCalendar> GetMockPayrollCalendarList()
        {
            List<PayrollCalendar> PayrollCalendarList = new List<PayrollCalendar>();
            PayrollCalendar PayrollCalendar = new PayrollCalendar
            {
                Id = 1,
                Name = "General payroll Calendar",
               
            };
            PayrollCalendarList.Add(PayrollCalendar);
            return PayrollCalendarList;
        }
    }
}

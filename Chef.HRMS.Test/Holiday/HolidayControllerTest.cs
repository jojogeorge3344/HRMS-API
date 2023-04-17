using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Chef.HRMS.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Threading.Tasks;
using Xunit;

namespace Chef.HRMS.Test
{
    public class HolidayControllerTest : BaseTest
    {
        private readonly Mock<IHolidayService> mockService;
        private readonly HolidayController holidayController;

        public HolidayControllerTest()
        {
            mockService = new Mock<IHolidayService>();
            holidayController = new HolidayController(mockService.Object);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsOkResult()
        {
            //Arrange
            var categoryId = 2;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns( await Task.FromResult(GetMockHoliday()));

            // Act
            var okResult = await holidayController.GetAllByCategory(categoryId);

            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact]
        public async void InsertHoliday_ValidObjectPassed_ReturnedResponseHasCreatedItem()
        {
            //Arrange
            Holiday holiday = GetMockHoliday();
            mockService.Setup(service => service.InsertAsync(It.IsAny<Holiday>())).Returns( await Task.FromResult(GetMockHoliday()));

            // Act
            var createdResponse = await holidayController.Insert(holiday) as CreatedAtActionResult;
            var item = createdResponse.Value as Holiday; ;

            // Assert
            Assert.IsType<Holiday>(item);
            Assert.NotNull(createdResponse);
        }

        [Fact]
        public async void Remove_NotExistingHoliday_ReturnsNotFoundResponse()
        {
            // Arrange
            var notExistingId = -1;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>()));

            // Act
            var badResponse = await holidayController.Delete(notExistingId);

            // Assert
            Assert.IsType<NotFoundResult>(badResponse);
        }

        [Fact]
        public async void Remove_ExistingHoliday_ReturnsOkResult()
        {
            // Arrange
            var existingId = 3;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns( await Task.FromResult(GetMockHoliday()));
            mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns( await Task.FromResult(1));

            // Act
            var okResult = await holidayController.Delete(existingId);

            // Assert
            Assert.IsType<OkObjectResult>(okResult);
        }

        private static Holiday GetMockHoliday()
        {
            return new Holiday()
            {
                Name = "Christmas",
                Date = System.DateTime.Now,
                HolidayCategoryId = 4,
                IsFloating = true,
                IsArchived = false
            };
        }
    }
}
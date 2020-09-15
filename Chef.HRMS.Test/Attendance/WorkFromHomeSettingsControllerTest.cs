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
    public class WorkFromHomeSettingsControllerTest : BaseTest
    {
        private readonly Mock<IWorkFromHomeSettingsService> mockService;
        private readonly WorkFromHomeSettingsController workFromHomeAdminSettingsController;

        public WorkFromHomeSettingsControllerTest()
        {
            mockService = new Mock<IWorkFromHomeSettingsService>();
            workFromHomeAdminSettingsController = new WorkFromHomeSettingsController(mockService.Object);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsOkResult()
        {
            //Arrange
            var id = 2;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(Task.FromResult(GetMockWorkFromHomeAdminSettings()));

            // Act
            var okResult = await workFromHomeAdminSettingsController.Get(id);

            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsNotFoundResult()
        {
            //Arrange
            var id = -1;

            // Act
            var notFoundResult = await workFromHomeAdminSettingsController.Get(id);

            // Assert
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
        }

        [Fact]
        public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
        {
            WorkFromHomeSettings WorkFromHomeAdminSettings = GetMockWorkFromHomeAdminSettings();
            mockService.Setup(service => service.InsertAsync(It.IsAny<WorkFromHomeSettings>())).Returns(Task.FromResult(GetMockWorkFromHomeAdminSettings()));

            // Act
            var createdResponse = await workFromHomeAdminSettingsController.Insert(WorkFromHomeAdminSettings) as CreatedAtActionResult;
            var item = createdResponse.Value as WorkFromHomeSettings; ;

            // Assert
            Assert.IsType<WorkFromHomeSettings>(item);
            Assert.NotNull(createdResponse);
        }

        private static WorkFromHomeSettings GetMockWorkFromHomeAdminSettings()
        {
            return new WorkFromHomeSettings()
            {
                Id = 1,
            };
        }

        private static IEnumerable<WorkFromHomeSettings> GetMockWorkFromHomeAdminSettingsList()
        {
            List<WorkFromHomeSettings> WorkFromHomeAdminSettingsList = new List<WorkFromHomeSettings>();
            WorkFromHomeSettings WorkFromHomeAdminSettings = new WorkFromHomeSettings
            {
                Id = 1,

            };
            WorkFromHomeAdminSettingsList.Add(WorkFromHomeAdminSettings);
            return WorkFromHomeAdminSettingsList;
        }
    }
}

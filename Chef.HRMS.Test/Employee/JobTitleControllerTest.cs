using System.Collections.Generic;
using System.Threading.Tasks;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using Chef.HRMS.Services;
using Chef.HRMS.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace Chef.HRMS.Test
{
    public class JobTitleControllerTest : BaseTest
    {
        private readonly Mock<IJobTitleServices> mockService;
        private readonly JobTitleController jobTitleController;

        public JobTitleControllerTest()
        {
            mockService = new Mock<IJobTitleServices>();
            jobTitleController = new JobTitleController(mockService.Object);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsOkResult()
        {
            //Arrange
            var id = 2;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(Task.FromResult(GetMockJobTitle()));

            // Act
            var okResult = await jobTitleController.Get(id);

            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsNotFoundResult()
        {
            //Arrange
            var id = -1;

            // Act
            var notFoundResult = await jobTitleController.Get(id);

            // Assert
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
        }

        [Fact]
        public async void GetAll_WhenCalled_ReturnsItems()
        {
            //Arrange
            mockService.Setup(repo => repo.GetAllAsync()).Returns(Task.FromResult(GetMockJobTitleList()));

            // Act
            var okResult = await jobTitleController.GetAllJobTitleList();

            // Assert
            var result = okResult.Result as OkObjectResult;
            var items = Assert.IsType<List<JobTitle>>(result.Value);

            Assert.True(items.Count > 0);
        }

        [Fact]
        public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
        {
            //Arrange
            JobTitle JobTitle = GetMockJobTitle();
            mockService.Setup(service => service.InsertAsync(It.IsAny<JobTitle>())).Returns(Task.FromResult(GetMockJobTitle()));

            // Act
            var createdResponse = await jobTitleController.Insert(JobTitle) as CreatedAtActionResult;
            var item = createdResponse.Value as JobTitle;

            // Assert
            Assert.IsType<JobTitle>(item);
            Assert.NotNull(createdResponse);
        }

        [Fact]
        public async void Remove_NotExistingLeave_ReturnsNotFoundResponse()
        {
            // Arrange
            var notExistingId = -1;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>()));

            // Act
            var badResponse = await jobTitleController.Delete(notExistingId);

            // Assert
            Assert.IsType<NotFoundResult>(badResponse);
        }

        [Fact]
        public async void Remove_ExistingLeave_ReturnsOkResult()
        {
            // Arrange
            var existingId = 3;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(Task.FromResult(GetMockJobTitle()));
            mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns(Task.FromResult(1));

            // Act
            var okResult = await jobTitleController.Delete(existingId);

            // Assert
            Assert.IsType<OkObjectResult>(okResult);
        }

        private static JobTitle GetMockJobTitle()
        {
            return new JobTitle()
            {
                Name = "Software Engineer",
                Description = "Software Engineer"
            };
        }
        private static IEnumerable<JobTitle> GetMockJobTitleList()
        {
            List<JobTitle> jobTitleList = new List<JobTitle>();
            JobTitle jobTitle = new JobTitle
            {
                Name = "Software Engineer",
                Description = "Software Engineer"
            };
            jobTitleList.Add(jobTitle);
            return jobTitleList;
        }
    }
}

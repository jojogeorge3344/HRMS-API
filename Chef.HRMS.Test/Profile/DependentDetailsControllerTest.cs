using Chef.Common.Models;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
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
    public class DependentDetailsControllerTest : BaseTest
    {
        readonly DependentRepository dependentDetailsRepository;
        readonly DependentService dependentDetailsService;
        readonly DependentController dependentDetailsController;
        private readonly Mock<IDependentService> mockService;

        public DependentDetailsControllerTest()
        {
            dependentDetailsRepository = new DependentRepository(ConnectionFactory);
            dependentDetailsService = new DependentService(dependentDetailsRepository);
            dependentDetailsController = new DependentController(dependentDetailsService);

            mockService = new Mock<IDependentService>();
            dependentDetailsController = new DependentController(mockService.Object);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsOkResult()
        {
            //Arrange
            var id = 1;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(Task.FromResult(GetMockDependentDetails()));

            // Act
            var okResult = await dependentDetailsController.Get(id);

            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsNotFoundResult()
        {
            //Arrange
            var id = -1;

            // Act
            var notFoundResult = await dependentDetailsController.Get(id);

            // Assert
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
        }

        [Fact]
        public async void GetAll_WhenCalled_ReturnsItems()
        {
            //Arrange
            mockService.Setup(repo => repo.GetAllAsync()).Returns(Task.FromResult<IEnumerable<Dependent>>(GetMockDependentDetailsList()));

            // Act
            var okResult = await dependentDetailsController.GetAll();

            // Assert
            var result = okResult.Result as OkObjectResult;
            var items = Assert.IsType<List<Dependent>>(result.Value);

            Assert.True(items.Count > 0);
        }

        [Fact]
        public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
        {
            //Arrange
            mockService.Setup(service => service.InsertAsync(It.IsAny<Dependent>())).Returns(Task.FromResult(GetMockDependentDetails()));
            Dependent dependentDetails = GetMockDependentDetails();

            // Act
            var createdResponse = await dependentDetailsController.Insert(dependentDetails) as CreatedAtActionResult;
            var item = createdResponse.Value as Dependent; ;

            // Assert
            Assert.IsType<Dependent>(item);
            Assert.NotNull(createdResponse);
        }

        [Fact]
        public async void Add_InvalidObjectPassed_ReturnsBadRequest()
        {
            //Arrange
            Dependent nameMissingDependentDetails = GetMockDependentDetails();
            nameMissingDependentDetails.Name = null;
            dependentDetailsController.ModelState.AddModelError("Name", "Required");
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(Task.FromResult(GetMockDependentDetails()));

            // Act
            var badResponse = await dependentDetailsController.Insert(nameMissingDependentDetails);

            // Assert
            Assert.IsType<BadRequestObjectResult>(badResponse);
        }

        [Fact]
        public async void Remove_NotExistingDependentDetails_ReturnsNotFoundResponse()
        {
            // Arrange
            var notExistingId = -1;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>()));

            // Act
            var badResponse = await dependentDetailsController.Delete(notExistingId);

            // Assert
            Assert.IsType<NotFoundResult>(badResponse.Result);
        }

        [Fact]
        public async void Remove_ExistingDependentDetails_ReturnsOkResult()
        {
            // Arrange
            var existingId = 3;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(Task.FromResult(GetMockDependentDetails()));
            mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns(Task.FromResult(1));

            // Act
            var okResult = await dependentDetailsController.Delete(existingId);

            // Assert
            Assert.IsType<ActionResult<int>>(okResult);
        }

        private static Dependent GetMockDependentDetails()
        {
            return new Dependent()
            {
                Name = "1",
                Phone = "638504",
                Relationship = RelationshipType.Husband
            };
        }
        private static IEnumerable<Dependent> GetMockDependentDetailsList()
        {
            List<Dependent> dependentList = new List<Dependent>();
            Dependent dependent= new Dependent
            {
                Name = "1",
                Phone = "638504",
                Relationship = RelationshipType.Husband
            };
            dependentList.Add(dependent);
            return dependentList;
        }
    }
}

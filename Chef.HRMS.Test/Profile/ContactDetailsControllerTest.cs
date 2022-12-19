using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using Chef.HRMS.Services;
using Chef.HRMS.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace Chef.HRMS.Test
{
    public class ContactDetailsControllerTest : BaseTest
    {
        readonly ContactRepository contactDetailsRepository;
        readonly ContactService contactDetailsService;
        readonly ContactController contactDetailsController;
        private readonly Mock<IContactService> mockService;

        public ContactDetailsControllerTest()
        {
            contactDetailsRepository = new ContactRepository(ConnectionFactory);
            contactDetailsService = new ContactService(contactDetailsRepository);
            contactDetailsController = new ContactController(contactDetailsService);
            mockService = new Mock<IContactService>();
        }

        [Fact(Skip = "Need to recheck")]
        public async void Get_WhenCalled_ReturnsOkResult()
        {
            //Arrange
            var id = 2;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns( await Task.FromResult(GetMockContactDetails()));

            // Act
            var okResult = await contactDetailsController.Get(id);

            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsNotFoundResult()
        {
            //Arrange
            var id = -1;

            // Act
            var notFoundResult = await contactDetailsController.Get(id);

            // Assert
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
        }

        [Fact]
        public async void GetAll_WhenCalled_ReturnsItems()
        {
            //Arrange
            mockService.Setup(repo => repo.GetAllAsync()).Returns( await Task.FromResult(GetMockContactDetailsList()));

            // Act
            var okResult = await contactDetailsController.GetAll();

            // Assert
            var result = okResult.Result as OkObjectResult;
            var items = Assert.IsType<List<Contact>>(result.Value);

            Assert.True(items.Count > 0);
        }

        [Fact]
        public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
        {
            //Arrange
            Contact contactDetails = GetMockContactDetails();
            mockService.Setup(service => service.InsertAsync(It.IsAny<Contact>())).Returns( await Task.FromResult(GetMockContactDetails()));


            // Act
            var createdResponse = await contactDetailsController.Insert(contactDetails) as CreatedAtActionResult;
            var item = createdResponse.Value as Contact; ;

            // Assert
            Assert.IsType<Contact>(item);
            Assert.NotNull(createdResponse);
        }

        [Fact]
        public async void Add_InvalidObjectPassed_ReturnsBadRequest()
        {
            //Arrange
            Contact nameMissingContactDetails = GetMockContactDetails();
            nameMissingContactDetails.Mobile = null;
            contactDetailsController.ModelState.AddModelError("Mobile", "Required");

            // Act
            var badResponse = await contactDetailsController.Insert(nameMissingContactDetails);

            // Assert
            Assert.IsType<BadRequestObjectResult>(badResponse);
        }

        [Fact]
        public async void Remove_NotExistingContactDetails_ReturnsNotFoundResponse()
        {
            // Arrange
            var notExistingId = -1;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>()));

            // Act
            var badResponse = await contactDetailsController.Delete(notExistingId);

            // Assert
            Assert.IsType<NotFoundResult>(badResponse.Result);
        }

        [Fact]
        public async void Remove_ExistingContactDetails_ReturnsOkResult()
        {
            // Arrange
            var existingId = 3;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns( await Task.FromResult(GetMockContactDetails()));
            mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns( await Task.FromResult(1));

            // Act
            var okResult = await contactDetailsController.Delete(existingId);

            // Assert
            Assert.IsType<ActionResult<int>>(okResult);
        }

        private static Contact GetMockContactDetails()
        {
            return new Contact()
            {
                EmployeeId = 1,
                Mobile = "9498771220",
                WorkEmail = "test@t.com"
            };
        }
        private static IEnumerable<Contact> GetMockContactDetailsList()
        {
            var contactList = new List<Contact>();
            Contact contact = new Contact
            {
                EmployeeId = 1,
                Mobile = "1",
                WorkEmail = "soumyas@thomsuninfocare.com"
            };
            contactList.Add(contact);
            return contactList;
        }
    }
}

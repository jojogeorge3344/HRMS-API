using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Chef.HRMS.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace Chef.HRMS.Test
{
    public class BranchControllerTest : BaseTest
    {
        private readonly Mock<IBranchService> mockService;
        private readonly BranchController branchController;

        public BranchControllerTest()
        {
            mockService = new Mock<IBranchService>();
            branchController = new BranchController(mockService.Object);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsOkResult()
        {
            //Arrange
            var id = 9;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(Task.FromResult(GetMockBranch()));

            // Act
            var okResult = await branchController.Get(id);

            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsNotFoundResult()
        {
            //Arrange
            var id = -1;

            // Act
            var notFoundResult = await branchController.Get(id);

            // Assert
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
        }

        [Fact]
        public async void GetAll_WhenCalled_ReturnsItems()
        {
            //Arrange
            mockService.Setup(repo => repo.GetAllAsync()).Returns(Task.FromResult(GetMockBranchList()));

            // Act
            var okResult = await branchController.GetAll();

            // Assert
            var result = okResult.Result as OkObjectResult;
            var items = Assert.IsType<List<HRMSBranch>>(result.Value);

            Assert.True(items.Count > 0);

        }

        [Fact]
        public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
        {
            //Arrange
            HRMSBranch branch = GetMockBranch();
            mockService.Setup(service => service.InsertAsync(It.IsAny<HRMSBranch>())).Returns(Task.FromResult(GetMockBranch()));

            // Act
            var createdResponse = await branchController.Insert(branch) as CreatedAtActionResult;
            var item = createdResponse.Value as HRMSBranch;

            // Assert
            Assert.IsType<HRMSBranch>(item);
            Assert.NotNull(createdResponse);
        }

        [Fact]
        public async void Add_InvalidObjectPassed_ReturnsBadRequest()
        {
            //Arrange
            HRMSBranch nameMissingBranch = GetMockBranch();
            nameMissingBranch.ShortName = null;
            branchController.ModelState.AddModelError("ShortName", "Required");
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(Task.FromResult(GetMockBranch()));

            // Act
            var badResponse = await branchController.Insert(nameMissingBranch);

            // Assert
            Assert.IsType<BadRequestObjectResult>(badResponse);
        }

        [Fact]
        public async void Remove_NotExistingBranch_ReturnsNotFoundResponse()
        {
            // Arrange
            var notExistingId = -1;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>()));

            // Act
            var badResponse = await branchController.Delete(notExistingId);

            // Assert
            Assert.IsType<NotFoundResult>(badResponse.Result);
        }

        [Fact]
        public async void Remove_ExistingBranch_ReturnsOkResult()
        {
            // Arrange
            var existingId = 11;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(Task.FromResult(GetMockBranch()));
            mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns(Task.FromResult(1));

            // Act
            var okResponse = await branchController.Delete(existingId);

            // Assert
            Assert.IsType<ActionResult<int>>(okResponse);
        }

        private static HRMSBranch GetMockBranch()
        {
            return new HRMSBranch()
            {
                ShortName = "Branch B",
                TimeZoneId = "en-IN",
                CompanyId = 1,
                AddressLine1 = "Infopark Phase 2",
                AddressLine2 = "Kakkanad",
                City = "Kochi",
                Email = "contactus@chef.com",
                Fax = "0484-1231234",
                Phone = "0484-1231235",
                Pincode = "682303"
            };
        }
        private static IEnumerable<HRMSBranch> GetMockBranchList()
        {
            var branchList = new List<HRMSBranch>();
            HRMSBranch branch = new HRMSBranch
            {
                ShortName = "Branch B",
                TimeZoneId = "en-IN",
                CompanyId = 1,
                AddressLine1 = "Infopark Phase 2",
                AddressLine2 = "Kakkanad",
                City = "Kochi",
                Email = "contactus@chef.com",
                Fax = "0484-1231234",
                Phone = "0484-1231235",
                Pincode = "682303"
            };
            branchList.Add(branch);
            return branchList;
        }
    }
}
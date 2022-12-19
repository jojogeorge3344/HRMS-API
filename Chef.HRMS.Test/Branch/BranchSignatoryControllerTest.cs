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
    public class BranchSignatoryControllerTest : BaseTest
    {
        private readonly Mock<IBranchSignatoryService> mockService;
        private readonly BranchSignatoryController branchSignatoryController;

        public BranchSignatoryControllerTest()
        {
            mockService = new Mock<IBranchSignatoryService>();
            branchSignatoryController = new BranchSignatoryController(mockService.Object);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsOkResult()
        {
            //Arrange
            var id = 13;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns( await Task.FromResult(GetMockBranchSignatory()));

            // Act
            var okResult = await branchSignatoryController.Get(id);

            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsNotFoundResult()
        {
            //Arrange
            var id = -1;

            // Act
            var notFoundResult = await branchSignatoryController.Get(id);

            // Assert
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
        }

        [Fact]
        public async void GetAll_WhenCalled_ReturnsItems()
        {
            //Arrange
            var id = 13;
            mockService.Setup(repo => repo.GetAllByBranch(It.IsAny<int>())).Returns( await Task.FromResult(GetMockBranchSignatoryList()));

            // Act
            var okResult = await branchSignatoryController.GetAllByBranch(id);

            // Assert
            var result = okResult.Result as OkObjectResult;
            var items = Assert.IsType<List<HRMSBranchSignatory>>(result.Value);
            Assert.True(items.Count > 0);
        }

        [Fact]
        public async void GetAll_WhenCalled_NotReturnsItems()
        {
            //Arrange
            var id = -1;
            mockService.Setup(repo => repo.InsertAsync(It.IsAny<HRMSBranchSignatory>()));

            // Act
            var notFoundResult = await branchSignatoryController.GetAllByBranch(id);

            // Assert
            Assert.Null(notFoundResult.Value);
        }

        [Fact]
        public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
        {
            //Arrange
            HRMSBranchSignatory BranchSignatory = GetMockBranchSignatory();
            mockService.Setup(repo => repo.InsertAsync(It.IsAny<HRMSBranchSignatory>())).Returns( await Task.FromResult(GetMockBranchSignatory()));

            // Act
            var createdResponse = await branchSignatoryController.Insert(BranchSignatory) as CreatedAtActionResult;
            var item = createdResponse.Value as HRMSBranchSignatory;

            // Assert
            Assert.IsType<HRMSBranchSignatory>(item);
            Assert.NotNull(createdResponse);
        }

        [Fact]
        public async void Add_InvalidObjectPassed_ReturnsBadRequest()
        {
            //Arrange
            HRMSBranchSignatory nameMissingBranchSignatory = GetMockBranchSignatory();
            nameMissingBranchSignatory.FullName = null;
            branchSignatoryController.ModelState.AddModelError("Name", "Required");

            // Act
            var badResponse = await branchSignatoryController.Insert(nameMissingBranchSignatory);

            // Assert
            Assert.IsType<BadRequestObjectResult>(badResponse);
        }

        [Fact]
        public async void Remove_NotExistingBranchSignatory_ReturnsNotFoundResponse()
        {
            // Arrange
            var notExistingId = -1;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>()));

            // Act
            var badResponse = await branchSignatoryController.Delete(notExistingId);

            // Assert
            Assert.IsType<NotFoundResult>(badResponse.Result);
        }

        [Fact]
        public async void Remove_ExistingBranchSignatory_ReturnsOkResult()
        {
            // Arrange
            var existingId = 1;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns( await Task.FromResult(GetMockBranchSignatory()));
            mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns( await Task.FromResult(1));

            // Act
            var okResponse = await branchSignatoryController.Delete(existingId);

            // Assert
            Assert.IsType<ActionResult<int>>(okResponse);
        }

        private static HRMSBranchSignatory GetMockBranchSignatory()
        {
            return new HRMSBranchSignatory()
            {
                FullName = "Chaco",
                Designation = "Director",
                FatherName = "Chacos Dad",
                PANNumber = "AVWSW1329OP",
                BranchId = 13,
                AddressLine1 = "Infopark Phase 2",
                AddressLine2 = "Kakkanad",
                City = "Koci",
                Country = 1,
                Email = "contactus@chef.com",
                Fax = "0484-1231234",
                Phone = "0484-1231235",
                Pincode = "682303",
                StateOrProvince = 1
            };
        }
        private static IEnumerable<HRMSBranchSignatory> GetMockBranchSignatoryList()
        {
            var branchSignatoryList = new List<HRMSBranchSignatory>();
            HRMSBranchSignatory branchSignatory = new HRMSBranchSignatory
            {
                FullName = "Chaco",
                Designation = "Director",
                FatherName = "Chacos Dad",
                PANNumber = "AVWSW1329OP",
                BranchId = 13,
                AddressLine1 = "Infopark Phase 2",
                AddressLine2 = "Kakkanad",
                City = "Koci",
                Country = 1,
                Email = "contactus@chef.com",
                Fax = "0484-1231234",
                Phone = "0484-1231235",
                Pincode = "682303",
                StateOrProvince = 1
            };
            branchSignatoryList.Add(branchSignatory);
            return branchSignatoryList;
        }
    }
}

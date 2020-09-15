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
    public class BonusTypeControllerTest : BaseTest
    {
        private readonly Mock<IBonusTypeService> mockService;
        private readonly BonusTypeController bonusTypeController;

        public BonusTypeControllerTest()
        {
            mockService = new Mock<IBonusTypeService>();
            bonusTypeController = new BonusTypeController(mockService.Object);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsOkResult()
        {
            //Arrange
            var id = 2;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(Task.FromResult(GetMockBonusType()));

            // Act
            var okResult = await bonusTypeController.Get(id);

            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsNotFoundResult()
        {
            //Arrange
            var id = -1;

            // Act
            var notFoundResult = await bonusTypeController.Get(id);

            // Assert
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
        }

        [Fact]
        public async void GetAll_WhenCalled_ReturnsItems()
        {
            //Arrange
            mockService.Setup(repo => repo.GetAllAsync()).Returns(Task.FromResult(GetMockBonusTypeList()));

            // Act
            var okResult = await bonusTypeController.GetAll();

            // Assert
            var result = okResult.Result as OkObjectResult;
            var items = Assert.IsType<List<BonusType>>(result.Value);

            Assert.True(items.Count > 0);
        }

        [Fact]
        public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
        {
            BonusType bonusType = GetMockBonusType();
            mockService.Setup(service => service.InsertAsync(It.IsAny<BonusType>())).Returns(Task.FromResult(GetMockBonusType()));

            // Act
            var createdResponse = await bonusTypeController.Insert(bonusType) as CreatedAtActionResult;
            var item = createdResponse.Value as BonusType;

            // Assert
            Assert.IsType<BonusType>(item);
            Assert.NotNull(createdResponse);
        }

        [Fact]
        public async void Remove_ExistingLeave_ReturnsOkResult()
        {
            // Arrange
            var existingId = 3;
            mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(Task.FromResult(GetMockBonusType()));
            mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns(Task.FromResult(1));

            // Act
            var okResult = await bonusTypeController.Delete(existingId);

            // Assert
            Assert.IsType<ActionResult<int>>(okResult);
        }

        private static BonusType GetMockBonusType()
        {
            return new BonusType()
            {
                Id = 1,
                Name = "Joining Bonus",

            };
        }

        private static IEnumerable<BonusType> GetMockBonusTypeList()
        {
            List<BonusType> bonusTypeList = new List<BonusType>();
            BonusType bonusType = new BonusType
            {
                Id = 1,
                Name = "Joining Bonus",

            };
            bonusTypeList.Add(bonusType);
            return bonusTypeList;
        }
    }
}

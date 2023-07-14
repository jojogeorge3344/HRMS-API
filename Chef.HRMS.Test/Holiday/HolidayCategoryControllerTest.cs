using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Chef.HRMS.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace Chef.HRMS.Test;

public class HolidayCategoryControllerTest : BaseTest
{
    private readonly Mock<IHolidayCategoryService> mockService;
    private readonly HolidayCategoryController holidayCategoryController;

    public HolidayCategoryControllerTest()
    {
        mockService = new Mock<IHolidayCategoryService>();
        holidayCategoryController = new HolidayCategoryController(mockService.Object);
    }

    [Fact]
    public async void GetAll_WhenCalled_returnsItems()
    {
        //Arrange
        mockService.Setup(repo => repo.GetAllAsync()).Returns(await Task.FromResult(GetMockHolidayMasterList()));

        // Act
        var okResult = await holidayCategoryController.GetAll();

        // Assert
        var result = okResult.Result as OkObjectResult;
        var items = Assert.IsType<List<HolidayCategory>>(result.Value);

        Assert.True(items.Count > 0);
    }

    [Fact]
    public async void Insert_ValidObjectPassed_ReturnedResponseHasCreatedItem()
    {
        //Arrange
        HolidayCategory holidayCategory = GetMockHolidayMaster();
        mockService.Setup(service => service.InsertAsync(It.IsAny<HolidayCategory>())).Returns(await Task.FromResult(GetMockHolidayMaster()));

        // Act
        var createdResponse = await holidayCategoryController.Insert(holidayCategory) as CreatedAtActionResult;
        var item = createdResponse.Value as HolidayCategory;

        // Assert
        Assert.IsType<HolidayCategory>(item);
        Assert.NotNull(createdResponse);
    }


    [Fact]
    public async void Remove_NotExisting_ReturnsNotFoundResponse()
    {
        // Arrange
        var notExistingId = -1;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>()));

        // Act
        var badResponse = await holidayCategoryController.Delete(notExistingId);

        // Assert
        Assert.IsType<NotFoundResult>(badResponse);
    }

    [Fact]
    public async void Remove_Existing_ReturnsOkResult()
    {
        // Arrange
        var existingId = 3;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(await Task.FromResult(GetMockHolidayMaster()));
        mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns(await Task.FromResult(1));

        // Act
        var okResult = await holidayCategoryController.Delete(existingId);

        // Assert
        Assert.IsType<OkObjectResult>(okResult);
    }

    private static HolidayCategory GetMockHolidayMaster()
    {
        return new HolidayCategory()
        {
            Name = "Pakistan Holidays",
            CreatedBy = 1,
            CreatedDate = System.DateTime.Now,
            ModifiedBy = 1,
            ModifiedDate = System.DateTime.Now,
            IsArchived = false
        };
    }

    private static IEnumerable<HolidayCategory> GetMockHolidayMasterList()
    {
        List<HolidayCategory> holidayCategoryList = new List<HolidayCategory>();
        HolidayCategory holidayCategory = new HolidayCategory
        {
            Name = "Pakistan Holidays",
            CreatedBy = 1,
            CreatedDate = System.DateTime.Now,
            ModifiedBy = 1,
            ModifiedDate = System.DateTime.Now,
            IsArchived = false
        };
        holidayCategoryList.Add(holidayCategory);
        return holidayCategoryList;
    }
}
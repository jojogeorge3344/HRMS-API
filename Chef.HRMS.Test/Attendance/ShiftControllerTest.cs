using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Chef.HRMS.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace Chef.HRMS.Test;

public class ShiftControllerTest : BaseTest
{
    private readonly Mock<IShiftService> mockService;
    private readonly ShiftController shiftController;

    public ShiftControllerTest()
    {
        mockService = new Mock<IShiftService>();
        shiftController = new ShiftController(mockService.Object);
    }

    [Fact]
    public async void GetAll_WhenCalled_ReturnsItems()
    {
        //Arrange
        mockService.Setup(repo => repo.GetAllAsync()).Returns(await Task.FromResult(GetMockShiftList()));

        // Act
        var okResult = await shiftController.GetAll();

        // Assert
        var result = okResult.Result as OkObjectResult;
        var items = Assert.IsType<List<Shift>>(result.Value);

        Assert.True(items.Count > 0);
    }

    [Fact]
    public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
    {
        Shift shift = GetMockShift();
        mockService.Setup(service => service.InsertAsync(It.IsAny<Shift>())).Returns(await Task.FromResult(GetMockShift()));

        // Act
        var createdResponse = await shiftController.Insert(shift) as CreatedAtActionResult;
        var item = createdResponse.Value as Shift;

        // Assert
        Assert.IsType<Shift>(item);
        Assert.NotNull(createdResponse);
    }

    [Fact]
    public async void Remove_NotExistingLeave_ReturnsNotFoundResponse()
    {
        // Arrange
        var notExistingId = -1;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>()));

        // Act
        var badResponse = await shiftController.Delete(notExistingId);

        // Assert
        Assert.IsType<NotFoundResult>(badResponse.Result);
    }

    [Fact]
    public async void Remove_ExistingLeave_ReturnsOkResult()
    {
        // Arrange
        var existingId = 3;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(await Task.FromResult(GetMockShift()));
        mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns(await Task.FromResult(1));

        // Act
        var okResult = await shiftController.Delete(existingId);

        // Assert
        Assert.IsType<ActionResult<int>>(okResult);
    }

    private static Shift GetMockShift()
    {
        return new Shift()
        {
            Id = 1,
            Name = "General Shift",
            StartTime = DateTime.Now,
            EndTime = DateTime.Now,
            BreakDuration = 30,
            Comments = "test shift"
        };
    }

    private static IEnumerable<Shift> GetMockShiftList()
    {
        List<Shift> shiftList = new List<Shift>();
        Shift shift = new Shift
        {
            Id = 1,
            Name = "General Shift",
            StartTime = DateTime.Now,
            EndTime = DateTime.Now,
            BreakDuration = 30,
            Comments = "test shift"
        };
        shiftList.Add(shift);
        return shiftList;
    }
}

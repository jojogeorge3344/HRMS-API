using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Chef.HRMS.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace Chef.HRMS.Test;

public class EmployeeNumberSeriesControllerTest : BaseTest
{
    private readonly Mock<IEmployeeNumberSeriesServices> mockService;
    private readonly EmployeeNumberSeriesController employeeNumberSeriesController;

    public EmployeeNumberSeriesControllerTest()
    {
        mockService = new Mock<IEmployeeNumberSeriesServices>();
        employeeNumberSeriesController = new EmployeeNumberSeriesController(mockService.Object);
    }

    [Fact]
    public async void Get_WhenCalled_ReturnsOkResult()
    {
        //Arrange
        var id = 2;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(await Task.FromResult(GetMockEmployeeNumberSeries()));

        // Act
        var okResult = await employeeNumberSeriesController.Get(id);

        // Assert
        Assert.IsType<OkObjectResult>(okResult.Result);
    }

    [Fact]
    public async void Get_WhenCalled_ReturnsNotFoundResult()
    {
        //Arrange
        var id = -1;

        // Act
        var notFoundResult = await employeeNumberSeriesController.Get(id);

        // Assert
        Assert.IsType<NotFoundResult>(notFoundResult.Result);
    }

    [Fact]
    public async void GetAll_WhenCalled_ReturnsItems()
    {
        //Arrange
        mockService.Setup(repo => repo.GetAllAsync()).Returns(await Task.FromResult(GetMockEmployeeNumberSeriesList()));

        // Act
        var okResult = await employeeNumberSeriesController.GetAll();

        // Assert
        var result = okResult.Result as OkObjectResult;
        var items = Assert.IsType<List<EmployeeNumberSeries>>(result.Value);

        Assert.True(items.Count > 0);
    }

    [Fact]
    public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
    {
        //Arrange
        EmployeeNumberSeries employeeNumberSeries = GetMockEmployeeNumberSeries();
        mockService.Setup(service => service.InsertAsync(It.IsAny<EmployeeNumberSeries>())).Returns(await Task.FromResult(GetMockEmployeeNumberSeries()));

        // Act
        var createdResponse = await employeeNumberSeriesController.Insert(employeeNumberSeries) as CreatedAtActionResult;
        var item = createdResponse.Value as EmployeeNumberSeries;

        // Assert
        Assert.IsType<EmployeeNumberSeries>(item);
        Assert.NotNull(createdResponse);
    }

    [Fact]
    public async void Remove_NotExistingLeave_ReturnsNotFoundResponse()
    {
        // Arrange
        var notExistingId = -1;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>()));

        // Act
        var badResponse = await employeeNumberSeriesController.Delete(notExistingId);

        // Assert
        Assert.IsType<NotFoundResult>(badResponse);
    }

    [Fact]
    public async void Remove_ExistingLeave_ReturnsOkResult()
    {
        // Arrange
        var existingId = 3;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(await Task.FromResult(GetMockEmployeeNumberSeries()));
        mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns(await Task.FromResult(1));

        // Act
        var okResult = await employeeNumberSeriesController.Delete(existingId);

        // Assert
        Assert.IsType<OkObjectResult>(okResult);
    }

    private static EmployeeNumberSeries GetMockEmployeeNumberSeries()
    {
        return new EmployeeNumberSeries()
        {
            Name = "Thomsun",
            Prefix = "TIC",
            Suffix = "00",
            NextNumber = 15,
            IsActive = true,
            IsDefault = true
        };
    }

    private static IEnumerable<EmployeeNumberSeries> GetMockEmployeeNumberSeriesList()
    {
        List<EmployeeNumberSeries> employeeNumberSeriesList = new List<EmployeeNumberSeries>();
        EmployeeNumberSeries employeeNumberSeries = new EmployeeNumberSeries
        {
            Name = "Thomsun",
            Prefix = "TIC",
            Suffix = "00",
            NextNumber = 15,
            IsActive = true,
            IsDefault = true
        };
        employeeNumberSeriesList.Add(employeeNumberSeries);
        return employeeNumberSeriesList;
    }
}

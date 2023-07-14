using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using Chef.HRMS.Services;
using Chef.HRMS.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace Chef.HRMS.Test;

public class EducationalDetailsControllerTest : BaseTest
{
    readonly EducationRepository educationalDetailsRepository;
    readonly EducationService educationalDetailsService;
    readonly EducationController educationalDetailsController;
    private readonly Mock<IEducationService> mockService;

    public EducationalDetailsControllerTest()
    {
        educationalDetailsRepository = new EducationRepository(ConnectionFactory);
        educationalDetailsService = new EducationService(educationalDetailsRepository);
        educationalDetailsController = new EducationController(educationalDetailsService);
        mockService = new Mock<IEducationService>();
        educationalDetailsController = new EducationController(mockService.Object);
    }

    [Fact]
    public async void Get_WhenCalled_ReturnsOkResult()
    {
        //Arrange
        var id = 1;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(await Task.FromResult(GetMockEducationalDetails()));

        // Act
        var okResult = await educationalDetailsController.Get(id);

        // Assert
        Assert.IsType<OkObjectResult>(okResult.Result);
    }

    [Fact]
    public async void Get_WhenCalled_ReturnsNotFoundResult()
    {
        //Arrange
        var id = -1;

        // Act
        var notFoundResult = await educationalDetailsController.Get(id);

        // Assert
        Assert.IsType<NotFoundResult>(notFoundResult.Result);
    }

    [Fact]
    public async void GetAll_WhenCalled_ReturnsItems()
    {
        //Arrange
        mockService.Setup(repo => repo.GetAllAsync()).Returns(await Task.FromResult(GetMockEducationalDetailsList()));

        // Act
        var okResult = await educationalDetailsController.GetAll();

        // Assert
        var result = okResult.Result as OkObjectResult;
        var items = Assert.IsType<List<Education>>(result.Value);

        Assert.True(items.Count > 0);
    }

    [Fact]
    public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
    {
        //Arrange
        Education educationalDetails = GetMockEducationalDetails();
        mockService.Setup(service => service.InsertAsync(It.IsAny<Education>())).Returns(await Task.FromResult(GetMockEducationalDetails()));

        // Act
        var createdResponse = await educationalDetailsController.Insert(educationalDetails) as CreatedAtActionResult;
        var item = createdResponse.Value as Education;

        // Assert
        Assert.IsType<Education>(item);
        Assert.NotNull(createdResponse);
    }

    [Fact]
    public async void Add_InvalidObjectPassed_ReturnsBadRequest()
    {
        //Arrange
        Education nameMissingEducationalDetails = GetMockEducationalDetails();
        nameMissingEducationalDetails.Degree = "BE";
        nameMissingEducationalDetails.Percentage = 10.0f;
        educationalDetailsController.ModelState.AddModelError("Degree", "Required");

        // Act
        var badResponse = await educationalDetailsController.Insert(nameMissingEducationalDetails);

        // Assert
        Assert.IsType<BadRequestObjectResult>(badResponse);
    }

    [Fact]
    public async void Remove_NotExistingEducationalDetails_ReturnsNotFoundResponse()
    {
        // Arrange
        var notExistingId = -1;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>()));

        // Act
        var badResponse = await educationalDetailsController.Delete(notExistingId);

        // Assert
        Assert.IsType<NotFoundResult>(badResponse.Result);
    }

    [Fact]
    public async void Remove_ExistingEducationalDetails_ReturnsOkResult()
    {
        // Arrange
        var existingId = 3;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(await Task.FromResult(GetMockEducationalDetails()));
        mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns(await Task.FromResult(1));

        // Act
        var okResult = await educationalDetailsController.Delete(existingId);

        // Assert
        Assert.IsType<ActionResult<int>>(okResult);
    }

    private static Education GetMockEducationalDetails()
    {
        return new Education()
        {
            Degree = "BE",
            Percentage = 10.0f
        };
    }

    private static IEnumerable<Education> GetMockEducationalDetailsList()
    {
        List<Education> educationList = new List<Education>();
        Education education = new Education()
        {
            Degree = "BE",
            Percentage = 100f
        };

        educationList.Add(education);
        return educationList;
    }
}

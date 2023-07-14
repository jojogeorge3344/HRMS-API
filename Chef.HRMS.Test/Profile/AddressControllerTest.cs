using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Chef.HRMS.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace Chef.HRMS.Test;

public class AddressControllerTest : BaseTest
{
    private readonly Mock<IAddressService> mockService;
    private readonly AddressController addressController;

    public AddressControllerTest()
    {
        mockService = new Mock<IAddressService>();
        addressController = new AddressController(mockService.Object);
    }

    [Fact]
    public async void Get_WhenCalled_ReturnsOkResult()
    {
        //Arrange
        var id = 1;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(await Task.FromResult(GetMockAddressDetails()));

        // Act
        var okResult = await addressController.Get(id);

        // Assert
        Assert.IsType<OkObjectResult>(okResult.Result);
    }

    [Fact]
    public async void Get_WhenCalled_ReturnsNotFoundResult()
    {
        //Arrange
        var id = -1;

        // Act
        var notFoundResult = await addressController.Get(id);

        // Assert
        Assert.IsType<NotFoundResult>(notFoundResult.Result);
    }

    [Fact]
    public async void GetAll_WhenCalled_ReturnsItems()
    {
        //Arrange
        mockService.Setup(repo => repo.GetAllAsync()).Returns(await Task.FromResult(GetMockAddressList()));

        // Act
        var okResult = await addressController.GetAll();

        // Assert
        var result = okResult.Result as OkObjectResult;
        var items = Assert.IsType<List<Address>>(result.Value);

        Assert.True(items.Count > 0);
    }

    [Fact]
    public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
    {
        Address address = GetMockAddressDetails();
        mockService.Setup(service => service.InsertAsync(It.IsAny<Address>())).Returns(await Task.FromResult(GetMockAddressDetails()));

        // Act
        var createdResponse = await addressController.Insert(address) as CreatedAtActionResult;
        var item = createdResponse.Value as Address;

        // Assert
        Assert.IsType<Address>(item);
        Assert.NotNull(createdResponse);
    }

    [Fact]
    public async void Remove_ExistingAddress_ReturnsOkResult()
    {
        // Arrange
        var existingId = 1;
        mockService.Setup(repo => repo.GetAsync(It.IsAny<int>())).Returns(await Task.FromResult(GetMockAddressDetails()));
        mockService.Setup(repo => repo.DeleteAsync(It.IsAny<int>())).Returns(await Task.FromResult(1));

        // Act
        var okResult = await addressController.Delete(existingId);

        // Assert
        Assert.IsType<ActionResult<int>>(okResult);
    }

    private static Address GetMockAddressDetails()
    {
        return new Address()
        {
            EmployeeId = 1,
            CurrentAddressLine1 = "Thomsun Infocare",
            CurrentAddressLine2 = "Infopark Phase 2",
            CurrentState = 1,
            CurrentCountry = 1,
            CurrentPinCode = "682030",
            PermanentAddressLine1 = "Thomsun Infocare",
            PermanentAddressLine2 = "Infopark Phase 2",
            PermanentCountry = 1,
            PermanentState = 1,
            PermanentPinCode = "682030"
        };
    }

    private static IEnumerable<Address> GetMockAddressList()
    {
        List<Address> addressList = new List<Address>();
        Address address = new Address
        {
            EmployeeId = 1,
            CurrentAddressLine1 = "Thomsun Infocare",
            CurrentAddressLine2 = "Infopark Phase 2",
            CurrentState = 1,
            CurrentCountry = 1,
            CurrentPinCode = "682030",
            PermanentAddressLine1 = "Thomsun Infocare",
            PermanentAddressLine2 = "Infopark Phase 2",
            PermanentCountry = 1,
            PermanentState = 1,
            PermanentPinCode = "682030"
        };
        addressList.Add(address);
        return addressList;
    }
}

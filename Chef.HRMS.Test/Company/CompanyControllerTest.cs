using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Chef.HRMS.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Threading.Tasks;
using Xunit;

namespace Chef.HRMS.Test
{
    public class CompanyControllerTest : BaseTest
    {
        private readonly Mock<ICompanyService> mockService;
        private readonly CompanyController companyController;

        public CompanyControllerTest()
        {
            mockService = new Mock<ICompanyService>();
            companyController = new CompanyController(mockService.Object);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsOkResult()
        {
            //Arrange
            _ = mockService.Setup(repo => repo.GetAsync()).Returns(Task.FromResult(GetMockCompany()));

            // Act
            var okResult = await companyController.Get();

            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact]
        public async void Get_WhenCalled_ReturnsNotFoundResult()
        {
            //Arrange
            mockService.Setup(repo => repo.GetAsync());
            // Act
            var notFoundResult = await companyController.Get();

            // Assert
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
        }

        private static HRMSCompany GetMockCompany()
        {
            return new HRMSCompany()
            {
                DateOfIncorporation = DateTime.UtcNow,
                IdentificationNumber = "Chef Ltd - " + new Random().Next(100, 1000),
                LegalName = "Chef Pvt. Ltd.",
                LogoFilePath = "/cheflogo.jpg",
                ShortName = "CHEF",
                BusinessType = BusinessType.PrivateLimited
            };
        }
    }
}

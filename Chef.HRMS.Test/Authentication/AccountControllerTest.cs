using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using Chef.HRMS.Services;
using Chef.HRMS.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace Chef.HRMS.Test
{
    public class AccountControllerTest : BaseTest
    {
        readonly AuthenticationRepository authenticationRepository;
        readonly AuthenticationServices authenticationServices;
        
        readonly AccountController AccountController;

        public AccountControllerTest()
        {
            authenticationRepository = new AuthenticationRepository(ConnectionFactory);
            authenticationServices = new AuthenticationServices(authenticationRepository);
            AccountController = new AccountController(authenticationServices);

        }

        [Fact(Skip = "Implementation Incomplete")]
        public async void Login_ValidObjectPassed_ReturnedResponseHasCreatedItem()
        {
            Authentication authentication = GetMockAuthDetails();

            // Act
            var createdResponse = await  AccountController.Login(authentication) as CreatedAtActionResult;
            var item = createdResponse.Value as Authentication;

            // Assert
            Assert.IsType<Authentication>(item);
            Assert.NotEqual(0, item.Id);
        }

        [Fact(Skip = "Implementation Incomplete")]
        public async void ResetPassword_ValidObjectPassed_ReturnedResponseHasCreatedItem()
        {
            Authentication authentication = GetMockResetPassword();

            // Act
            var createdResponse = await AccountController.ResetPassword(authentication) as CreatedAtActionResult;
            var item = createdResponse.Value as Authentication;

            // Assert
            Assert.IsType<Authentication>(item);
            Assert.NotEqual(0, item.Id);
        }

        private static Authentication GetMockAuthDetails()
        {
            return new Authentication()
            {
                Email ="durgak@thomsuninfocare.com",
                Password="durga008"
            };
        }

        private static Authentication GetMockResetPassword()
        {
            return new Authentication()
            {
               Email ="durgak@thomsuninfocare.com",
               Password="durga008"
            };
        }
    }
}
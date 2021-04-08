using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Chef.HRMS.Web.Controllers;
using Moq;
using System.Collections.Generic;

namespace Chef.HRMS.Test
{
    public class PayslipConfigurationFieldsControllerTest : BaseTest
    {
        private readonly Mock<IPayslipConfigurationFieldsService> mockService;
        private readonly PayslipConfigurationFieldsController payslipConfigurationFieldsController;

        public PayslipConfigurationFieldsControllerTest()
        {
            mockService = new Mock<IPayslipConfigurationFieldsService>();
            payslipConfigurationFieldsController = new PayslipConfigurationFieldsController(mockService.Object);
        }

        //[Fact]
        //public async void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
        //{
        //    IEnumerable<PayslipConfigurationFields> payslipConfigurationFieldsList = GetMockPayslipConfigurationFields();
        //    mockService.Setup(service => service.UpdatePayslipConfigurationFieldsAsync(It.IsAny<IEnumerable<PayslipConfigurationFields>>())).Returns(Task.FromResult(GetMockPayslipConfigurationFields()));

        //    // Act
        //    var createdResponse = await payslipConfigurationFieldsController.UpdatePayslipConfigurationFieldsAsync(payslipConfigurationFieldsList) as <int>;
        //    var item = createdResponse.Value as PayslipConfigurationFields;

        //    // Assert
        //    Assert.IsType<PayslipConfigurationFields>(item);
        //    Assert.NotNull(createdResponse);
        //}

        private static IEnumerable<PayslipConfigurationFields> GetMockPayslipConfigurationFields()
        {
            List<PayslipConfigurationFields> payslipConfigurationFieldsList = new List<PayslipConfigurationFields>();
            PayslipConfigurationFields payslipConfigurationFields = new PayslipConfigurationFields
            {
                Id = 1,
                Name = "General payroll Calendar",

            };
            payslipConfigurationFieldsList.Add(payslipConfigurationFields);
            return payslipConfigurationFieldsList;
        }
    }
}

using Microsoft.AspNetCore.Mvc;

namespace Chef.HRMS.Web.Controllers
{
	[Route("api/settings/payrollprocessing/[controller]")]
	[ApiController]
	public class PayrollAdhocDetailsController : ControllerBase
	{
		//private readonly IPayrollAdhocDetailsService payrollAdhocDetailsService;
		//public PayrollAdhocDetailsController(IPayrollAdhocDetailsService payrollAdhocDetailsService)
		//{
		//	this.payrollAdhocDetailsService = payrollAdhocDetailsService;
		//}
		//[HttpPost]
		//[Route("Insert")]
		//public async Task<IActionResult> Insert(CustomerCreditNote customerCreditNote)
		//{
		//	return Ok(await customerCreditNoteService.InsertAsync(customerCreditNote));
		//}
		//[HttpDelete("Delete/{id}")]
		//public async Task<ActionResult<int>> Delete(int id)
		//{
		//	var rowsAffected = await customerCreditNoteService.DeleteAsync(id);

		//	if (rowsAffected < 1)
		//	{
		//		return NotFound("The Customer Credit Note does not exist.");
		//	}

		//	return Ok(rowsAffected);
		//}

	}
}

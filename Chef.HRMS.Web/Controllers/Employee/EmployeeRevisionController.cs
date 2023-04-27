﻿using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeRevisionController : ControllerBase
    {
        private readonly IEmployeeRevisionService employeeRevisionService;

        public EmployeeRevisionController(IEmployeeRevisionService employeeRevisionService)
        {
            this.employeeRevisionService = employeeRevisionService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var EmployeeRevision = await employeeRevisionService.GetAsync(id);

            if (EmployeeRevision == null)
            {
                return NotFound();
            }

            var result = await employeeRevisionService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<EmployeeRevision>> Get(int id)
        {
            var EmployeeRevision = await employeeRevisionService.GetAsync(id);

            if (EmployeeRevision == null)
            {
                return NotFound();
            }

            return Ok(EmployeeRevision);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<EmployeeRevision>>> GetAll()
        {
            var EmployeeRevisions = await employeeRevisionService.GetAllAsync();

            return Ok(EmployeeRevisions);
        }

  

        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Insert(EmployeeRevision employeeRevision)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await employeeRevisionService.InsertAsync(employeeRevision);
            return CreatedAtAction(nameof(Insert), result);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Update(EmployeeRevision employeeRevision)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await employeeRevisionService.UpdateAsync(employeeRevision);

            return Ok(result);
        }
    }
}
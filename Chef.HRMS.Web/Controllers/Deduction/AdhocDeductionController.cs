﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Chef.HRMS.Web.Controllers
{
    [Route("api/Deduction/[controller]")]
    [ApiController]
    public class AdhocDeductionController : ControllerBase
    {
        private readonly IAdhocDeductionService adhocDeductionService;

        public AdhocDeductionController(IAdhocDeductionService adhocDeductionService)
        {
            this.adhocDeductionService = adhocDeductionService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var adhocDeduction = await adhocDeductionService.GetAsync(id);

            if (adhocDeduction == null)
            {
                return NotFound();
            }

            var result = await adhocDeductionService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<AdhocDeduction>> Get(int id)
        {
            var adhocDeduction = await adhocDeductionService.GetAsync(id);

            if (adhocDeduction == null)
            {
                return NotFound();
            }

            return Ok(adhocDeduction);
        }

        [HttpGet("GetAllAdhocDeductionByPayrollProcessingMethodId/{id}/{year}/{month}")]
        public async Task<ActionResult<AdhocDeductionView>> GetAllAdhocDeductionByPayrollProcessingMethodId(int id,int year,int month)
        {
            var adhocDeduction = await adhocDeductionService.GetAllAdhocDeductionByPayrollProcessingMethodId(id,year,month);

            if (adhocDeduction == null)
            {
                return NotFound();
            }

            return Ok(adhocDeduction);
        }

        [HttpGet("GetEmployeeAdhocDeductionByPayrollProcessingMethodId/{id}")]
        public async Task<ActionResult<AdhocDeductionView>> GetEmployeeAdhocDeductionByPayrollProcessingMethodId(int id)
        {
            var adhocDeduction = await adhocDeductionService.GetEmployeeAdhocDeductionByPayrollProcessingMethodId(id);

            if (adhocDeduction == null)
            {
                return NotFound();
            }

            return Ok(adhocDeduction);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<AdhocDeduction>>> GetAll()
        {
            var adhocDeduction = await adhocDeductionService.GetAllAsync();

            return Ok(adhocDeduction);
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("Insert")]
        public async Task<IActionResult> Insert(AdhocDeduction adhocDeduction)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            adhocDeduction = await adhocDeductionService.InsertAsync(adhocDeduction);

            return CreatedAtAction(nameof(Insert), adhocDeduction);
        }

        [HttpPut("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(AdhocDeduction adhocDeduction)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await adhocDeductionService.UpdateAsync(adhocDeduction);

            return Ok(result);
        }
    }
}
using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetController : ControllerBase
    {
        private readonly IAssetService assetService;

        public AssetController(IAssetService assetService)
        {
            this.assetService = assetService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var assets = await assetService.GetAsync(id);

            if (assets == null)
            {
                return NotFound();
            }

            var result = await assetService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Asset>>> GetAll()
        {
            var assets = await assetService.GetAllAsync();

            return Ok(assets);
        }

        [HttpGet("GetAllMetadataValue")]
        public async Task<ActionResult<IEnumerable<AssetMetadataValue>>> GetAllMetadataValue()
        {
            var assets = await assetService.GetAllMetadataValue();

            return Ok(assets);
        }

        [HttpGet("GetAssetById/{id}")]
        public async Task<ActionResult<Asset>> GetAssetById(int id)
        {
            var assets = await assetService.GetAssetById(id);

            return Ok(assets);
        }

        [HttpGet("GetAllAssetList")]
        public async Task<ActionResult<IEnumerable<Asset>>> GetAllAssetList()
        {
            var AssetList = await assetService.GetAllAssetList();

            return Ok(AssetList);
        }

        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Insert(Asset asset)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await assetService.InsertAsync(asset);

            return Ok(result);
        }

        [HttpPut("Update")]
        //[Consumes(MediaTypeNames.Application.Json)]
        //[ProducesResponseType(StatusCodes.Status201Created)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Update(Asset asset)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await assetService.UpdateAsync(asset);

            return Ok(result);
        }
    }
}

using Chef.HRMS.Models;
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
    public class AssetTypeController : ControllerBase
    {
        private readonly IAssetTypeService assetTypeService;

        public AssetTypeController(IAssetTypeService assetTypeService)
        {
            this.assetTypeService = assetTypeService;
        }

        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Insert(AssetType assetType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await assetTypeService.InsertAsync(assetType);
            return Ok(result);
        }

        [HttpGet("GetAllAssetTypeList")]
        public async Task<ActionResult<IEnumerable<AssetType>>> GetAllAssetTypeList()
        {
            var result = await assetTypeService.GetAllAssetTypeList();

            return Ok(result);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> UpdateAssetType(AssetType assetType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await assetTypeService.UpdateAsync(assetType);

            return Ok(result);
        }
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var AssetType = await assetTypeService.GetAsync(id);

            if (AssetType == null)
            {
                return NotFound();
            }

            var result = await assetTypeService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<AssetType>>> GetAll()
        {
            var AssetType = await assetTypeService.GetAllAsync();

            return Ok(AssetType);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<IEnumerable<AssetType>>> Get(int id)
        {
            var AssetType = await assetTypeService.Get(id);

            return Ok(AssetType);
        }

    }
}

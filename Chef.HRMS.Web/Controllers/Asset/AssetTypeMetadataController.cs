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
    public class AssetTypeMetadataController : ControllerBase
    {
        private readonly IAssetTypeMetadataService assetTypeMetadataService;

        public AssetTypeMetadataController(IAssetTypeMetadataService assetTypeMetadataService)
        {
            this.assetTypeMetadataService = assetTypeMetadataService;
        }


        [HttpPost("Insert")]
       // [Consumes(MediaTypeNames.Application.Json)]
       // [ProducesResponseType(StatusCodes.Status201Created)]
       // [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Insert(IEnumerable<AssetTypeMetadata> assetTypeMetadata)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await assetTypeMetadataService.InsertAsync(assetTypeMetadata);
            return Ok(result);
        }

        [HttpGet("GetAllAssetTypeMetadataList")]
        public async Task<ActionResult<IEnumerable<AssetType>>> GetAllAssetTypeMetadataList()
        {
            var result = await assetTypeMetadataService.GetAllAssetTypeMetadataList();

            return Ok(result);
        }

        [HttpPut("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update(IEnumerable<AssetTypeMetadata> assetTypeMetadata)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await assetTypeMetadataService.UpdateAsync(assetTypeMetadata);
            return Ok(result);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<AssetTypeMetadata>>> GetAll()
        {
            var assetTypeMetadata = await assetTypeMetadataService.GetAllAsync();

            return Ok(assetTypeMetadata);
        }

        [HttpGet("GetAllAssetTypeMetadataDetailsById/{id}")]
        public async Task<ActionResult<IEnumerable<AssetTypeMetadata>>> GetAssetTypeId(int id)
        {
            var assetTypeMetadata = await assetTypeMetadataService.GetAssetTypeId(id);

            return Ok(assetTypeMetadata);
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var assetTypeMetadata = await assetTypeMetadataService.GetAsync(id);

            if (assetTypeMetadata == null)
            {
                return NotFound();
            }

            var result = await assetTypeMetadataService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpDelete("DeleteAssetType/{AssetTypeId}")]
        public async Task<ActionResult<int>> DeleteAssetType(int AssetTypeId)
        {
            var assetTypeMetadata = await assetTypeMetadataService.DeleteAsync(AssetTypeId);

            //if (assetTypeMetadata == null)
            //{
            //    return NotFound();
            //}

            //var result = await assetTypeMetadataService.DeleteAssetType(AssetTypeId);

            return Ok(assetTypeMetadata);
        }
    }
}

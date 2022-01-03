﻿using Chef.HRMS.Models;
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
    public class AssetMyAssetController : ControllerBase
    {
        private readonly IAssetMyAssetService assetmyassetService;

        public AssetMyAssetController(IAssetMyAssetService assetmyassetService)
        {
            this.assetmyassetService = assetmyassetService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var assets = await assetmyassetService.GetAsync(id);

            if (assets == null)
            {
                return NotFound();
            }

            var result = await assetmyassetService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<AssetMyAsset>>> GetAll()
        {
            var assets = await assetmyassetService.GetAllAsync();

            return Ok(assets);
        }

        [HttpGet("GetMyAssetById/{id}")]
        public async Task<ActionResult<AssetMyAsset>> GetMyAssetById(int id)
        {
            var assets = await assetmyassetService.GetMyAssetById(id);

            return Ok(assets);
        }

        [HttpGet("GetAllMyAssetList")]
        public async Task<ActionResult<IEnumerable<AssetMyAsset>>> GetAllMyAssetList()
        {
            var AssetList = await assetmyassetService.GetAllMyAssetList();

            return Ok(AssetList);
        }

        [HttpPost("Insert")]
        //[Consumes(MediaTypeNames.Application.Json)]
        //[ProducesResponseType(StatusCodes.Status201Created)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Insert(AssetMyAsset assetmyasset)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await assetmyassetService.InsertAsync(assetmyasset);

            return Ok(result);
        }

        [HttpPut("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Update(AssetMyAsset assetmyasset)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await assetmyassetService.UpdateAsync(assetmyasset);

            return Ok(result);
        }

    }
}

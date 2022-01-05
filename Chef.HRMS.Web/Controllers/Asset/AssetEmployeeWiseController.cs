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
    public class AssetEmployeeWiseController : ControllerBase
    {
        private readonly IAssetEmployeeWiseService assetEmployeeWiseService;

        public AssetEmployeeWiseController(IAssetEmployeeWiseService assetEmployeeWiseService)
        {
            this.assetEmployeeWiseService = assetEmployeeWiseService;
        }

        [HttpGet("GetAllList")]
        public async Task<ActionResult<IEnumerable<AssetEmployeeWise>>> GetAllAssetTypeList()
        {
            var result = await assetEmployeeWiseService.GetAllList();

            return Ok(result);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<AssetEmployeeWise>>> GetAll()
        {
            var assetEmployeeWises = await assetEmployeeWiseService.GetAll();

            return Ok(assetEmployeeWises);
        }


        //[HttpGet("Get/{id}")]
        //public async Task<ActionResult<IEnumerable<AssetEmployeeWise>>> Get(int id)
        //{
        //    var assetEmployeeWises = await assetEmployeeWiseService.Get(id);

        //    return Ok(assetEmployeeWises);
        //}
    }
}

using BoldReports.Web.ReportViewer;
using Chef.HRMS.Services;
using Chef.HRMS.Web.Extensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;

namespace Chef.HRMS.Web.Controllers
{
    public abstract class ReportViewerController : ControllerBase, IReportController
    {
        public string ReportPath { get; set; }
        // Report viewer requires a memory cache to store the information of consecutive client request and
        // have the rendered report viewer information in server.
        readonly Microsoft.Extensions.Caching.Memory.IMemoryCache cache;
        // IHostingEnvironment used with sample to get the application data from wwwroot.
        readonly IWebHostEnvironment hostingEnvironment;

        public Dictionary<string, object> CustomData = null;
        private Microsoft.Extensions.Caching.Memory.IMemoryCache memoryCache;


        // Post action to process the report from server based json parameters and send the result back to the client.
        public ReportViewerController(Microsoft.Extensions.Caching.Memory.IMemoryCache memoryCache,
            IWebHostEnvironment hostingEnvironment)
        {
            cache = memoryCache;
            this.hostingEnvironment = hostingEnvironment;
        }

        //protected ReportViewerController(Microsoft.Extensions.Caching.Memory.IMemoryCache memoryCache, IWebHostEnvironment hostingEnvironment)
        //{
        //    this.memoryCache = memoryCache;
        //    this.hostingEnvironment = hostingEnvironment;
        //}

        // Post action to process the report from server based json parameters and send the result back to the client.
        [HttpPost]
        public virtual object PostReportAction([FromBody] Dictionary<string, object> jsonArray)
        {
            if (jsonArray.ContainsKey("customData"))
            {
                //Gets the parameter values specified in client-side 
                CustomData = JsonConvert.DeserializeObject<Dictionary<string, object>>(jsonArray["customData"].ToString());
            }
            return ReportHelper.ProcessReport(jsonArray, this, this.cache);
        }

        // Method will be called to initialize the report information to load the report with ReportHelper for processing.
        public virtual void OnInitReportOptions(ReportViewerOptions reportOption)
        {
            reportOption.ReportModel.ProcessingMode = ProcessingMode.Local;
            reportOption.PDFExportFonts(hostingEnvironment.WebRootPath);
            var reportPath = Path.Combine(hostingEnvironment.WebRootPath, ReportPath);
            FileStream reportStream = new FileStream(reportPath, FileMode.Open, FileAccess.Read);
            reportOption.ReportModel.Stream = reportStream;
            reportOption.ReportModel.DataSources.Clear();
            //reportOption.ReportModel.ReportPath = reportPath;

        }

        // Method will be called when reported is loaded with internally to start to layout process with ReportHelper.
        public virtual void OnReportLoaded(ReportViewerOptions reportOption)
        {
        }

        //Get action for getting resources from the report
        [ActionName("GetResource")]
        [AcceptVerbs("GET")]
        // Method will be called from Report Viewer client to get the image src for Image report item.
        public virtual object GetResource([FromQuery] ReportResource resource)
        {
            return ReportHelper.GetResource(resource, this, cache);
        }

        [HttpPost]
        public virtual object PostFormReportAction()
        {
            return ReportHelper.ProcessReport(null, this, cache);
        }
    }
}

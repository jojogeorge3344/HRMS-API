using System.Collections.Generic;
using System.IO;
using System.Linq;
using BoldReports.Web;
using BoldReports.Web.ReportViewer;

namespace Chef.HRMS.Web.Extensions;

public static class ReportViewerExtension
{
    public static void PDFExportFonts(this ReportViewerOptions reportViewerOptions, string basePath)
    {
        reportViewerOptions.ReportModel.PDFOptions = new BoldReports.Writer.PDFOptions()
        {
            //Load Missing font stream
            Fonts = new Dictionary<string, System.IO.Stream>
            {
                { "Calibri", new FileStream(Path.Combine(basePath , @"Reports/Fonts/calibri.ttf"), FileMode.Open, FileAccess.Read) },
                { "Calibri Light", new FileStream(Path.Combine(basePath , @"Reports/Fonts/calibril.ttf"), FileMode.Open, FileAccess.Read) },
                { "Cambria", new FileStream(Path.Combine(basePath , @"Reports/Fonts/cambria.ttc"), FileMode.Open, FileAccess.Read) }
            }
        };
    }

    public static string GetFirstValue(this List<ReportParameter> reportParameters, string parameterName)
    {
        return reportParameters.GetValues(parameterName).First();
    }

    public static IEnumerable<string> GetValues(this List<ReportParameter> reportParameters, string parameterName)
    {
        return reportParameters.Where(x => x.Name == parameterName).Select(x => x.Values).First();
    }

    public static void ClearDataSource(this ReportViewerOptions reportViewerOptions)
    {
        reportViewerOptions.ReportModel.DataSources.Clear();
    }

    public static void AddDataSource(this ReportViewerOptions reportViewerOptions, string dataSourceName, object value)
    {
        reportViewerOptions.ReportModel.DataSources.Add(new ReportDataSource
        {
            Name = dataSourceName,
            Value = value
        });
    }
}

using Chef.Common.Core;
using System;

namespace Chef.HRMS.Models;

public class PayrollHeaderView : ViewModel
{
    public string EmployeeCode { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string MiddleName { get; set; }
    public string CountryName { get; set; }
    public DateTime Month { get; set; }
    public decimal BasicPay { get; set; }
    public decimal ExchangeRate { get; set; }
    public string CurrencyCode { get; set; }
    public DateTime PayrollProcessDate { get; set; }
    public int EmployeeId { get; set; }
    public int CurrencyId { get; set; }
    public int Currentcountry { get; set; }
}

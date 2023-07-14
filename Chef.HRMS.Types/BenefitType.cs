using System.ComponentModel;

namespace Chef.HRMS.Types;

public enum BenefitType
{
    [Description("Basic Salary")]
    BasicSalary = 1,

    [Description("House Rent Allowance")]
    HouseRentAllowance = 2,

    [Description("Dearness Allowance")]
    DearnessAllowance = 3,

    [Description("Transportation Allowance")]
    TransportationAllowance = 4,

    [Description("Food Allowance")]
    FoodAllowance = 5,

    [Description("Education Allowance")]
    EducationAllowance = 6,

    [Description("Other Allowance")]
    OtherAllowance = 7,

    [Description("Normal Overtime")]
    NormalOvertime = 8,

    [Description("Holiday Overtime")]
    HolidayOvertime = 9,

    [Description("Special Overtime")]
    SpecialOvertime = 10,

    [Description("Employee Loan")]
    EmployeeLoan = 11,

    [Description("Employee Ticket Encashment")]
    EmployeeTicketEncashment = 12,

    [Description("Employee EOS Payment")]
    EmployeeEOSPayment = 13,

    [Description("Employee Other Accrual Payments")]
    EmployeeOtherAccrualPayments = 14,

    [Description("Employee Leave Encashment")]
    EmployeeLeaveEncashment = 15,

    [Description("Employee Pre-paid Advances")]
    EmployeePrepaidAdvances = 16,

    [Description("Sundry Earnings")]
    SundryEarnings = 17,

    [Description("Statutory Contribution-Employee")]
    StatutoryContributionEmployee = 18,

    [Description("Employee LOP Deductions")]
    EmployeeLOPDeductions = 19,

    [Description("Employee Sick Leave Deductions")]
    EmployeeSickLeaveDeductions = 20,

    [Description("Tax Deducted at Source")]
    TaxDeductedatSource = 21,

    [Description("Medical Insurance-Employee Contribution")]
    MedicalInsuranceEmployeeContribution = 22,

    [Description("Employee Loan Repayment")]
    EmployeeLoanRepayment = 23,

    [Description("Employee Pre-paid Deductions")]
    EmployeePrepaidDeductions = 24,

    [Description("Sundry Deductions")]
    SundryDeductions = 25,

    [Description("Statutory Contribution-Employer")]
    StatutoryContributionEmployer = 26,

    [Description("Medical Insurance-Employer Contribution")]
    MedicalInsuranceEmployerContribution = 27,

    [Description("Employee Ticket Accrual")]
    EmployeeTicketAccrual = 28,

    [Description("Employee Ticket Availing")]
    EmployeeTicketAvailing = 29,

    [Description("Employee EOS Accrual")]
    EmployeeEOSAccrual = 30,

    [Description("Employee Other Accruals")]
    EmployeeOtherAccruals = 31,

    [Description("Employee Annual Leave")]
    EmployeeAnnualLeave = 32,

    [Description("Employee Medical Leave")]
    EmployeeMedicalLeave = 33,

    [Description("Employee Casual Leave")]
    EmployeeCasualLeave = 34,

    [Description("Employee Privilege Leaves")]
    EmployeePrivilegeLeaves = 35,

    [Description("Employee Loss of Pay Leaves")]
    EmployeeLossofPayLeaves = 36,

    [Description("Employee Compensatory Leaves")]
    EmployeeCompensatoryLeaves = 37,

}

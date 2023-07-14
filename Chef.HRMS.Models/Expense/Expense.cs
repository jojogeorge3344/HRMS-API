using Chef.Common.Core;
using Chef.HRMS.Types;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models;

public class Expense : Model
{
    /// <summary>
    /// Holds id of the expense type
    /// </summary>
    [Required]
    [ForeignKey("ExpensePolicyConfiguration")]
    [Description("Id of the expense configuration id")]
    public int ExpenseConfigurationId { get; set; }
    /// <summary>
    /// Holds the expense type id
    /// </summary>
    [Required]
    [ForeignKey("ExpenseType")]
    [Description("Expense type id")]
    public int ExpenseTypeId { get; set; }

    /// <summary>
    /// Holds the expense policy id
    /// </summary>
    [Required]
    [ForeignKey("ExpensePolicy")]
    [Description("Expense polcy id")]
    public int ExpensePolicyId { get; set; }
    /// <summary>
    /// Holds the expense policy
    /// </summary>
    //[Required]
    [StringLength(32)]
    [ForeignKey("ExpensePolicy")]
    [Description("Name of expense policy")]
    public string ExpensePolicyName { get; set; }

    /// <summary>
    /// Holds the expense type
    /// </summary>
    //[Required]
    [StringLength(32)]
    [ForeignKey("ExpenseType")]
    [Description("Type of expense")]
    public string ExpenseTypeName { get; set; }


    /// <summary>
    /// Holds the expense title
    /// </summary>
    [Required]
    [StringLength(32)]
    [Description("Title of expense")]
    public string Name { get; set; }

    /// <summary>
    /// Holds the expense submission date
    /// </summary>
    [Required]
    [Description("Date of expense")]
    public DateTime ExpenseDate { get; set; }

    /// <summary>
    /// Holds the currency code assigned for corresponding expense category
    /// </summary>
    //[Required]
    [StringLength(3)]
    [Description("Currency code in expense type")]
    public string Currency { get; set; }

    /// <summary>
    /// Holds mileage calculation unit
    /// </summary>
    [Description("Mileage calculation unit")]
    public UnitType MileageUnit { get; set; }

    /// <summary>
    /// Holds value of mileage covered
    /// </summary>
    [Range(0, float.MaxValue)]
    [Description("Mileage Covered")]
    public float MileageCovered { get; set; }

    /// <summary>
    /// Holds value of mileage default rate
    /// </summary>
    [Range(0, float.MaxValue)]
    [Description("Mileage Rate")]
    public float MileageRate { get; set; }

    /// <summary>
    /// Holds  expense amount
    /// </summary>
    [Range(0, float.MaxValue)]
    [Description("Expense Amount")]
    public float Amount { get; set; }

    /// <summary>
    /// Holds the comment 
    /// </summary>
    //[Required]
    [StringLength(250)]
    [Description("Comment by the requester")]
    public string Comment { get; set; }

    /// <summary>
    /// Holds the details of requested person
    /// </summary>
    [Required]
    [ForeignKey("Employee")]
    [Description("Who is requested")]
    public int EmployeeId { get; set; }

    /// <summary>
    /// Holds the details of is receipt attached or not
    /// </summary>
    [Description("Is Receipt Attached")]
    public bool IsReceiptAttached { get; set; }

    /// <summary>
    /// Holds the approved status
    /// </summary>
    public RequestStatusType RequestStatus { get; set; }

    /// <summary>
    /// Holds the paid status
    /// </summary>
    public bool IsPaid { get; set; }

    /// <summary>
    /// Holds the PaymentMode
    /// </summary>
    public PaymentMode PaymentMode { get; set; }
}

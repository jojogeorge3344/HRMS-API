﻿using Chef.Common.Core;
using Chef.HRMS.Types;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models;

[Table("assetmyasset")]
public class AssetMyAsset : Model
{


    [Required]
    [ForeignKey("Asset")]
    public int AssetId { get; set; }


    [ForeignKey("AssetRaiseRequest")]
    public int AssetRaiseRequestId { get; set; }

    public int AssetTypeId { get; set; }


    [Required]
    [ForeignKey("Employee")]
    public int EmpId { get; set; }


    [ForeignKey("AssetRaiseRequest")]
    public string AssetTypeName { get; set; }

    [Required]
    [ForeignKey("Asset")]
    public string AssetName { get; set; }

    [Required]
    public DateTime AllocatedDate { get; set; }

    [Required]
    [ForeignKey("AssetAllocated")]
    public AssetStatus Status { get; set; }

    [ForeignKey("Asset")]
    public string Description { get; set; }


    public string ChangeDescription { get; set; }


    public string ReturnDescription { get; set; }


    public DateTime ReturnDate { get; set; }

    [Required]
    public AssetChangeType ChangeType { get; set; }

    public AssetReturnType ReturnType { get; set; }

    [Write(false)]
    [Skip(true)]
    public List<AssetAllocated> AssetAllocated { get; set; }
}

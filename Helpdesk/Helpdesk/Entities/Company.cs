using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Helpdesk.Entities;

[Table("companies")]
public partial class Company
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("company_name")]
    [StringLength(100)]
    [Unicode(false)]
    public string CompanyName { get; set; } = null!;

    [Column("token")]
    [StringLength(50)]
    [Unicode(false)]
    public string Token { get; set; } = null!;

    [Column("created_on", TypeName = "datetime")]
    public DateTime CreatedOn { get; set; }

    [Column("created_by")]
    public int CreatedBy { get; set; }

    [Column("logo")]
    [StringLength(500)]
    [Unicode(false)]
    public string? Logo { get; set; }
}

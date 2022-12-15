using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Helpdesk.Entities;

[Table("tickets")]
public partial class Ticket
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("title")]
    [Unicode(false)]
    public string Title { get; set; } = null!;

    [Column("description")]
    [Unicode(false)]
    public string Description { get; set; } = null!;

    [Column("priority")]
    [StringLength(50)]
    [Unicode(false)]
    public string Priority { get; set; } = null!;

    [Column("keywords")]
    [Unicode(false)]
    public string? Keywords { get; set; }

    [Column("token")]
    [StringLength(50)]
    [Unicode(false)]
    public string Token { get; set; } = null!;

    [Column("created_by")]
    public int CreatedBy { get; set; }

    [Column("created_by_full_name")]
    [StringLength(150)]
    [Unicode(false)]
    public string CreatedByFullName { get; set; } = null!;

    [Column("created_on", TypeName = "datetime")]
    public DateTime CreatedOn { get; set; }

    [Column("department")]
    [StringLength(50)]
    [Unicode(false)]
    public string Department { get; set; } = null!;

    [Column("assigned_to")]
    public int? AssignedTo { get; set; }

    [Column("assigned_to_full_name")]
    [StringLength(150)]
    [Unicode(false)]
    public string? AssignedToFullName { get; set; }

    [Column("assigned_on", TypeName = "datetime")]
    public DateTime? AssignedOn { get; set; }

    [Column("status")]
    [StringLength(50)]
    [Unicode(false)]
    public string? Status { get; set; }
}

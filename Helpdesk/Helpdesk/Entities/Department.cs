using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Helpdesk.Entities;

[Table("departments")]
public partial class Department
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("department")]
    [StringLength(150)]
    [Unicode(false)]
    public string Department1 { get; set; } = null!;

    [Column("description")]
    [StringLength(500)]
    [Unicode(false)]
    public string Description { get; set; } = null!;

    [Column("created_on", TypeName = "datetime")]
    public DateTime CreatedOn { get; set; }

    [Column("created_by")]
    public int CreatedBy { get; set; }

    [Column("token")]
    [StringLength(50)]
    [Unicode(false)]
    public string Token { get; set; } = null!;
}

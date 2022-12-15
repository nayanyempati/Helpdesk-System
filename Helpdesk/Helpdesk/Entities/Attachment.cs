using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Helpdesk.Entities;

[Table("attachments")]
public partial class Attachment
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("link")]
    [StringLength(500)]
    [Unicode(false)]
    public string? Link { get; set; }

    [Column("ticket_token")]
    [StringLength(50)]
    [Unicode(false)]
    public string? TicketToken { get; set; }

    [Column("created_by")]
    public int? CreatedBy { get; set; }

    [Column("token")]
    [StringLength(50)]
    [Unicode(false)]
    public string? Token { get; set; }

    [Column("created_on", TypeName = "datetime")]
    public DateTime? CreatedOn { get; set; }
}

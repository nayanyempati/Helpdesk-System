using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Helpdesk.Entities;

[Table("comments")]
public partial class Comment
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("ticket_id")]
    public int TicketId { get; set; }

    [Column("description")]
    [Unicode(false)]
    public string Description { get; set; } = null!;

    [Column("attachment_link")]
    [StringLength(500)]
    [Unicode(false)]
    public string? AttachmentLink { get; set; }

    [Column("created_by")]
    public int CreatedBy { get; set; }

    [Column("created_on", TypeName = "datetime")]
    public DateTime CreatedOn { get; set; }

    [Column("token")]
    [StringLength(50)]
    [Unicode(false)]
    public string Token { get; set; } = null!;

    [Column("ticket_token")]
    [StringLength(50)]
    [Unicode(false)]
    public string? TicketToken { get; set; }

    [Column("Created_by_fullname")]
    [StringLength(50)]
    [Unicode(false)]
    public string? CreatedByFullname { get; set; }
}

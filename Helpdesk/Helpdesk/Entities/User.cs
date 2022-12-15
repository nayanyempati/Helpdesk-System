using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Helpdesk.Entities;

[Table("users")]
public partial class User
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("first_name")]
    [StringLength(50)]
    [Unicode(false)]
    public string FirstName { get; set; } = null!;

    [Column("last_name")]
    [StringLength(50)]
    [Unicode(false)]
    public string LastName { get; set; } = null!;

    [Column("email")]
    [StringLength(50)]
    [Unicode(false)]
    public string Email { get; set; } = null!;

    [Column("password")]
    [Unicode(false)]
    public string Password { get; set; } = null!;

    [Column("photo")]
    [Unicode(false)]
    public string Photo { get; set; } = null!;

    [Column("email_invitation_link")]
    [StringLength(500)]
    [Unicode(false)]
    public string? EmailInvitationLink { get; set; }

    [Column("password_reset_link")]
    [StringLength(500)]
    [Unicode(false)]
    public string? PasswordResetLink { get; set; }

    [Column("role")]
    [StringLength(50)]
    [Unicode(false)]
    public string Role { get; set; } = null!;

    [Column("email_inivitation_expiry", TypeName = "datetime")]
    public DateTime? EmailInivitationExpiry { get; set; }

    [Column("company_name")]
    [StringLength(100)]
    [Unicode(false)]
    public string? CompanyName { get; set; }

    [Column("token")]
    [StringLength(50)]
    [Unicode(false)]
    public string Token { get; set; } = null!;

    [Column("company_id")]
    public int? CompanyId { get; set; }

    [Column("created_on", TypeName = "datetime")]
    public DateTime CreatedOn { get; set; }

    [Column("last_updated_on", TypeName = "datetime")]
    public DateTime LastUpdatedOn { get; set; }

    [Column("account_status")]
    [StringLength(50)]
    [Unicode(false)]
    public string AccountStatus { get; set; } = null!;
}

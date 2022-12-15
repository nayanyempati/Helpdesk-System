namespace Helpdesk.Models
{
    public class CreateCommentModel
    {
        public string Comment { get; set; } = null!;
        public string? AttachmentLink { get; set; }
    }
}

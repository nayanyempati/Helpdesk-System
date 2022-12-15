namespace Helpdesk.Models
{
    public class CreateTicketModel
    {
        public string Ticket { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Priority { get; set; } = null!;
        public dynamic? Keywords { get; set; }
        public string Department { get; set; } = null!;
        public string? Attachment { get; set; }
    }
}

﻿namespace helpdesk.Models
{
    public class RequestAccountModel
    {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string CompanyName { get; set; } = null!;

    }
}

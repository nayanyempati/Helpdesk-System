namespace Helpdesk.Models
{
    public class S3Model
    {
        public string Issuer { get; set; } = null!;
        public string S3BucketName { get; set; } = null!;
        public string S3SecretAccessKey { get; set; } = null!;
        public string S3AccessKey { get; set; } = null!;
        public string S3LocationPath { get; set; } = null!;
    }
}

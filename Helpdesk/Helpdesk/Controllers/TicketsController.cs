using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using helpdesk.Controllers;
using Helpdesk.Entities;
using helpdesk.Helpers;
using helpdesk.Interfaces;
using helpdesk.Models;
using Helpdesk.Interfaces;
using Helpdesk.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Helpdesk.Controllers
{
    [Route("api/tickets")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly ILogger _logger;
   
        private readonly Messages _messages = new Messages();
        private readonly ICompany _company;
        private readonly Cryptography _crypto = new Cryptography();
        private readonly SessionManagement _session = new SessionManagement();
        private readonly ITickets _tickets;
        public TicketsController(ILogger<TicketsController> logger, ICompany company, ITickets tickets)
        {
            _logger = logger;
            _company = company;
            _tickets = tickets;
        }


        [HttpGet("clients")]
        public async Task<List<Ticket>> ListClientTickets()
        {
            var identity = (ClaimsIdentity)User.Identity;
            int UserId = Convert.ToInt32(identity.Name);
            return await _tickets.ListClientTickets(UserId);
        }


        [HttpGet("view/{token}")]
        public async Task<Ticket?> ViewTicket(string token)
        {
            var identity = (ClaimsIdentity)User.Identity;
            int UserId = Convert.ToInt32(identity.Name);
            return await _tickets.ViewTicket(UserId, token);
        }

        [HttpGet("commentlist/{tickettoken}")]
        public async Task<List<Comment>> Comments( string tickettoken)
        {
            var identity = (ClaimsIdentity)User.Identity;
            int UserId = Convert.ToInt32(identity.Name);
            return await _tickets.Comments(UserId, tickettoken);
        }

        [HttpPost("markasresolved/{token}")]
        public async Task<ResponseMessage> MarkAsResolved(string token)
        {
            var identity = (ClaimsIdentity)User.Identity;
            int UserId = Convert.ToInt32(identity.Name);
            return await _tickets.MarkAsResovled(token, UserId);
        }

        [HttpPost("createcomment/{token}")]
        public async Task<ResponseMessage> CreateComment([FromBody] CreateCommentModel create, string token)
        {
            var identity = (ClaimsIdentity)User.Identity;
            int UserId = Convert.ToInt32(identity.Name);
            return await _tickets.CreateComment(create, token, UserId);
            
        }

        [HttpPost("clients/add"),]
        public async Task<ResponseMessage> CreateTicket([FromBody] CreateTicketModel create)
        {
            var identity = (ClaimsIdentity)User.Identity;
            int UserId = Convert.ToInt32(identity.Name);
            return await _tickets.CreateTicket(UserId, create);
        }

        //UPLOAD CLIENT LOGO
        [HttpPost, Route("upload")]
        public async Task<ResponseMessage> UploadFile()
        {
            _logger.LogInformation("Enter into UploadFile");
            PutObjectResponse response = new PutObjectResponse();
            S3Model s3Model = new S3Model();
            string localFolderName = string.Empty;
            string foldername = string.Empty;
            string sS3Bucket = string.Empty;
            var config = new ConfigurationBuilder().SetBasePath(System.IO.Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json").Build();
            var file = Request.Form.Files[0];

            localFolderName = Path.Combine("Uploads", "Tickets");
            sS3Bucket = "AWS";
            foldername = "Tickets";

            var newGuid = Guid.NewGuid().ToString();
            s3Model.S3SecretAccessKey = config[sS3Bucket + ":S3SecretAccessKey"];
            s3Model.S3AccessKey = config[sS3Bucket + ":S3AccessKey"];
            s3Model.Issuer = config[sS3Bucket + ":Issuer"];
            s3Model.S3BucketName = config[sS3Bucket + ":S3BucketName"];
            s3Model.S3LocationPath = config[sS3Bucket + ":S3LocationPath"];
            var pathToSave = Path.Combine(System.IO.Directory.GetCurrentDirectory(), localFolderName);
            var Filename = file.FileName.ToString();
            var FileWithoutExtension = Path.GetFileNameWithoutExtension(Filename);
            var FileExtension = Path.GetExtension(Filename);
            Filename = FileWithoutExtension + "-" + newGuid + FileExtension;
            var fullPath = Path.Combine(pathToSave, Filename);
            _logger.LogInformation("file full path :" + fullPath + " changed file name : " + Filename);
            using (var client = new AmazonS3Client(s3Model.S3AccessKey, s3Model.S3SecretAccessKey, RegionEndpoint.USEast1))
            {
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    try
                    {
                        file.CopyTo(stream);
                        var putRequest1 = new PutObjectRequest
                        {
                            BucketName = s3Model.S3BucketName,
                            Key = foldername + "/" + Filename,
                            InputStream = stream,
                            CannedACL = S3CannedACL.PublicRead
                        };
                        response = await client.PutObjectAsync(putRequest1);
                        _logger.LogInformation(file.FileName + " Uploaded successfully in aws ");
                        return new ResponseMessage { Message = s3Model.S3LocationPath + foldername + "/" + Filename, Status = _messages.SUCCESS };
                    }
                    catch (AmazonS3Exception ex)
                    {
                        return new ResponseMessage { Message = ex.Message, Status = _messages.FAILED };
                    }
                }
            }

        }
    }
}

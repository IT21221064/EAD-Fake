/*
 Wijerathne B.N.B 	IT21216046
 
 */


using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace EliteWear.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }  
        public int ? UserId { get; set; }
        public string? Email { get; set; }
        public string? Username { get; set; }
        public string? PasswordHash { get; set; }
        public string? State { get; set; }

        public string? Requested { get; set; }



    }
}

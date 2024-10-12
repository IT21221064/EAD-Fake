/*
 Wijerathne B.N.B 	IT21216046
 
 */


using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace EliteWear.Models
{
    public class Admin
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string? Username { get; set; }

        public string? PasswordHash { get; set; }
    }
}

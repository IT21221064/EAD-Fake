/*
 Wijerathne B.N.B 	IT21216046
 
 */


using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace EliteWear.Models
{
    public class Vendor
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public int? VendorId { get; set; }
        public string? Email { get; set; }
        public string? Username { get; set; }
        public string? PasswordHash { get; set; }

        public int NIC { get; set; }

        public DateTime Birthday { get; set; }


    }
}

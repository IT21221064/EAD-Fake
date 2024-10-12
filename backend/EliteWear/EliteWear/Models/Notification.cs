/*
Sachintha N.H.D.K	IT21221064
 
 */


using MongoDB.Bson.Serialization.Attributes;

namespace EliteWear.Models
{
    public class Notification
    {
        [BsonId]
        public int Id { get; set; }
        public string? Message { get; set; }
        public int? CustomerId { get; set; }
        public string NotificationType { get; set; } // "CSR" or "Customer"
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // Timestamp


    }

}

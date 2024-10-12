/*
Kumarasinghe M.G.H	IT21304538
 
 */



using MongoDB.Bson.Serialization.Attributes;

namespace EliteWear.Models
{
    public class Review
    {
        private static int _lastId;

        [BsonId]
        public int Id { get; set; }

        public int VendorID { get; set; }
        public string Name { get; set; }
        public int Rate { get; set; }

        public string Description { get; set; }

        public Review()
        {
            Id = GetNextId();
        }

        // Method to get the next ID
        private static int GetNextId()
        {
            return ++_lastId; // Increment and return the next ID
        }
    }
}

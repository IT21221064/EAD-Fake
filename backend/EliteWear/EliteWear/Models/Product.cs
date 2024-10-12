/*
Sachintha N.H.D.K	IT21221064
 
 */


using MongoDB.Bson.Serialization.Attributes;

namespace EliteWear.Models
{
    public class Product
    {


        [BsonId]
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Description { get; set; }

        public decimal Price { get; set; }

        public string? Category { get; set; }

        public int Quantity { get; set; }

        public int VendorId { get; set; }

        public string Status { get; set; }
        public string? ImageUrl { get; set; }

        public Product()
        {
            //Id = GetNextId();
        }

        // Method to get the next ID

    }
}

/*
 Saubhagya S.D.S.S.	IT21312380
 
 */
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace EliteWear.Models
{
    public class Cart
    {
        
        public int Id { get; set; }

        public int UserId { get; set; }
        public List<CartItem>? Items { get; set; }
        public double TotalPrice { get; set; }
    }

    public class CartItem
    {
        public int Id { get; set; }
        public string? Name { get; set; }

        public string? ImageURL { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; } // Added Quantity
    }
}

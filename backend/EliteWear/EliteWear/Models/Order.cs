/*
 Saubhagya S.D.S.S.	IT21312380
 
 */


using MongoDB.Bson;
using MongoDB.EntityFrameworkCore;
using System.Collections.ObjectModel;



namespace EliteWear.Models
{
    [Collection("Order")]
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public List<Items>? Items { get; set; }      
        public double TotalPrice { get; set; }
        public string? Status { get; set; }


    }

    public class Items
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int Qty { get; set; }
        public string? Status { get; set; }
    }

}

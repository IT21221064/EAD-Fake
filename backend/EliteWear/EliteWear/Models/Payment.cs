/*
 Saubhagya S.D.S.S.	IT21312380
 
 */


using MongoDB.EntityFrameworkCore;

namespace EliteWear.Models
{
    [Collection("Payments")]
    public class Payment
    {
        public int Id { get; set; } 
        public string? CardType { get; set; }
        public double Amount { get; set; }
        public string? BillingAddress { get; set; }
        public string? ExpireDate { get; set;}

    }
}

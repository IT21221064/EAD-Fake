/*
 Saubhagya S.D.S.S.	IT21312380
 
 */


using EliteWear.Models;
using MongoDB.Driver;

namespace EliteWear.Services
{
    public class PaymentService
    {
        private readonly EliteWearDbContext _context;

        public PaymentService(EliteWearDbContext context)
        {
            _context = context;
        }

        // Get the next available payment ID based on the last record in the collection
        public async Task<int> GetNextPaymentIdAsync()
        {
            var lastPayment = await _context.Payments.Find(payment => true)
                .Sort(Builders<Payment>.Sort.Descending(p => p.Id))
                .Limit(1)
                .FirstOrDefaultAsync();

            return lastPayment?.Id + 1 ?? 1; // Start with 1 if no payments exist
        }

        public async Task<List<Payment>> GetPaymentsAsync()
        {
            return await _context.Payments.Find(payment => true).ToListAsync();
        }

        public async Task<Payment?> GetPaymentByIdAsync(int id)
        {
            return await _context.Payments.Find(payment => payment.Id == id).FirstOrDefaultAsync();
        }

        public async Task CreatePaymentAsync(Payment payment)
        {
            // Set the auto-incremented ID
            payment.Id = await GetNextPaymentIdAsync();
            await _context.Payments.InsertOneAsync(payment);
        }

        public async Task UpdatePaymentAsync(int id, Payment updatedPayment)
        {
            await _context.Payments.ReplaceOneAsync(payment => payment.Id == id, updatedPayment);
        }

        public async Task DeletePaymentAsync(int id)
        {
            await _context.Payments.DeleteOneAsync(payment => payment.Id == id);
        }
    }
}

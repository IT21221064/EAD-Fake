/*
Kumarasinghe M.G.H	IT21304538
 
 */



using EliteWear.Models;
using MongoDB.Driver;

namespace EliteWear.Services
{
    public class ReviewService
    {
        private readonly EliteWearDbContext _context;

        public ReviewService(EliteWearDbContext context)
        {
            _context = context;
        }

        public async Task<List<Review>> GetReviewsAsync()
        {
            return await _context.Reviews.Find(review => true).ToListAsync();
        }

        public async Task<List<Review>> GetReviewsByVendorIdAsync(int vendorID)
        {
            return await _context.Reviews.Find(review => review.VendorID == vendorID).ToListAsync();
        }

        public async Task<List<Review>> GetReviewsByUserNameAsync(string name)
        {
            return await _context.Reviews.Find(review => review.Name == name).ToListAsync();
        }

        public async Task<Review?> GetReviewByIdAsync(int id)
        {
            return await _context.Reviews.Find(review => review.Id == id).FirstOrDefaultAsync();
        }

        public async Task CreateReviewAsync(Review review)
        {
            // No need to set Id here, it is handled in the Review constructor
            await _context.Reviews.InsertOneAsync(review);
        }

        public async Task UpdateReviewAsync(int id, Review updatedReview)
        {
            await _context.Reviews.ReplaceOneAsync(review => review.Id == id, updatedReview);
        }

        public async Task DeleteReviewAsync(int id)
        {
            await _context.Reviews.DeleteOneAsync(review => review.Id == id);
        }
    }
}

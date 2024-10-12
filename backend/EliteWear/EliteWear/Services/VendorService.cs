/*
 Wijerathne B.N.B 	IT21216046
 
 */


using EliteWear.Models;
using EliteWear.Data;
using System.Text;
using MongoDB.Driver;
using System.Threading.Tasks;
using System.Security.Cryptography;




namespace EliteWear.Services
{
    public class VendorService
    {
        private readonly EliteWearDbContext _context;

        public VendorService(EliteWearDbContext context)
        {
            _context = context;
        }

        public async Task<bool> RegisterVendor(string username, string email, string password)
        {
            var existingVendor = await _context.Vendor.Find(u => u.Username == username).FirstOrDefaultAsync();
            if (existingVendor != null)
                return false;

            var vendor = new Vendor
            {
                VendorId = await GetNextOrderIdAsync(),
                Username = username,
                Email = email,
                PasswordHash = HashPassword(password)
            };

            await _context.Vendor.InsertOneAsync(vendor);
            return true;
        }

        public async Task<int> GetNextOrderIdAsync()
        {
            var lastVendor = await _context.Vendor.Find(user => true)
                .Sort(Builders<Vendor>.Sort.Descending(o => o.VendorId))
                .Limit(1)
                .FirstOrDefaultAsync();

            return lastVendor?.VendorId + 1 ?? 1; // If no orders exist, start at 1
        }

        public async Task<Vendor> AuthenticateVendor(string email, string password)
        {
            var vendor = await _context.Vendor.Find(u => u.Email == email).FirstOrDefaultAsync();
            if (vendor == null || !VerifyPassword(password, vendor.PasswordHash))
                return null;

            return vendor;
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(bytes);
            }
        }

        private bool VerifyPassword(string password, string hashedPassword)
        {
            var hash = HashPassword(password);
            return hash == hashedPassword;
        }


        public async Task UpdateVendorAsync(string id, Vendor updatedVendor)
        {
            await _context.Vendor.ReplaceOneAsync(vendor => vendor.Id == id, updatedVendor);
        }

        public async Task DeleteVendorAsync(string id)
        {
            await _context.Vendor.DeleteOneAsync(vendor => vendor.Id == id);
        }

        public async Task<Vendor?> GetVendorByIdAsync(string id)
        {
            return await _context.Vendor.Find(vendor => vendor.Id == id).FirstOrDefaultAsync();
        }

        public async Task<List<Vendor>> GetVendorsAsync()
        {
            return await _context.Vendor.Find(vendor => true).ToListAsync();
        }
    }
}

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
   
        public class AdminService
        {
            private readonly EliteWearDbContext _context;

            public AdminService(EliteWearDbContext context)
            {
                _context = context;
            }

            public async Task<bool> RegisterAdmin(string Username, string Password)
            {
                var existingAdmin = await _context.Admin.Find(a => a.Username == Username).FirstOrDefaultAsync();
                if (existingAdmin != null)
                    return false;

                var admin = new Admin
                {
                    Username = Username,
                    PasswordHash = HashPassword(Password)
                };

                await _context.Admin.InsertOneAsync(admin);
                return true;
            }

            public async Task<Admin> AuthenticateAdmin(string Username, string Password)
            {
                var admin = await _context.Admin.Find(u => u.Username == Username).FirstOrDefaultAsync();
                if (admin == null || !VerifyPassword(Password, admin.PasswordHash))
                    return null;

                return admin;
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


           

        }
    
}

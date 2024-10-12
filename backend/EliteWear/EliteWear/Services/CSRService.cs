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

    public class CSRService
    {
        private readonly EliteWearDbContext _context;

        public CSRService(EliteWearDbContext context)
        {
            _context = context;
        }

        public async Task<bool> RegisterCSR(string Username, string Password)
        {
            var existingCSR = await _context.CSR.Find(a => a.Username == Username).FirstOrDefaultAsync();
            if (existingCSR != null)
                return false;

            var csr = new CSR
            {
                Username = Username,
                PasswordHash = HashPassword(Password)
            };

            await _context.CSR.InsertOneAsync(csr);
            return true;
        }

        public async Task<CSR> AuthenticateCSR(string Username, string Password)
        {
            var csr = await _context.CSR.Find(u => u.Username == Username).FirstOrDefaultAsync();
            if (csr == null || !VerifyPassword(Password, csr.PasswordHash))
                return null;

            return csr;
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

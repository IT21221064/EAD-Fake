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
    public class UserService
    {
        private readonly EliteWearDbContext _context;

        public UserService(EliteWearDbContext context)
        {
            _context = context;
        }

        public async Task<bool> RegisterUser(string username, string email, string password, string state, string requested)
        {
            var existingUser = await _context.Users.Find(u => u.Username == username).FirstOrDefaultAsync();
            if (existingUser != null)
                return false;

            var user = new User
            {
                UserId = await GetNextOrderIdAsync(),
                Username = username,
                Email = email,
                PasswordHash = HashPassword(password),
                State = state,
                Requested = requested

            };

            await _context.Users.InsertOneAsync(user);
            return true;
        }
        public async Task<int> GetNextOrderIdAsync()
        {
            var lastUser = await _context.Users.Find(user => true)
                .Sort(Builders<User>.Sort.Descending(o => o.UserId))
                .Limit(1)
                .FirstOrDefaultAsync();

            return lastUser?.UserId + 1 ?? 1; // If no orders exist, start at 1
        }

        public async Task<User> AuthenticateUser(string email, string password)
        {
            var user = await _context.Users.Find(u => u.Email == email).FirstOrDefaultAsync();
            if (user == null || !VerifyPassword(password, user.PasswordHash))
                return null;

            return user;
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


        public async Task UpdateUserAsync(string id, User updatedUser)
        {
            await _context.Users.ReplaceOneAsync(user => user.Id == id, updatedUser);
        }

        public async Task DeleteUserAsync(string id)
        {
            await _context.Users.DeleteOneAsync(user => user.Id == id);
        }

        public async Task<User?> GetUserByIdAsync(string email)
        {
            return await _context.Users.Find(user => user.Email == email).FirstOrDefaultAsync();
        }

        public async Task<List<User>> GetUsersAsync()
        {
            return await _context.Users.Find(user => true).ToListAsync();
        }

        public async Task<bool> DeactivateUserAsync(string email)
        {
            var user = await _context.Users.Find(u => u.Email == email).FirstOrDefaultAsync();
            if (user == null)
                return false;

            var update = Builders<User>.Update.Set(u => u.State, "Deactivated");
            var result = await _context.Users.UpdateOneAsync(u => u.Email == email, update);

            return result.ModifiedCount > 0;
        }

        public async Task<bool> ActivateUserAsync(string email)
        {
            var user = await _context.Users.Find(u => u.Email == email).FirstOrDefaultAsync();
            if (user == null)
                return false;

            var update = Builders<User>.Update.Set(u => u.State, "Activated");
            var result = await _context.Users.UpdateOneAsync(u => u.Email == email, update);

            return result.ModifiedCount > 0;
        }

        public async Task<bool> RequestedUserAsync(string email)
        {
            var user = await _context.Users.Find(u => u.Email == email).FirstOrDefaultAsync();
            if (user == null)
                return false;

            var update = Builders<User>.Update.Set(u => u.Requested, "Yes");
            var result = await _context.Users.UpdateOneAsync(u => u.Email == email, update);

            return result.ModifiedCount > 0;
        }


        
    }
}

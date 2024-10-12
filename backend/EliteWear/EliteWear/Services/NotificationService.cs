/*
Sachintha N.H.D.K	IT21221064
 
 */



using EliteWear.Models;
using MongoDB.Driver;

namespace EliteWear.Services
{
    public class NotificationService
    {
        private readonly EliteWearDbContext _context;

        public NotificationService(EliteWearDbContext context)
        {
            _context = context;
        }

        // Method to create a vendor notification
        public async Task CreateCSRNotificationAsync(int customerId, string message)
        {
            var notification = new Notification
            {
                Id = await GetNextOrderIdAsync(), // Assign the Id provided by the user
                CustomerId = customerId,
                Message = message,
                NotificationType = "CSR"
            };

            await _context.Notifications.InsertOneAsync(notification);
        }
        public async Task<int> GetNextOrderIdAsync()
        {
            var lastNotification = await _context.Notifications.Find(notifications => true)
                .Sort(Builders<Notification>.Sort.Descending(o => o.Id))
                .Limit(1)
                .FirstOrDefaultAsync();

            return lastNotification?.Id + 1 ?? 1; // If no orders exist, start at 1
        }

        // Method to create a customer notification
        public async Task CreateCustomerNotificationAsync(int customerId, string message)
        {
            var notification = new Notification
            {
                Id = await GetNextOrderIdAsync(),
                CustomerId = customerId,
                Message = message,
                NotificationType = "Customer"
            };

            await _context.Notifications.InsertOneAsync(notification);
        }

        // Method to retrieve notifications for a specific vendor
        public async Task<List<Notification>> GetNotificationsFromCSRAsync(int customerId)
        {
            return await _context.Notifications
                .Find(notification => notification.CustomerId == customerId && notification.NotificationType == "CSR")
                .ToListAsync();
        }

        // Method to retrieve notifications for a specific customer
        public async Task<List<Notification>> NotificationsFromCustomerAsync()
        {
            return await _context.Notifications
                .Find(notification => notification.NotificationType == "Customer")
                .ToListAsync();
        }

        public async Task SendLowStockNotification(Product product)
        {
            var vendorId = product.VendorId;
            var id = await GetNextOrderIdAsync();

            string message = $"Product '{product.Name}' (ID: {product.Id}) has low stock. Remaining quantity: {product.Quantity}.";

            await CreateCSRNotificationAsync(vendorId, message);
        }

    }
}

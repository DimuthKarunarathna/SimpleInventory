using Microsoft.EntityFrameworkCore;
using SimpleInventory.Models; 
namespace SimpleInventory.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {}

        public DbSet<Product> Products { get; set; } = default!; // 'default!' to suppress null warning
    }
}
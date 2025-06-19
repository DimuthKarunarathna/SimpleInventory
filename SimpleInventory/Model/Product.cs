namespace SimpleInventory.Models
{
    public class Product
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty; 

        public decimal Price { get; set; }

        // Product Quantity in stock
        public int Quantity { get; set; }

        // Optional: Adding a constructor for easier object creation (not strictly necessary for EF Core)
        public Product()
        {
            // Default constructor for EF Core
        }

        public Product(string name, decimal price, int quantity)
        {
            Name = name;
            Price = price;
            Quantity = quantity;
        }
    }
}
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SimpleInventory.Data;
using SimpleInventory.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleInventory.Controllers
{
    [Route("api/[controller]")] 
    [ApiController] // Indicates that this class is an API controller
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        // Constructor: Dependency Injection will provide an instance of ApplicationDbContext
        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // --- GET All Products ---
        // GET: api/products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            // Retrieve all products from the database asynchronously
            return await _context.Products.ToListAsync();
        }

        // --- GET Product by ID ---
        // GET: api/products/5
        [HttpGet("{id}")] // Specifies that 'id' is a parameter in the route
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            // Find a product by its ID
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound(); // Return 404 Not Found if product doesn't exist
            }

            return product; // Return the found product (200 OK)
        }

        // --- POST (Create) a New Product ---
        // POST: api/products
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            // Add the new product to the context
            _context.Products.Add(product);
            // Save changes to the database
            await _context.SaveChangesAsync();

            // Return 201 Created status with the newly created product and its URL
            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }

        // --- PUT (Update) an Existing Product ---
        // PUT: api/products/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            // Check if the ID in the route matches the ID of the product object
            if (id != product.Id)
            {
                return BadRequest(); // Return 400 Bad Request if IDs don't match
            }

            // Mark the product as modified
            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync(); // Save changes
            }
            catch (DbUpdateConcurrencyException)
            {
                // Check if the product actually exists before throwing an error
                if (!ProductExists(id))
                {
                    return NotFound(); // Product not found
                }
                else
                {
                    throw; // Something else went wrong, re-throw the exception
                }
            }

            return NoContent(); // Return 204 No Content for successful update
        }

        // --- DELETE a Product ---
        // DELETE: api/products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            // Find the product to delete
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound(); // Return 404 Not Found if product doesn't exist
            }

            // Remove the product from the context
            _context.Products.Remove(product);
            await _context.SaveChangesAsync(); // Save changes

            return NoContent(); // Return 204 No Content for successful deletion
        }

        // --- Helper Method to Check if Product Exists ---
        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }
    }
}
/*
Sachintha N.H.D.K	IT21221064
 
 */



using EliteWear.Models;
using EliteWear.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/product")]
public class ProductController : ControllerBase
{
    private readonly ProductService _productService;

    public ProductController(ProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    public async Task<IActionResult> GetProducts()
    {
        var products = await _productService.GetProductsAsync();
        return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProduct(int id)
    {
        var product = await _productService.GetProductByIdAsync(id);
        if (product == null)
            return NotFound();
        return Ok(product);
    }

    [HttpPost]
    public async Task<IActionResult> CreateProduct([FromBody] Product product)
    {
        // Check if a product with the given Id already exists
        var existingProduct = await _productService.GetProductByIdAsync(product.Id);
        if (existingProduct != null)
        {
            return BadRequest("A product with this Id already exists.");
        }

        // Check if the product contains an image URL
        if (string.IsNullOrEmpty(product.ImageUrl))
        {
            return BadRequest("Image URL is required.");
        }

        await _productService.CreateProductAsync(product);
        return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
    }



    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProduct(int id, [FromBody] Product updatedProduct)
    {
        await _productService.UpdateProductAsync(id, updatedProduct);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        await _productService.DeleteProductAsync(id);
        return NoContent();
    }

    [HttpPost("upload-image")]
    public async Task<IActionResult> UploadImage([FromForm] IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No file uploaded.");

        // Define your image storage path (this is just an example path)
        var filePath = Path.Combine("wwwroot/images", file.FileName);

        // Save the file to the specified path
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        // Assuming the server's base URL is http://localhost:5133/
        var imageUrl = $"http://localhost:5133/images/{file.FileName}";

        // Return the image URL
        return Ok(new { imageUrl });
    }

    [HttpPut("restock/{productId}")]
    public async Task<IActionResult> RestockProductQuantity(int productId, [FromBody] int quantity)
    {
        await _productService.RestockProductQuantityAsync(productId, quantity);
        return NoContent();
    }

    [HttpPut("activate/{productId}")]
    public async Task<IActionResult> UpdateProductStatus(int productId)
    {
        try
        {
            await _productService.ActivateProductStatusAsync(productId);
            return Ok(new { message = $"Product with ID {productId} status updated to Active." });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }



}

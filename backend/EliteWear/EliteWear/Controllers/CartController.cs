/*
 Saubhagya S.D.S.S.	IT21312380
 
 */


using EliteWear.Models;
using EliteWear.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/cart")]
public class CartController : ControllerBase
{
    private readonly CartService _cartService;

    public CartController(CartService cartService)
    {
        _cartService = cartService;
    }

    [HttpGet]
    public async Task<IActionResult> GetCarts()
    {
        var carts = await _cartService.GetCartsAsync();
        return Ok(carts);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCart(int id)
    {
        var cart = await _cartService.GetCartByIdAsync(id);
        if (cart == null)
            return NotFound();
        return Ok(cart);
    }

    [HttpPost]
    public async Task<IActionResult> CreateCart([FromBody] Cart cart)
    {
        await _cartService.CreateCartAsync(cart);
        return CreatedAtAction(nameof(GetCart), new { id = cart.Id }, cart);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCart(int id, [FromBody] Cart updatedCart)
    {
        await _cartService.UpdateCartAsync(id, updatedCart);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCart(int id)
    {
        await _cartService.DeleteCartAsync(id);
        return NoContent();
    }
    [HttpDelete("{UserId}/items/{cartItemId}")]
    public async Task<IActionResult> DeleteCartItem(int UserId, int cartItemId)
    {
        var success = await _cartService.RemoveCartItemAsync(UserId, cartItemId);

        if (!success)
        {
            return NotFound(); // Return 404 if the cart or item was not found
        }

        return NoContent(); // Return 204 No Content if the item was successfully deleted
    }
}

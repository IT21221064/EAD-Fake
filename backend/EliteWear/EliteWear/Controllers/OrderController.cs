/*
 Saubhagya S.D.S.S.	IT21312380
 
 */


using EliteWear.Models;
using EliteWear.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/order")]
public class OrderController : ControllerBase
{
    private readonly OrderService _orderService;

    public OrderController(OrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpGet]
    public async Task<IActionResult> GetOrders()
    {
        var orders = await _orderService.GetOrdersAsync();
        return Ok(orders);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetOrder(int id)
    {
        var order = await _orderService.GetOrderByIdAsync(id);
        if (order == null)
            return NotFound();
        return Ok(order);
    }

    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] Order order)
    {
        await _orderService.CreateOrderAsync(order);
        return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateOrder(int id, [FromBody] Order updatedOrder)
    {
        await _orderService.UpdateOrderAsync(id, updatedOrder);
        return NoContent();
    }

    [HttpPut("{id}/status")]
    public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] string newStatus)
    {
        try
        {
            await _orderService.UpdateOrderStatusAsync(id, newStatus);
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error updating order status: {ex.Message}");
        }
    }

    [HttpPut("{id}/item/{itemId}")]
    public async Task<IActionResult> UpdateOrderItemStatus(int id, int itemId, [FromBody] string status)
    {
        try
        {
            await _orderService.UpdateOrderItemStatusAsync(id, itemId, status);
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error updating order status: {ex.Message}");
        }
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteOrder(int id)
    {
        await _orderService.DeleteOrderAsync(id);
        return NoContent();
    }
}

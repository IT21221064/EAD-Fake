/*
Kumarasinghe M.G.H	IT21304538
 
 */


using EliteWear.Models;
using EliteWear.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/review")]
public class ReviewController : ControllerBase
{
    private readonly ReviewService _reviewService;

    public ReviewController(ReviewService reviewService)
    {
        _reviewService = reviewService;
    }
    [HttpGet]
    public async Task<IActionResult> GetReviews()
    {
        var reviews = await _reviewService.GetReviewsAsync();
        return Ok(reviews);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetReview(int id)
    {
        var review = await _reviewService.GetReviewByIdAsync(id);
        if (review == null)
            return NotFound();
        return Ok(review);
    }

    [HttpGet("vendor/{vendorId}")]
    public async Task<IActionResult> GetReviewsByVendorIdAsync(int vendorId)
    {
        var review = await _reviewService.GetReviewsByVendorIdAsync(vendorId);
        if (review == null)
            return NotFound();
        return Ok(review);
    }

    [HttpGet("user/{name}")]
    public async Task<IActionResult> GetReviewsByUserNameAsync(string name)
    {
        var review = await _reviewService.GetReviewsByUserNameAsync(name);
        if (review == null)
            return NotFound();
        return Ok(review);
    }



    [HttpPost]
    public async Task<IActionResult> CreateReview([FromBody] Review review)
    {
        await _reviewService.CreateReviewAsync(review);
        return CreatedAtAction(nameof(GetReview), new { id = review.Id }, review);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateReview(int id, [FromBody] Review updatedReview)
    {
        await _reviewService.UpdateReviewAsync(id, updatedReview);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteReview(int id)
    {
        await _reviewService.DeleteReviewAsync(id);
        return NoContent();
    }

}

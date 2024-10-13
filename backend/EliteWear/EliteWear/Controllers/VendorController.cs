/*
 Wijerathne B.N.B 	IT21216046
 
 */


using EliteWear.Models;
using EliteWear.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/vendor")]
public class VendorController : ControllerBase
{
    private readonly VendorService _vendorService;

    public VendorController(VendorService vendorService)
    {
        _vendorService = vendorService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterVendorDto vdto)
    {
        if (!await _vendorService.RegisterVendor(vdto.Username, vdto.Email, vdto.Password, vdto.NIC, vdto.Birthday))
            return BadRequest(new { error = "Username already exists." });

        // Return a JSON object instead of a plain string
        return Ok(new { message = "Admin registered successfully." });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginVendorDto vdto)
    {
        var vendor = await _vendorService.AuthenticateVendor(vdto.Email, vdto.Password);
        if (vendor == null)
            return Unauthorized(new { error = "Invalid username or password." });

        // Return a JSON object instead of a plain string
        return Ok(new { vendor });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateVendor(string id, [FromBody] Vendor updatedVendor)
    {
        await _vendorService.UpdateVendorAsync(id, updatedVendor);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteVendor(string id)
    {
        await _vendorService.DeleteVendorAsync(id);
        return NoContent();
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetVendor(string id)
    {
        var vendor = await _vendorService.GetVendorByIdAsync(id);
        if (vendor == null)
            return NotFound();
        return Ok(vendor);
    }

    [HttpGet]
    public async Task<IActionResult> GetVenddors()
    {
        var vendor = await _vendorService.GetVendorsAsync();
        return Ok(vendor);
    }



}

public class RegisterVendorDto
{
    public string? Username { get; set; }
    public string? Email { get; set; }
    public string? Password { get; set; }

    public int NIC { get; set; }

    public DateTime Birthday { get; set; }
}

public class LoginVendorDto
{
    public string? Email { get; set; }
    public string? Password { get; set; }
}

public class UpdateVendorDto
{
    public string? Email { get; set; }
    public string? Username { get; set; }
}

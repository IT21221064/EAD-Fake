/*
 Wijerathne B.N.B 	IT21216046
 
 */

using EliteWear.Models;
using EliteWear.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/admin")]
public class AdminController : ControllerBase
{
    private readonly AdminService _adminService;

    public AdminController(AdminService adminService)
    {
        _adminService = adminService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginAdminDto adto)
    {
        var admin = await _adminService.AuthenticateAdmin(adto.Username, adto.Password);
        if (admin == null)
            return Unauthorized(new { error = "Invalid username or password." });

        // Return a JSON object instead of a plain string
        return Ok(new { message = "Login successful.", admin });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterAdminDto adto)
    {
        if (!await _adminService.RegisterAdmin(adto.Username, adto.Password))
            return BadRequest(new { error = "Username already exists." });

        // Return a JSON object instead of a plain string
        return Ok(new { message = "Admin registered successfully." });
    }







}

public class RegisterAdminDto
{
    public string? Username { get; set; }
    public string? Password { get; set; }
}

public class LoginAdminDto
{
    public string? Username { get; set; }
    public string? Password { get; set; }
}

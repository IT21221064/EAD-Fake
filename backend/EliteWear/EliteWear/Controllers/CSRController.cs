/*
 Wijerathne B.N.B 	IT21216046
 
 */

using EliteWear.Models;
using EliteWear.Services;
using Microsoft.AspNetCore.Mvc;
using System.Numerics;

[ApiController]
[Route("api/csr")]
public class CSRController : ControllerBase
{
    private readonly CSRService _csrService;

    public CSRController(CSRService csrService)
    {
        _csrService = csrService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterCSRDto cdto)
    {
        if (!await _csrService.RegisterCSR(cdto.Username, cdto.Password))
            return BadRequest(new { error = "Username already exists." });

        // Return a JSON object instead of a plain string
        return Ok(new { message = "Admin registered successfully." });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginCSRDto cdto)
    {
        var csr = await _csrService.AuthenticateCSR(cdto.Username, cdto.Password);
        if (csr == null)
            return Unauthorized(new { error = "Invalid username or password." });

        // Return a JSON object instead of a plain string
        return Ok(new { message = "Login successful.", csr });
    }






}

public class RegisterCSRDto
{
    public string? Username { get; set; }
    public string? Password { get; set; }
}

public class LoginCSRDto
{
    public string? Username { get; set; }
    public string? Password { get; set; }
}

/*
 Wijerathne B.N.B 	IT21216046
 
 */



using EliteWear.Models;
using EliteWear.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/user")]
public class UserController : ControllerBase
{
    private readonly UserService _userService;

    public UserController(UserService userService)
    {
        _userService = userService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserDto dto)
    {
        if (!await _userService.RegisterUser(dto.Username, dto.Email, dto.Password, dto.State, dto.Requested))
            return BadRequest("Username already exists.");

        return Ok("User registered successfully.");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginUserDto dto)
    {
        var user = await _userService.AuthenticateUser(dto.Email, dto.Password);
        if (user == null)
            return Unauthorized("Invalid email or password.");

        return Ok(user);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(string id, [FromBody]  User updatedUser)
    {
        await _userService.UpdateUserAsync(id, updatedUser);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(string id)
    {
        await _userService.DeleteUserAsync(id);
        return NoContent();
    }

    [HttpGet("{email}")]
    public async Task<IActionResult> GetUser(string email)
    {
        var user = await _userService.GetUserByIdAsync(email);
        if (user == null)
            return NotFound();
        return Ok(user);
    }



    [HttpGet]
    public async Task<IActionResult> GetProducts()
    {
        var user = await _userService.GetUsersAsync();
        return Ok(user);
    }

    [HttpPut("deactivate/{email}")]
    public async Task<IActionResult> DeactivateUser(string email)
    {
        var result = await _userService.DeactivateUserAsync(email);
        if (!result)
            return NotFound("User not found or could not be deactivated.");

        return Ok("User has been deactivated.");
    }

    [HttpPut("activate/{email}")]
    public async Task<IActionResult> ActivateUser(string email)
    {
        var result = await _userService.ActivateUserAsync(email);
        if (!result)
            return NotFound("User not found or could not be activated.");

        return Ok("User has been activated.");
    }

    [HttpPut("requested/{email}")]
    public async Task<IActionResult> RequestUser(string email)
    {
        var result = await _userService.RequestedUserAsync(email);
        if (!result)
            return NotFound("User not found or could not be requested.");

        return Ok("Request has been sent.");
    }

    [HttpPut("update/{email}")]
    public async Task<IActionResult> EditUser(string email, [FromBody] User updatedUser)
    {
        var user = await _userService.GetUserByIdAsync(email);
        if (user == null) return NotFound();

        
        user.Username = updatedUser.Username;
        user.Email = updatedUser.Email; // Update the email
        user.PasswordHash = updatedUser.PasswordHash;
        user.State = updatedUser.State;
        user.Requested = updatedUser.Requested;

        await _userService.UpdateUserAsync(user.Id, user);

        return NoContent();
    }


}

public class RegisterUserDto
{
    public string? Username { get; set; }
    public string? Email { get; set; }
    public string? Password { get; set; }

    public string? State { get; set; }

    public string? Requested { get; set; }
}

public class LoginUserDto
{
    public string? Email { get; set; }
    public string? Password { get; set; }
}

public class UpdateUserDto
{
    public string? Email { get; set; }
    public string? Password { get; set; }
}

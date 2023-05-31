using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class AccountController : ControllerBase
  {
    private readonly UserManager<AppUser> _userManager;
    private readonly TokenService _tokenService;

    public AccountController(UserManager<AppUser> userManager, TokenService tokenService)
    {
      _userManager = userManager;
      _tokenService = tokenService;
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
      var user = await _userManager.FindByEmailAsync(loginDto.Email);
      if (user == null)
      {
        return Unauthorized();
      }

      var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);
      if (result)
      {
        return CreateUserDto(user);
      }
      return Unauthorized(result);
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
      var r1 = await _userManager.Users.AnyAsync(x => x.UserName == registerDto.UserName);
      if (r1) return BadRequest("Username already taken");

      var r2 = await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email);
      if (r2) return BadRequest("Email Address already registered");

      var user = new AppUser
      {
        DisplayName = registerDto.DisplayName,
        Email = registerDto.Email,
        UserName = registerDto.UserName
      };

      var result = await _userManager.CreateAsync(user, registerDto.Password);
      if (result.Succeeded) return CreateUserDto(user);
      return BadRequest(result.Errors);
    }

    [HttpGet]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
      var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
      if (user == null) return NotFound();
      return Ok(CreateUserDto(user));
    }

    private UserDto CreateUserDto(AppUser user)
    {
      return new UserDto
      {
        DisplayName = user.DisplayName,
        UserName = user.UserName,
        Image = null,
        Token = _tokenService.CreateToken(user)
      };
    }
  }
}
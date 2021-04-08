using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class AuthenticationServices : AsyncService, IAuthenticationServices
    {
        private readonly IAuthenticationRepository authenticationRepository;

        public AuthenticationServices(IAuthenticationRepository authenticationRepository)
        {
            this.authenticationRepository = authenticationRepository;
        }

        public Task<int> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<Authentication> GenerateLoginToken(Authentication credentials)
        {
            return await Task.Run(() =>
            {
                // authentication successful so generate jwt token
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes("authentication successful so generate jwt token");
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                    new Claim(ClaimTypes.Name, credentials.Email.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                credentials.Token = tokenHandler.WriteToken(token);
                credentials.Password = string.Empty;
                return credentials;
            });
        }

        public Task<IEnumerable<Authentication>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Authentication> GetAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<Authentication> InsertAsync(Authentication authentication)
        {
            return await authenticationRepository.InsertAsync(authentication);
        }

        public async Task<Authentication> Login(Authentication credentials)
        {
            var result = await authenticationRepository.Login(credentials);
            if (result != null)
            {
                return await GenerateLoginToken(result);
            }

            return null;
        }

        public async Task<bool> ResetPassword(Authentication credentials)
        {
            return await authenticationRepository.ResetPassword(credentials);
        }

        public Task<int> UpdateAsync(Authentication obj)
        {
            throw new NotImplementedException();
        }
    }
}
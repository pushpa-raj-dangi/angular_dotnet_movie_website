using System;

namespace backend.DTOs.Account
{
    public class AuthenticationResponse
    {
        public string Token { get; set; }

        public DateTime Expiration { get; set; }
    }
}
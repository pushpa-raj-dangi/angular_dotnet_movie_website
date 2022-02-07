using System;

namespace backend.DTOs.Actor
{
    public class ActorDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Picture { get; set; }
    }
}
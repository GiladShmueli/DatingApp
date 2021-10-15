using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    //named AppUser so we know it's our class, and not some other similar User class
    public class AppUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
    }
}
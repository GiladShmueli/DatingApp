using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly DataContext _context;
        public BuggyController(DataContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return "secret text";
        }


        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound()
        {
            var thing = _context.Users.Find(-1);
            if (thing == null) return NotFound();
            return Ok(thing);
        }

        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {
            // try
            // {
            //     var thing = _context.Users.Find(-1);
            //     var thingToReturn = thing.ToString();
            //     return thingToReturn; //should not reach here unless there wasn't a server error and thing isn't null
            // }catch(Exception exc)
            // {
            //     return StatusCode(500,"computer says NO!");
            // }
            var thing = _context.Users.Find(-1);
            var thingToReturn = thing.ToString();
            return thingToReturn; //should not reach here unless there wasn't a server error and thing isn't null
        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("this was not a good request!");
        }

    }
}
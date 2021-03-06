using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Mvc;
using Microsoft.Data.Entity;
using IndoorCricket.Models;
using System;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace IndoorCricket.Controllers
{
    [Produces("application/json")]
    [Route("api/Teams")]
    public class TeamsController : Controller
    {
        private ApplicationDbContext _context;

        public TeamsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Teams
        [HttpGet]
        public IEnumerable<Team> GetTeam()
        {
            return _context.Teams
                .Include(p => p.Players);
        }

        // GET: api/Teams/5
        [HttpGet("{id}", Name = "GetTeam")]
        public IActionResult GetTeam([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return HttpBadRequest(ModelState);
            }

            Team team = _context.Teams.Include(t => t.Players).SingleOrDefault(m => m.Id == id);

            if (team == null)
            {
                return HttpNotFound();
            }

            return Ok(team);
        }

        // PUT: api/Teams/5
        [HttpPut("{id}")]
        public IActionResult PutTeam(Guid id, [FromBody] Team team)
        {
            if (!ModelState.IsValid)
            {
                return HttpBadRequest(ModelState);
            }

            if (id != team.Id)
            {
                return HttpBadRequest();
            }

            _context.Entry(team).State = EntityState.Modified;

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeamExists(id))
                {
                    return HttpNotFound();
                }
                else
                {
                    throw;
                }
            }

            return new HttpStatusCodeResult(StatusCodes.Status204NoContent);
        }

        // POST: api/Teams
        [HttpPost]
        public IActionResult PostTeam([FromBody] object team)
        {
            if (!ModelState.IsValid)
            {
                return HttpBadRequest(ModelState);
            }

            JObject obj = JsonConvert.DeserializeObject<JObject>(team.ToString());
            Team newTeam = obj.Root.First.Value<JToken>().First.ToObject<Team>();

            _context.Teams.Add(newTeam);

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (TeamExists(newTeam.Id))
                {
                    return new HttpStatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("GetTeam", new { id = newTeam.Id }, newTeam);
        }

        // DELETE: api/Teams/5
        [HttpDelete("{id}")]
        public IActionResult DeleteTeam(Guid id)
        {
            if (!ModelState.IsValid)
            {
                return HttpBadRequest(ModelState);
            }

            Team team = _context.Teams.Single(m => m.Id == id);
            if (team == null)
            {
                return HttpNotFound();
            }

            _context.Teams.Remove(team);
            _context.SaveChanges();

            return Ok(team);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _context.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TeamExists(Guid id)
        {
            return _context.Teams.Count(e => e.Id == id) > 0;
        }
    }
}
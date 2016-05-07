using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Mvc;
using Microsoft.Data.Entity;
using IndoorCricket.Models;
using System;

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
            return _context.Team;
        }

        // GET: api/Teams/5
        [HttpGet("{id}", Name = "GetTeam")]
        public IActionResult GetTeam([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return HttpBadRequest(ModelState);
            }

            Team team = _context.Team.Single(m => m.Id == id);

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
        public IActionResult PostTeam([FromBody] Team team)
        {
            if (!ModelState.IsValid)
            {
                return HttpBadRequest(ModelState);
            }

            _context.Team.Add(team);
            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (TeamExists(team.Id))
                {
                    return new HttpStatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("GetTeam", new { id = team.Id }, team);
        }

        // DELETE: api/Teams/5
        [HttpDelete("{id}")]
        public IActionResult DeleteTeam(Guid id)
        {
            if (!ModelState.IsValid)
            {
                return HttpBadRequest(ModelState);
            }

            Team team = _context.Team.Single(m => m.Id == id);
            if (team == null)
            {
                return HttpNotFound();
            }

            _context.Team.Remove(team);
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
            return _context.Team.Count(e => e.Id == id) > 0;
        }
    }
}
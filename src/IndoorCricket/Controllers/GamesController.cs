using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Mvc;
using Microsoft.Data.Entity;
using IndoorCricket.Models;

namespace IndoorCricket.Controllers
{
    [Produces("application/json")]
    [Route("api/Games")]
    public class GamesController : Controller
    {
        private ApplicationDbContext _context;

        public GamesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Games
        [HttpGet]
        public IEnumerable<Game> GetGame()
        {
            return _context.Games.Include(x => x.Team);
        }

        // GET: api/Games/5
        [HttpGet("{id}", Name = "GetGame")]
        public IActionResult GetGame([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return HttpBadRequest(ModelState);
            }

            Game game = _context.Games.Include(o => o.Overs).FirstOrDefault(g => g.Id == id);
            //var battingOvers = game.Overs.Where(o => o.Innings == Innings.Batting);

            //var battingScore = battingOvers.SelectMany(bo => bo.Deliveries).Sum(d => d.Shot.Runs);
            //var bowlingScore = game.Overs.Where(o => o.Innings == Innings.Bowling)
            //    .SelectMany(bo => bo.Deliveries).Sum(d => d.Shot.Runs);

            if (game == null)
            {
                return HttpNotFound();
            }

            return Ok(game);
        }

        // PUT: api/Games/5
        [HttpPut("{id}")]
        public IActionResult PutGame(int id, [FromBody] Game game)
        {
            if (!ModelState.IsValid)
            {
                return HttpBadRequest(ModelState);
            }

            if (id != game.Id)
            {
                return HttpBadRequest();
            }

            _context.Entry(game).State = EntityState.Modified;

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GameExists(id))
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

        // POST: api/Games
        [HttpPost]
        public IActionResult PostGame([FromBody] Game game)
        {
            if (!ModelState.IsValid)
            {
                return HttpBadRequest(ModelState);
            }

            _context.Games.Add(game);
            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (GameExists(game.Id))
                {
                    return new HttpStatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("GetGame", new { id = game.Id }, game);
        }

        // DELETE: api/Games/5
        [HttpDelete("{id}")]
        public IActionResult DeleteGame(int id)
        {
            if (!ModelState.IsValid)
            {
                return HttpBadRequest(ModelState);
            }

            Game game = _context.Games.Single(m => m.Id == id);
            if (game == null)
            {
                return HttpNotFound();
            }

            _context.Games.Remove(game);
            _context.SaveChanges();

            return Ok(game);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _context.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool GameExists(int id)
        {
            return _context.Games.Count(e => e.Id == id) > 0;
        }
    }
}
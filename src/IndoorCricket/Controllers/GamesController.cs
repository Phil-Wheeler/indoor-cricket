using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Mvc;
using Microsoft.Data.Entity;
using IndoorCricket.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using IndoorCricket.ViewModels;
using System;

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
        public IActionResult GetGame([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return HttpBadRequest(ModelState);
            }

            Game game = _context.Games
                .Include(o => o.Overs)
                .ThenInclude(d => d.Deliveries)
                .Include(t => t.Team)
                .ThenInclude(p => p.Players)
                .FirstOrDefault(g => g.Id == id);

            if (game == null)
            {
                return HttpNotFound();
            }

            return Ok(game);
        }

        // PUT: api/Games/5
        [HttpPut("{id}")]
        public IActionResult PutGame(Guid id, [FromBody] JObject value)
        {
            //JObject obj = JsonConvert.DeserializeObject<JObject>(game.ToString());
            //Player p = obj.Root.First.First<JToken>().First.ToObject<Player>();
            Game game = value["game"].ToObject<Game>();
            //var overs = obj.Root.First.First.Last.Last.ToObject<IEnumerable<Over>>();
            //Game g = obj.Root.First.Value<JToken>().First.ToObject<Game>();

            if (!ModelState.IsValid)
            {
                return HttpBadRequest(ModelState);
            }

            if (id != game.Id)
            {
                return HttpBadRequest();
            }

            Over latestOver = game.Overs.LastOrDefault(o => o.Deliveries.Any());
            Delivery latestDelivery = latestOver.Deliveries.LastOrDefault();
            //latestDelivery.Batter = p; // assume all deliveries are batting games.

            _context.Update(game);

            try
            {
                //_context.SaveChanges(true);
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
        public IActionResult PostGame([FromBody] object game)
        {

            JObject obj = JsonConvert.DeserializeObject<JObject>(game.ToString());
            Game g = obj.Root.First.Value<JToken>().First.ToObject<Game>();

            if (!ModelState.IsValid)
            {
                return HttpBadRequest(ModelState);
            }

            // Set up the default batting and bowling overs.
            for (int i = 1; i <= 16; i++)
            {
                g.Overs.Add(new Over { Number = i, Innings = Innings.Batting });
            }
            for (int i = 1; i <=16; i++)
            {
                g.Overs.Add(new Over { Number = i, Innings = Innings.Bowling });
            }

            _context.Games.Add(g);
            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (GameExists(g.Id))
                {
                    return new HttpStatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("GetGame", new { id = g.Id }, g);
        }

        // DELETE: api/Games/5
        [HttpDelete("{id}")]
        public IActionResult DeleteGame(Guid id)
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

        private bool GameExists(Guid id)
        {
            return _context.Games.Count(e => e.Id == id) > 0;
        }
    }
}
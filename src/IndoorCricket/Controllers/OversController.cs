using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Mvc;
using Microsoft.Data.Entity;
using IndoorCricket.Models;

namespace IndoorCricket.Controllers
{
    [Produces("application/json")]
    [Route("api/Overs")]
    public class OversController : Controller
    {
        private ApplicationDbContext _context;

        public OversController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Overs
        [HttpGet]
        public IEnumerable<Over> GetOver()
        {
            return _context.Overs;
        }

        // GET: api/Overs/5
        [HttpGet("{id}", Name = "GetOver")]
        public IActionResult GetOver([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return HttpBadRequest(ModelState);
            }

            //Over over = _context.Over.Single(m => m.Id == id);
            IEnumerable<Over> overs = _context.Games.FirstOrDefault(g => g.Id == id).Overs;

            if (overs == null)
            {
                return HttpNotFound();
            }

            return Ok(overs);
        }

        // PUT: api/Overs/5
        [HttpPut("{id}")]
        public IActionResult PutOver(int id, [FromBody] Over over)
        {
            if (!ModelState.IsValid)
            {
                return HttpBadRequest(ModelState);
            }

            if (id != over.Id)
            {
                return HttpBadRequest();
            }

            _context.Entry(over).State = EntityState.Modified;

            try
            {
                //_context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OverExists(id))
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

        // POST: api/Overs
        [HttpPost]
        public IActionResult PostOver([FromBody] Over over)
        {
            if (!ModelState.IsValid)
            {
                return HttpBadRequest(ModelState);
            }

            _context.Overs.Add(over);
            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (OverExists(over.Id))
                {
                    return new HttpStatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("GetOver", new { id = over.Id }, over);
        }

        // DELETE: api/Overs/5
        [HttpDelete("{id}")]
        public IActionResult DeleteOver(int id)
        {
            if (!ModelState.IsValid)
            {
                return HttpBadRequest(ModelState);
            }

            Over over = _context.Overs.Single(m => m.Id == id);
            if (over == null)
            {
                return HttpNotFound();
            }

            _context.Overs.Remove(over);
            _context.SaveChanges();

            return Ok(over);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _context.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OverExists(int id)
        {
            return _context.Overs.Count(e => e.Id == id) > 0;
        }
    }
}
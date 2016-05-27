using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Mvc;
using Microsoft.Data.Entity;
using IndoorCricket.Models;
using System;

namespace IndoorCricket.Controllers
{
    public class ScoreController : Controller
    {
        private ApplicationDbContext _context;

        public ScoreController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index(Guid id)
        {
            var model = _context.Games
                .Include(t => t.Team)
                .Where(g => g.Team.Id == id);

            return View(model);
        }

        public IActionResult Game(int Id)
        {
            var model = _context.Games
                .Include(t => t.Team)
                .Include(o => o.Overs)
                .FirstOrDefault(x => x.Id == Id);

            return View("Game", model);
        }
    }
}
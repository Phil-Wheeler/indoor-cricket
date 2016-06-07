using IndoorCricket.Models;
using System;
using System.Collections.Generic;
using Microsoft.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace IndoorCricket.ViewModels
{
    public class GameVM
    {
        private Game _game { get; set; }
        public IEnumerable<Over> BattingOvers { get; set; }
        public IEnumerable<Over> BowlingOvers { get; set; }
        public string Opposition { get; set; }
        public DateTime Fixture { get; set; }

        public GameVM(Game game)
        {
            _game = game;
            BattingOvers = game.Overs.Where(o => o.Innings == Innings.Batting);
            BowlingOvers = game.Overs.Where(o => o.Innings == Innings.Bowling);
            Opposition = game.Opposition;
            Fixture = game.Date;
        }
    }
}

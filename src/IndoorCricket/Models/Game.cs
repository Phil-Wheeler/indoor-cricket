﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace IndoorCricket.Models
{
    public enum Innings { Batting, Bowling }

    public class Game
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public int Season { get; set; }
        public virtual Team Team { get; set; }
        public string Opposition { get; set; }

        public virtual ICollection<Over> Overs { get; set; }
    }


    public class Over
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public Innings Innings { get; set; }

        //public virtual Game Game { get; set; }
        public virtual ICollection<Delivery> Deliveries { get; set; }
    }

    public class Delivery
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public Stroke Stroke { get; set; }
        public Dismissal Dismissal { get; set; }
        public int Runs { get; set; }

        public virtual Player Bowler { get; set; }
        public virtual Player Batter { get; set; }
    }

    public enum Stroke
    {
        Out = -5,
        Wide = -2,
        Dotball = 0,
        Single = 1,
        Two = 2,
        Three = 3,
        Four = 4,
        Five = 5,
        Seven = 7
    }

    [Flags]
    public enum Dismissal
    {
        Notout = 0,
        Caught = 1,
        Bowled = 2,
        Runout = 4,
        Stumped = 8,
        Mankad = 16,
        LBW = 32
    }
}

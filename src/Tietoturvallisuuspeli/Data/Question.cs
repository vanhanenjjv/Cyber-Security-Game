using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Tietoturvallisuuspeli.Data
{
    public class Question
    {
        [Key]
        [JsonIgnore]
        public int QuestionId { get; set; }

        public string Content { get; set; }

        public Difficulty Difficulty { get; set; }

        public ICollection<Answer> Answers { get; set; } = new List<Answer>();
    }

    public class Answer
    {
        [Key]
        [JsonIgnore]
        public int AnswerId { get; set; }

        public string Content { get; set; }

        public bool IsCorrect { get; set; }

        [JsonIgnore]
        public Question Question { get; set; }
    }

    public enum Difficulty
    {
        Easy = 1,
        Medium = 2,
        Hard = 3
    }
}

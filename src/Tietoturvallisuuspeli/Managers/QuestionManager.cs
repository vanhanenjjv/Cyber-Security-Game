using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tietoturvallisuuspeli.Data;

namespace Tietoturvallisuuspeli.Managers
{
    public class QuestionManager
    {
        private readonly Random random = new Random();

        private readonly QuestionsContext db;

        public QuestionManager(QuestionsContext db)
        {
            this.db = db;
        }

        private IEnumerable<Question> SortQuestions(IList<Question> questions, int amount)
        {
            var resultQuestions = new List<Question>();
            // The amount of questions to each difficulty.
            int amountOfDifficulties = Enum.GetValues(typeof(Difficulty)).Length;
            int sizePerDifficulty = amount / amountOfDifficulties;

            // Foreach difficulty filters random questions and adds them to 'resultQuestions'.
            foreach (Difficulty difficulty in Enum.GetValues(typeof(Difficulty)))
            {
                var questionsFilteredByDifficulty = questions.Where(q => q.Difficulty == difficulty)
                    .ToList();

                var selectedQuestions = new List<Question>();

                // Adds the leftover questions to 'easy difficulty' if the amount of questions to each difficulty doesn't split evenly.
                int size = difficulty == Difficulty.Easy ? sizePerDifficulty + (amount % amountOfDifficulties) : sizePerDifficulty;

                for (int i = 0; i < size; ++i)
                {
                    bool next = false;
                    do
                    {
                        int r = random.Next(0, questionsFilteredByDifficulty.Count);
                        var question = questionsFilteredByDifficulty[r];

                        // Skips the question if it has already been selected.
                        if (selectedQuestions.Contains(question))
                            continue;

                        selectedQuestions.Add(question);
                        next = true;
                    }
                    while (!next);
                }

                resultQuestions.AddRange(selectedQuestions);
            }

            return resultQuestions;
        }

        public async Task<IEnumerable<Question>> GetQuestionsAsync(int amount)
        {
            var questions = await this.db.Questions
                .Include(q => q.Answers)
                .ToListAsync();

            return SortQuestions(questions, amount);
        }

        // public async Task<IEnumerable<Question>> GetQuestionsAsync(int amount, Difficulty difficulty)
        // {
        //     var questions = await this.db.Questions
        //         .Include(q => q.Answers)
        //         .Where(q => q.Difficulty == difficulty)
        //         .ToListAsync();

        //     return FilterRandomQuestions(questions, amount);
        // }
    }
}

using Microsoft.EntityFrameworkCore;

namespace Tietoturvallisuuspeli.Data
{
    public class QuestionsContext : DbContext
    {
        public QuestionsContext(DbContextOptions options) 
            : base(options) { }

        public DbSet<Question> Questions { get; set; }

        public DbSet<Answer> Answers { get; set; }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder
        //        .Entity<Question>()
        //        .Property(q => q.Difficulty)
        //        .HasConversion(
        //            d => d.,
        //            d => )
        //}
    }
}

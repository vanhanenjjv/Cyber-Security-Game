using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Tietoturvallisuuspeli.Data;
using Tietoturvallisuuspeli.Managers;

namespace Tietoturvallisuuspeli.Controllers
{
    [Route("api/[controller]")]
    public class QuestionController : Controller
    {
        private readonly QuestionManager _questions;

        public QuestionController(QuestionManager questions) => _questions = questions;

        [HttpGet("fetch")]
        public async Task<IActionResult> FetchAsync([FromQuery]int amount)
        {
            var questions = await _questions.GetQuestionsAsync(amount);
            
            return new JsonResult(questions);
        }
    }
}

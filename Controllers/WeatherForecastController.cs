using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;


namespace accenture_project.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("Get")]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpGet]
        [Route("GetCountCharacter")]
        public IEnumerable<CharacterCount> CountCharacter(string input)
        {
            if(input.Length>0)
            {
              var convertToLower = input.ToLower();
              var result =  from word in convertToLower
                          group word by word into g
                         select new CharacterCount { Character=g.Key.ToString(), Count = g.Count() };
                         return result.ToArray();  
            }
            else
            {
                return null;
            }
                         
        }

        [HttpGet]
        [Route("GetReverse")]
        public ActionResult GetWordsReversed(string input)
        {
            string reversed = null;
            if(input.Length > 0)
            {
                 reversed = String.Join(" ",input.Split(' ')
                .Select(word => new String( word.Reverse().ToArray()))); 
            }
            return Ok(reversed);
        }

         [HttpGet]
        [Route("GetDuplicate")]
        public ActionResult GetDuplicateInput(string input)
        {
            string finalString = null;
            if(input.Length > 0)
            {
                var punctuation = input.Where(Char.IsPunctuation).Distinct().ToArray();
                var words = input.Split().Select(x => x.Trim(punctuation));
                var uniqueNames = (from c in words select c).Distinct();
                foreach(string s in uniqueNames)
                {
                    finalString += s + ' ';
                }
            }
            return Ok(finalString);
        }
    }
}

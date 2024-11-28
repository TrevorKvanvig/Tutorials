using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace api.Controllers
{
    [Route("api/stock")]
    [ApiController]
    public class StockController : ControllerBase
    {   
        private readonly ApplicationDbContext _context;
        public StockController(ApplicationDbContext context)
        {
            _context = context; // set context passed from program CS as context used in class
        }

        [HttpGet] // when nothing is passed on api/stock return all stocks
        public IActionResult GetAll()
        {
            var stocks = _context.Stocks.ToList();

            return Ok(stocks); // send 200 ok message with the list of stocks
        }

        [HttpGet("{id}")] // when id is passed on api/stock/{id} return stocks with id
        public IActionResult GetById([FromRoute] int id) {
            var stock = _context.Stocks.Find(id);

            if(stock == null){
                return NotFound();
            }

            return Ok(stock);
        }
    }
}
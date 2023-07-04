using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class BasketController : BaseApiController
{
    private readonly StoreContext _context;

    public BasketController(StoreContext context)
    {
        _context = context;
    }

    [HttpGet(Name = "GetBasket")]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
        var basket = await RetrieveBasket(GetBuyerId());

        if (basket == null) return NotFound();

        return basket.MapBasketToDto();
    }

    [HttpPost]
    public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
    {
        var basket = await RetrieveBasket(GetBuyerId());
        
        if (basket == null) basket = CreateBasket();

        var product = await _context.Products.FindAsync(productId);

        if (product == null) return BadRequest(new ProblemDetails { Title = "Product not found" });

        basket.AddItem(product, quantity);

        var result = await _context.SaveChangesAsync() > 0;

        if (result) return CreatedAtRoute("GetBasket", basket.MapBasketToDto());

        return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
    }

    [HttpDelete]
    public async Task<ActionResult> RemoveBasketItem(int productId, int quantity = 1)
    {
        var basket = await RetrieveBasket(GetBuyerId());
        if (basket == null) return NotFound();

        basket.RemoveItem(productId, quantity);

        var result = await _context.SaveChangesAsync() > 0;

        if (result) return CreatedAtRoute("GetBasket", basket.MapBasketToDto());

        return BadRequest(new ProblemDetails { Title = "Problem removing item from basket" });
    }

    private async Task<Basket> RetrieveBasket(string buyerId)
    {
        return await _context.Baskets
            .RetrieveBasketWithItems(buyerId)
            .FirstOrDefaultAsync();
    }

    private string GetBuyerId()
    {
        return User.Identity?.Name ?? Request.Cookies["BuyerId"];
    }

    private Basket CreateBasket()
    {
        var buyerId = User.Identity?.Name;
        if (string.IsNullOrEmpty(buyerId))
        {
            buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("BuyerId", buyerId, cookieOptions);
        }

        var basket = new Basket { BuyerId = buyerId };
        _context.Baskets.Add(basket);
        return basket;
    }
}
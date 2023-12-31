using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data;


public static class DbInitializer
{
    public static async Task Initialize(StoreContext context, UserManager<User> userManager)
    {
        if (!userManager.Users.Any())
        {
            var user = new User
            {
                UserName = "bob",
                Email = "bob@test.com"
            };
            
            await userManager.CreateAsync(user, "Pa$$w0rd");
            await userManager.AddToRoleAsync(user, "Member");
            
            var admin = new User
            {
                UserName = "admin",
                Email = "admin@test.com"
            };
            
            await userManager.CreateAsync(admin, "Pa$$w0rd");
            await userManager.AddToRolesAsync(admin, new []{"Member", "Admin"});
        }
        
        if (context.Products.Any()) return;

        var products = new List<Product>
        {
            new Product
            {
                Name = "Notebook Basic 1",
                Description =
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                Price = 20000,
                PictureUrl = "/assets/products/accessory1.jpg",
                Brand = "NovaLux",
                Type = "Accessory",
                QuantityInStock = 100
            },
            new Product
            {
                Name = "Notebook Basic 2",
                Description = "Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus.",
                Price = 15000,
                PictureUrl = "/assets/products/accessory2.jpg",
                Brand = "NovaLux",
                Type = "Accessory",
                QuantityInStock = 100
            },
            new Product
            {
                Name = "Notebook Basic 3",
                Description =
                    "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                Price = 18000,
                PictureUrl = "/assets/products/accessory3.jpg",
                Brand = "EvoGlam",
                Type = "Accessory",
                QuantityInStock = 100
            },
            new Product
            {
                Name = "Notebook Basic 4",
                Description =
                    "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                Price = 30000,
                PictureUrl = "/assets/products/accessory4.jpg",
                Brand = "ZephyrStyle",
                Type = "Accessory",
                QuantityInStock = 100
            },
            new Product
            {
                Name = "Handbag Basic 1",
                Description =
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                Price = 25000,
                PictureUrl = "/assets/products/bag1.jpg",
                Brand = "DazzleTrend",
                Type = "Bags",
                QuantityInStock = 100
            },
            new Product
            {
                Name = "Handbag Basic 2",
                Description =
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                Price = 12000,
                PictureUrl = "/assets/products/bag2.jpg",
                Brand = "DazzleTrend",
                Type = "Bags",
                QuantityInStock = 100
            },
            new Product
            {
                Name = "Handbag Basic 3",
                Description =
                    "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                Price = 1000,
                PictureUrl = "/assets/products/bag3.jpg",
                Brand = "LuminaLuxe",
                Type = "Bags",
                QuantityInStock = 100
            },
            new Product
            {
                Name = "Handbag Basic 4",
                Description =
                    "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                Price = 8000,
                PictureUrl = "/assets/products/bag4.jpg",
                Brand = "LuminaLuxe",
                Type = "Bags",
                QuantityInStock = 100
            },
            new Product
            {
                Name = "Handbag Basic 5",
                Description =
                    "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                Price = 1500,
                PictureUrl = "/assets/products/bag5.jpg",
                Brand = "SparkleQuest",
                Type = "Bags",
                QuantityInStock = 100
            },
            new Product
            {
                Name = "Bottle Basic 1",
                Description =
                    "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                Price = 1800,
                PictureUrl = "/assets/products/drink1.jpg",
                Brand = "MystiCharm",
                Type = "Drinks",
                QuantityInStock = 100
            },
            new Product
            {
                Name = "Bottle Basic 2",
                Description =
                    "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                Price = 1500,
                PictureUrl = "/assets/products/drink2.jpg",
                Brand = "AquaAura",
                Type = "Drinks",
                QuantityInStock = 100
            },
            new Product
            {
                Name = "Bottle Basic 3",
                Description =
                    "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                Price = 1600,
                PictureUrl = "/assets/products/drink3.jpg",
                Brand = "VividGlow",
                Type = "Drinks",
                QuantityInStock = 100
            },
            new Product
            {
                Name = "Stationary Basic 1",
                Description =
                    "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                Price = 1400,
                PictureUrl = "/assets/products/stationary1.jpg",
                Brand = "EliteGlamour",
                Type = "Stationary",
                QuantityInStock = 100
            },
            new Product
            {
                Name = "Stationary Basic 2",
                Description =
                    "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                Price = 25000,
                PictureUrl = "/assets/products/stationary2.jpg",
                Brand = "EliteGlamour",
                Type = "Stationary",
                QuantityInStock = 100
            },
            new Product
            {
                Name = "Stationary Basic 3",
                Description =
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                Price = 18999,
                PictureUrl = "/assets/products/stationary3.jpg",
                Brand = "VibeVerse",
                Type = "Stationary",
                QuantityInStock = 100
            },
            new Product
            {
                Name = "Stationary Basic 4",
                Description =
                    "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                Price = 19999,
                PictureUrl = "/assets/products/stationary4.jpg",
                Brand = "VibeVerse",
                Type = "Stationary",
                QuantityInStock = 100
            },
            new Product
            {
                Name = "Tee Shirt Basic 1",
                Description = "Aenean nec lorem. In porttitor. Donec laoreet nonummy augue.",
                Price = 15000,
                PictureUrl = "/assets/products/tee1.jpg",
                Brand = "EvoGlam",
                Type = "Cloths",
                QuantityInStock = 100
            },
            new Product
            {
                Name = "Tee Shirt Basic 2",
                Description =
                    "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                Price = 18000,
                PictureUrl = "/assets/products/tee2.jpg",
                Brand = "PrismPeak",
                Type = "Cloths",
                QuantityInStock = 100
            },
            new Product
            {
                Name = "Tee Shirt Basic 3",
                Description =
                    "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                Price = 18000,
                PictureUrl = "/assets/products/tee3.jpg",
                Brand = "EvoGlam",
                Type = "Cloths",
                QuantityInStock = 100
            },
            new Product
            {
                Name = "Tee Shirt Basic 4",
                Description =
                    "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                Price = 18000,
                PictureUrl = "/assets/products/tee4.jpg",
                Brand = "PrismPeak",
                Type = "Cloths",
                QuantityInStock = 100
            },
        };

        foreach (var product in products)
        {
            await context.Products.AddAsync(product);
        }
        
        await context.SaveChangesAsync();
    }
}
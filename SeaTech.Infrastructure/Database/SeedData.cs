using SeaTech.Core.Entities;
using SeaTech.Core.Common.Enums;
using Microsoft.EntityFrameworkCore;

namespace SeaTech.Infrastructure.Database
{
    public class SeedData
    {
        private readonly ModelBuilder _modelBuilder;
        public SeedData(ModelBuilder modelBuilder)
        {
            _modelBuilder = modelBuilder;
        }

        public void Seed()
        {
            //seed Category Data
            _modelBuilder.Entity<Category>()
                .HasData(
                    new Category
                    {
                        Id = 1,
                        Title = "Elektronik",
                        Activity = Activity.Active,
                        ParentCategoryId = null,
                        CreatedDate = DateTime.UtcNow
                    },
                     new Category
                    {
                        Id = 2,
                        Title = "Telefonlar",
                        Activity = Activity.Active,
                        ParentCategoryId = 1,
                        CreatedDate = DateTime.UtcNow
                    },
                     new Category
                     {
                         Id = 3,
                         Title = "Bilgisayarlar",
                         Activity = Activity.Active,
                         ParentCategoryId = 1,
                         CreatedDate = DateTime.UtcNow
                     },
                     new Category
                     {
                         Id = 4,
                         Title = "Diz Üstü",
                         Activity = Activity.Active,
                         ParentCategoryId = 3,
                         CreatedDate = DateTime.UtcNow
                     },
                     new Category
                     {
                         Id = 5,
                         Title = "Masaüstü",
                         Activity = Activity.Active,
                         ParentCategoryId = 3,
                         CreatedDate = DateTime.UtcNow
                     },
                    new Category
                    {
                        Id = 6,
                        Title = "Kitap",
                        Activity = Activity.Active,
                        ParentCategoryId = null,
                        CreatedDate = DateTime.UtcNow
                    },
                    new Category
                    {
                        Id = 7,
                        Title = "Kurgu",
                        Activity = Activity.Active,
                        ParentCategoryId = 6,
                        CreatedDate = DateTime.UtcNow
                    },
                    new Category
                    {
                        Id = 8,
                        Title = "Bilim",
                        Activity = Activity.Active,
                        ParentCategoryId = 7,
                        CreatedDate = DateTime.UtcNow
                    },
                    new Category
                    {
                        Id = 9,
                        Title = "Fizik",
                        Activity = Activity.Active,
                        ParentCategoryId = 8,
                        CreatedDate = DateTime.UtcNow
                    },
                    new Category
                    {
                        Id = 10,
                        Title = "Biyoloji",
                        Activity = Activity.Active,
                        ParentCategoryId = 8,
                        CreatedDate = DateTime.UtcNow
                    }
                );
            //seed product Data
            _modelBuilder.Entity<Product>()
                .HasData(
                    new Product
                    {
                        Id = 1,
                        Title = "Samsung Telefon",
                        Description = "Samsung Telefonlar",
                        Activity = Activity.Active,
                        CategoryId = 2,
                        Price = 10000,
                        CreatedDate = DateTime.UtcNow,
                    },
                    new Product
                    {
                        Id = 2,
                        Title = "Apple Telefon",
                        Description = "Apple Telefonlar",
                        Activity = Activity.Active,
                        CategoryId = 2,
                        Price = 10000,
                        CreatedDate = DateTime.UtcNow,
                    },
                    new Product
                    {
                        Id = 3,
                        Title = "Lenovo Düzüstü",
                        Description = "Lenovo Düzüstü Bilgisayarlar",
                        Activity = Activity.Active,
                        CategoryId = 4,
                        Price = 10000,
                        CreatedDate = DateTime.UtcNow,
                    },
                    new Product
                    {
                        Id = 4,
                        Title = "Casper Düzüstü",
                        Description = "Casper Düzüstü Bilgisayarlar",
                        Activity = Activity.Active,
                        CategoryId = 4,
                        Price = 10000,
                        CreatedDate = DateTime.UtcNow,
                    },
                    new Product
                    {
                        Id = 5,
                        Title = "Steel Series Masaüstü",
                        Description = "Steel Series Masaüstüü Bilgisayarlar",
                        Activity = Activity.Active,
                        CategoryId = 5,
                        Price = 10000,
                        CreatedDate = DateTime.UtcNow,
                    },
                    new Product
                    {
                        Id = 6,
                        Title = "Aenenas",
                        Description = "Vergilius",
                        Activity = Activity.Active,
                        CategoryId = 7,
                        Price = 35,
                        CreatedDate = DateTime.UtcNow,
                    },
                    new Product
                    {
                        Id = 7,
                        Title = "Ulysses",
                        Description = "James Joyce",
                        Activity = Activity.Active,
                        CategoryId = 7,
                        Price = 35,
                        CreatedDate = DateTime.UtcNow,
                    },
                    new Product
                    {
                        Id = 8,
                        Title = "Temel Parçacık Fiziği",
                        Description = "David Griffiths",
                        Activity = Activity.Active,
                        CategoryId = 9,
                        Price = 35,
                        CreatedDate = DateTime.UtcNow,
                    },
                    new Product
                    {
                        Id = 9,
                        Title = "Görelelik",
                        Description = "Albert Einstein",
                        Activity = Activity.Active,
                        CategoryId = 9,
                        Price = 35,
                        CreatedDate = DateTime.UtcNow,
                    },
                    new Product
                    {
                        Id = 10,
                        Title = "Kozmik Manzara",
                        Description = "Leonard Suskind",
                        Activity = Activity.Active,
                        CategoryId = 9,
                        Price = 35,
                        CreatedDate = DateTime.UtcNow,
                    },
                    new Product
                    {
                        Id = 11,
                        Title = "Türlerin Kökeni Üzerine",
                        Description = "Charles Darwin",
                        Activity = Activity.Active,
                        CategoryId = 10,
                        Price = 35,
                        CreatedDate = DateTime.UtcNow,
                    },
                    new Product
                    {
                        Id = 12,
                        Title = "İçimizdeki Balık",
                        Description = "Neil Shubin",
                        Activity = Activity.Active,
                        CategoryId = 10,
                        Price = 35,
                        CreatedDate = DateTime.UtcNow,
                    }
                );
        }
    }
}

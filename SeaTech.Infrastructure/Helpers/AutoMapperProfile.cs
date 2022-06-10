using SeaTech.Core.Entities;
using SeaTech.Infrastructure.Models.CategoryModels;
using SeaTech.Infrastructure.Models.ProductModels;
using AutoMapper;

namespace SeaTech.Infrastructure.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            //Category mapper profiles
            CreateMap<Category, CategoryResponse>();
            CreateMap<CategoryUpdateRequest, Category>();
            CreateMap<CategoryCreateRequest, Category>();
            //Product mapper profiles
            CreateMap<Product, ProductResponse>();
            CreateMap<ProductUpdateRequest, Product>();
            CreateMap<ProductCreateRequest, Product>();

        }
    }
}

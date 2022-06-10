using SeaTech.Infrastructure.Models.ProductModels;

namespace SeaTech.Infrastructure.Services.ProductService
{
    public interface IProductService
    {
        IEnumerable<ProductResponse> GetAll(ProductQuery pagedProducts);
        ProductResponse GetById(int id);
        ProductResponse Create(ProductCreateRequest product);
        ProductResponse Update(int id, ProductUpdateRequest product);
        void Delete(int id);
    }
}

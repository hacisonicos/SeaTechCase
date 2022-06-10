using SeaTech.Infrastructure.Models.CategoryModels;

namespace SeaTech.Infrastructure.Services.CategoryService
{
    public interface ICategoryService
    {
        IEnumerable<CategoryResponse> GetAll();
        CategoryResponse GetById(int id);
        CategoryResponse Create(CategoryCreateRequest category);
        CategoryResponse Update(int id, CategoryUpdateRequest category);
        void Delete(int id);
    }
}

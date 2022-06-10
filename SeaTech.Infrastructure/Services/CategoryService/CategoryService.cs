using SeaTech.Core.Entities;
using SeaTech.Core.Common.Enums;
using SeaTech.Infrastructure.Models.CategoryModels;
using SeaTech.Infrastructure.Database;
using AutoMapper;

namespace SeaTech.Infrastructure.Services.CategoryService
{
    public class CategoryService : ICategoryService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public CategoryService(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<CategoryResponse> GetAll()
        {
            var categories = _context.Categories;
            return _mapper.Map<IList<CategoryResponse>>(categories);
        }

        public CategoryResponse GetById(int id)
        {
            var category = _context.Categories.FirstOrDefault(x => x.Id == id);
            if(category == null) throw new KeyNotFoundException("Kategori bulunamadı!");
            return _mapper.Map<CategoryResponse>(category);
        }

        public CategoryResponse Create(CategoryCreateRequest model)
        {
            //map model to new account object
            var category = _mapper.Map<Category>(model);
            category.CreatedDate = DateTime.Now;
            category.Activity = Activity.Active;
            //save category
            _context.Categories.Add(category);
            _context.SaveChanges();

            return _mapper.Map<CategoryResponse>(category);
            
        }
        public CategoryResponse Update(int id, CategoryUpdateRequest model)
        {
            var category = _context.Categories.Find(id);
            if(category == null) throw new KeyNotFoundException("Kategori bulunamadı!");
            //copy model to account and save
            _mapper.Map(model, category);
            category.UpdatedDate = DateTime.Now;
            _context.Categories.Update(category);
            _context.SaveChanges();

            return _mapper.Map<CategoryResponse>(category);
        }
        public void Delete(int id)
        {
            var category = _context.Categories.FirstOrDefault(x => x.Id == id);
            var categoryProducts = _context.Products.Where(x => x.CategoryId == id);
            if (category == null) throw new KeyNotFoundException("Kategori bulunamadı!");
            //Delete category
            _context.Categories.Remove(category);
            //Delete products that belongs to this category
            _context.Products.RemoveRange(categoryProducts);
            _context.SaveChanges();
            DeleteSubCategories(id);
        }

        /*Delete sub categories and their products recursively. Hopefully the number of categories will not
            be large enough to slow this down drastically.
         */
        private void DeleteSubCategories(int id)
        {
            var subCategories = _context.Categories.Where(x => x.ParentCategoryId == id).ToList();
            if (subCategories == null) return;
            else
            {
                foreach(var sub in subCategories)
                {
                    var subcategoryProducts = _context.Products.Where(x => x.CategoryId == sub.Id).ToList();
                    _context.Categories.Remove(sub);
                    _context.Products.RemoveRange(subcategoryProducts);
                    _context.SaveChanges();
                    DeleteSubCategories(sub.Id);
                }
            }
        }
    }
}

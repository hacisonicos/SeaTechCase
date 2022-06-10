using SeaTech.Core.Entities;
using SeaTech.Core.Common.Enums;
using SeaTech.Infrastructure.Models.ProductModels;
using SeaTech.Infrastructure.Database;
using AutoMapper;

namespace SeaTech.Infrastructure.Services.ProductService
{
    public class ProductService : IProductService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ProductService(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<ProductResponse> GetAll(ProductQuery productQuery)
        {
            //without any category selected
            if (productQuery.CategoryId == null)
            {
                //search without any category selected
                if (!String.IsNullOrEmpty(productQuery.searchString))
                {
                    var products = _context.Products
                        .Where(x => x.Title!.Contains(productQuery.searchString))
                        .Skip((productQuery.PageNumber - 1) * productQuery.PageSize)
                        .Take(productQuery.PageSize)
                    .ToList();
                    return _mapper.Map<IList<ProductResponse>>(products);
                }
                else
                {
                    var products = _context.Products
                        .Skip((productQuery.PageNumber - 1) * productQuery.PageSize)
                        .Take(productQuery.PageSize)
                        .ToList();
                    return _mapper.Map<IList<ProductResponse>>(products);

                }

            }
            //selected a category
            else
            {
                List<int> categoryList = getCategories(productQuery.CategoryId ?? default);
                //search inside categories
                if (!String.IsNullOrEmpty(productQuery.searchString))
                {
                    var products = _context.Products
                        .Where(x => categoryList.Contains(x.CategoryId) && x.Title!.Contains(productQuery.searchString))
                        .Skip((productQuery.PageNumber - 1) * productQuery.PageSize)
                        .Take(productQuery.PageSize)
                        .ToList();
                    return _mapper.Map<IList<ProductResponse>>(products);
                }
                else
                {
                    var products = _context.Products
                        .Where(x => categoryList.Contains(x.CategoryId))
                        .Skip((productQuery.PageNumber - 1) * productQuery.PageSize)
                        .Take(productQuery.PageSize)
                        .ToList();
                    return _mapper.Map<IList<ProductResponse>>(products);
                }
            }
        }
        public ProductResponse GetById(int id)
        {
            var product = _context.Products.FirstOrDefault(x => x.Id == id);
            if (product == null) throw new KeyNotFoundException("Ürün bulunamadı!");
            return _mapper.Map<ProductResponse>(product);
        }
        public ProductResponse Create(ProductCreateRequest model)
        {
            //map model to new account object
            var product = _mapper.Map<Product>(model);
            product.CreatedDate = DateTime.Now;
            product.Activity = Activity.Active;
            //save product
            _context.Products.Add(product);
            _context.SaveChanges();

            return _mapper.Map<ProductResponse>(product);

        }
        public ProductResponse Update(int id, ProductUpdateRequest model)
        {
            var product = _context.Products.Find(id);
            if (product == null) throw new KeyNotFoundException("Ürün bulunamadı!");
            //copy model to account and save
            _mapper.Map(model, product);
            product.UpdatedDate = DateTime.Now;

            _context.Products.Update(product);
            _context.SaveChanges();

            return _mapper.Map<ProductResponse>(product);
        }
        public void Delete(int id)
        {
            var product = _context.Products.FirstOrDefault(x => x.Id == id);
            if (product == null) throw new KeyNotFoundException("Ürün bulunamadı!");
            _context.Products.Remove(product);
            _context.SaveChanges();
        }

        private List<int> getCategories(int id)
        {
            List<int> categoryList = new();
            categoryList.Add(id);
            var categories = _context.Categories.Where(x => x.ParentCategoryId == id).ToList();

            if (categories == null) return categoryList;
            foreach(var category in categories)
            {
                
                var subCategories = _context.Categories.Where(x => x.ParentCategoryId == category.Id);
                if (subCategories == null) categoryList.Add(category.Id);
                else
                {
                    var subCategoryList = getCategories(category.Id);
                    categoryList.AddRange(subCategoryList);
                }
            }

            return categoryList;
        }
    }
}

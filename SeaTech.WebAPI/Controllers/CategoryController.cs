using SeaTech.Infrastructure.Models.CategoryModels;
using SeaTech.Infrastructure.Services.CategoryService;
using Microsoft.AspNetCore.Mvc;

namespace SeaTech.WebAPI.Controllers
{
    [Controller]
    [Route("api/[controller]")]
    public class CategoryController : Controller
    {
        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }
        [HttpGet]

        public ActionResult<IEnumerable<CategoryResponse>> GetAll()
        {
            var categories = _categoryService.GetAll();
            return Ok(categories);
        }


        [HttpGet("{id:int}")]
        public ActionResult<CategoryResponse> GetById(int id)
        {
            var category = _categoryService.GetById(id);
            return Ok(category);
        }

        [HttpPost]
        public ActionResult<CategoryResponse> Create(CategoryCreateRequest model)
        {
            var category = _categoryService.Create(model);
            return Ok(category);
        }
        [HttpPut("{id:int}")]
        public ActionResult<CategoryResponse> Update(int id, CategoryUpdateRequest model)
        {
            var category = _categoryService.Update(id, model);
            return Ok(category);
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            _categoryService.Delete(id);
            return Ok(new { message = "Kategori silindi!" });
        }
    }
}

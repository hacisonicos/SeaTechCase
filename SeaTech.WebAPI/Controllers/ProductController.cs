using SeaTech.Infrastructure.Models.ProductModels;
using SeaTech.Infrastructure.Services.ProductService;
using Microsoft.AspNetCore.Mvc;

namespace SeaTech.WebAPI.Controllers
{
    [Controller]
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<ProductResponse>> GetAll([FromQuery] ProductQuery pagedProducts)
        {
            var products = _productService.GetAll(pagedProducts);
            return Ok(products);
        }
        [HttpGet("{id:int}")]
        public ActionResult<ProductResponse> GetById(int id)
        {
            var product = _productService.GetById(id);
            return Ok(product);
        }
        [HttpPost]
        public ActionResult<ProductResponse> Create(ProductCreateRequest model)
        {
            var product = _productService.Create(model);
            return Ok(product);
        }
        [HttpPut("{id:int}")]
        public ActionResult<ProductResponse> Update(int id, ProductUpdateRequest model)
        {
            var product = _productService.Update(id, model);
            return Ok(product);
        }
        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            _productService.Delete(id);
            return Ok(new { message = "Ürün silindi!" });
        }
    }
}

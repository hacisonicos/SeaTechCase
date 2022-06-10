using System.ComponentModel.DataAnnotations;

namespace SeaTech.Infrastructure.Models.ProductModels
{
    public class ProductCreateRequest
    {
        [Required]
        public string? Title { get; set; }
        public string? Description { get; set; }
        [DataType(DataType.Currency)]
        public int? Price { get; set; }
        [Required]
        public int CategoryId { get; set; }
    }
}

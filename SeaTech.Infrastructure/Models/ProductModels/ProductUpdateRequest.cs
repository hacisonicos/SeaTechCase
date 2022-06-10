using SeaTech.Infrastructure.Models.Common.Enums;
using System.ComponentModel.DataAnnotations;

namespace SeaTech.Infrastructure.Models.ProductModels
{
    public class ProductUpdateRequest
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public int? Price { get; set; }
        public int CategoryId { get; set; }

        public Activity Activity { get; set; }
    }
}

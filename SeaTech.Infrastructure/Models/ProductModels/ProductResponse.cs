using SeaTech.Infrastructure.Models.Common;
using System.ComponentModel.DataAnnotations;

namespace SeaTech.Infrastructure.Models.ProductModels
{
    public class ProductResponse : BaseModel
    {
        public string? Description { get; set; }
        [DataType(DataType.Currency)]
        public int? Price { get; set; }
        public int CategoryId { get; set; }
    }
}

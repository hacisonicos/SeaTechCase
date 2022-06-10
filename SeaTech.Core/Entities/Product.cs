using SeaTech.Core.Common;

namespace SeaTech.Core.Entities
{
    public class Product : BaseEntity
    {
        public string? Description { get; set; }
        public int? Price { get; set; }
        public int CategoryId { get; set; }
    }
}

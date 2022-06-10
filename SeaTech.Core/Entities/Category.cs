using SeaTech.Core.Common;

namespace SeaTech.Core.Entities
{
    public class Category : BaseEntity
    {
        public int? ParentCategoryId { get; set; }
    }
}

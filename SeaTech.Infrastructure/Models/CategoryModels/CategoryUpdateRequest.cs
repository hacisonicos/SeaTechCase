using SeaTech.Infrastructure.Models.Common.Enums;
using System.ComponentModel.DataAnnotations;

namespace SeaTech.Infrastructure.Models.CategoryModels
{
    public class CategoryUpdateRequest
    {
        public string Title { get; set; } = string.Empty;
        public int? ParentCategoryId { get; set; }
        public Activity Activity { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace SeaTech.Infrastructure.Models.CategoryModels
{
    public class CategoryCreateRequest
    {
        [Required]
        public string Title { get; set; } = string.Empty;
        public int? ParentCategoryId { get; set; }

    }
}

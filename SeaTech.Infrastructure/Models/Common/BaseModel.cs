using SeaTech.Infrastructure.Models.Common.Enums;

namespace SeaTech.Infrastructure.Models.Common
{
    public class BaseModel
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedDate { get; set; } = DateTime.UtcNow;

        public Activity Activity { get; set; } = Activity.Active;
    }
}

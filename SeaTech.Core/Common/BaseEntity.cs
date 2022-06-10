using SeaTech.Core.Common.Enums;

namespace SeaTech.Core.Common
{
    public class BaseEntity
    {
        public int Id { get; set; }
        public string Title { get; set; } 
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public Activity Activity { get; set; }
    }
}

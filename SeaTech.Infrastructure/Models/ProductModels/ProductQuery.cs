namespace SeaTech.Infrastructure.Models.ProductModels
{
    public class ProductQuery
    {
        const int maxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 10;
        public int PageSize
        {
            get
            {
                return _pageSize;
            }
            set
            {
                _pageSize = (value > maxPageSize) ? maxPageSize : value;
            }
        }
        public int? CategoryId { get; set; } = null; 
        public string? searchString { get; set; } = string.Empty;
    }
}

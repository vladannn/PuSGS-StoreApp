using StoreApp.DTOs;

namespace StoreApp.Services.Interfaces
{
    public interface IBuyerService
    {
        List<ProductDTO> GetProducts(int id);
        ProductDTO GetProduct(int id, int userId);
    }
}

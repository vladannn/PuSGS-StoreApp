using StoreApp.Models;

namespace StoreApp.Repository.Interfaces
{
    public interface IProductRepository
    {
        Article AddArticle(Article newArticle);
        List<Article> GetAllArticles(int id);
        void DeleteArticle(Article article);
        Article FindArticle(int id);
        Article Update(Article article);
    }
}

using StoreApp.Data;
using StoreApp.Models;
using StoreApp.Repository.Interfaces;

namespace StoreApp.Repository
{
    public class ProductRepository : IProductRepository
    {
        private AppDbContext _context;

        public ProductRepository(AppDbContext appDbContext)
        {
            _context = appDbContext;
        }
        public Article AddArticle(Article newArticle)
        {
            _context.Articles?.Add(newArticle);
            _context.SaveChanges();
            return newArticle;
        }

        public void DeleteArticle(Article article)
        {
            _context.Articles.Remove(article);
            _context.SaveChanges();
        }

        public Article FindArticle(int id)
        {
            return _context.Articles?.SingleOrDefault<Article>(a => String.Equals(a.Id, id)); 
        }

        public List<Article> GetAllArticles(int id)
        {
            return _context.Articles.Where(a => a.SellerId == id).ToList();
        }

        public List<Article> GetArticles()
        {
            return _context.Articles.ToList();
        }

        public Article Update(Article article)
        {
            _context.Articles?.Update(article);
            _context.SaveChanges();
            return article;
        }
    }
}

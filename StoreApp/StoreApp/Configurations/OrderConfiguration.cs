using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using StoreApp.Models;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using StoreApp.Enums;

namespace StoreApp.Configurations
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.DeliveryAddress).IsRequired();
            builder.Property(x => x.OrderTime).IsRequired();
            builder.Property(x => x.OrderPrice).IsRequired();
            builder.Property(x => x.SumPrice).IsRequired();
            builder.Property(x => x.DeliveryTime).IsRequired();
            builder.Property(x => x.BuyerId).IsRequired();
            builder.Property(x => x.OrderStatus).HasConversion(new EnumToStringConverter<OrderStatus>()).IsRequired();

            builder.HasMany(x => x.OrderItems)
                   .WithOne(x => x.Order)
                   .HasForeignKey(x => x.OrderId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

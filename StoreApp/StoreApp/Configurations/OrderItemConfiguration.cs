﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StoreApp.Models;

namespace StoreApp.Configurations
{
    public class OrderItemConfiguration: IEntityTypeConfiguration<OrderItem>
    {
        public void Configure(EntityTypeBuilder<OrderItem> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(x => x.Order).WithMany(x => x.OrderItems).HasForeignKey(x => x.OrderId).OnDelete(DeleteBehavior.Cascade);
            builder.Property(x => x.ArticleId).IsRequired();
            builder.Property(x => x.Name).IsRequired();
            builder.Property(x => x.Price).IsRequired();
            builder.Property(x => x.Amount).IsRequired();
        }
    }
}

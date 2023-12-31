﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using StoreApp.Data;

#nullable disable

namespace StoreApp.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20230812103339_Migration13")]
    partial class Migration13
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.20")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("StoreApp.Models.Article", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("Amount")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("Image")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.Property<int>("SellerId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Articles");
                });

            modelBuilder.Entity("StoreApp.Models.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("BuyerId")
                        .HasColumnType("int");

                    b.Property<string>("Comment")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DeliveryAddress")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DeliveryTime")
                        .HasColumnType("datetime2");

                    b.Property<double>("OrderPrice")
                        .HasColumnType("float");

                    b.Property<string>("OrderStatus")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("OrderTime")
                        .HasColumnType("datetime2");

                    b.Property<double>("SumPrice")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("StoreApp.Models.OrderItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("Amount")
                        .HasColumnType("int");

                    b.Property<int>("ArticleId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("OrderId")
                        .HasColumnType("int");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("OrderId");

                    b.ToTable("OrderItems");
                });

            modelBuilder.Entity("StoreApp.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Birthday")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TypeOfUser")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("UserImage")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("VerificationStatus")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.HasIndex("Username")
                        .IsUnique();

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Address = "Danila Kisa 7",
                            Birthday = new DateTime(2000, 6, 2, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "vladanjovanovic678@gmail.com",
                            FullName = "Vladan Jovanovic",
                            Password = "$2a$11$vTgjkmQ4avMY5P/.eAyozOz2nAPjMU7G/1DXgptCNiWbKq95YoVH.",
                            TypeOfUser = "Administrator",
                            Username = "vladann",
                            VerificationStatus = "Accepted"
                        },
                        new
                        {
                            Id = 2,
                            Address = "Wonderland 8",
                            Birthday = new DateTime(1989, 12, 13, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "zec1@gmail.com",
                            FullName = "Zec Zekic",
                            Password = "$2a$11$OS5AY5FXQ8g9S4mBB/A4hOlHEW3d0ldhGzyucloztDAdCMaSDQuQa",
                            TypeOfUser = "Seller",
                            Username = "zec",
                            VerificationStatus = "Waiting"
                        },
                        new
                        {
                            Id = 3,
                            Address = "Sime Perica 16",
                            Birthday = new DateTime(2002, 2, 25, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "vladanj23@yahoo.com",
                            FullName = "Andrej Mehic",
                            Password = "$2a$11$RUzIdkCBQX1fTza87hQsJu0kvVDUAwJFjad2h3dSh0psHjIzIzXtq",
                            TypeOfUser = "Seller",
                            Username = "andrej234",
                            VerificationStatus = "Accepted"
                        },
                        new
                        {
                            Id = 4,
                            Address = "Okrugiceva 13",
                            Birthday = new DateTime(1999, 3, 23, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "slavicaa@gmail.com",
                            FullName = "Slavica Slavisic",
                            Password = "$2a$11$NJmUS5H3.EtkmzJNzY05YejSdxI9Q8LDecJLUG7jUKQZcgR9rZxZC",
                            TypeOfUser = "Buyer",
                            Username = "slavicaxD",
                            VerificationStatus = "Accepted"
                        });
                });

            modelBuilder.Entity("StoreApp.Models.OrderItem", b =>
                {
                    b.HasOne("StoreApp.Models.Order", "Order")
                        .WithMany("OrderItems")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Order");
                });

            modelBuilder.Entity("StoreApp.Models.Order", b =>
                {
                    b.Navigation("OrderItems");
                });
#pragma warning restore 612, 618
        }
    }
}

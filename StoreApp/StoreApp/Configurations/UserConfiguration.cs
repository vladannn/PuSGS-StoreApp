using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using StoreApp.Models;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using StoreApp.Enums;

namespace StoreApp.Configurations
{
    public class UserConfiguration: IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Username).IsRequired();
            builder.HasIndex(x => x.Username).IsUnique();
            builder.Property(x => x.Password).IsRequired();
            builder.Property(x => x.Email).IsRequired();
            builder.HasIndex(x => x.Email).IsUnique();
            builder.Property(x => x.FullName).IsRequired();
            builder.Property(x => x.Birthday).IsRequired();
            builder.Property(x => x.Address).IsRequired();
            builder.Property(x => x.TypeOfUser).HasConversion(new EnumToStringConverter<UserType>()).IsRequired();
            builder.Property(x => x.VerificationStatus).HasConversion(new EnumToStringConverter<VerificationStatus>()).IsRequired();

            builder.HasData(new User
            {
                Id = 1,
                Username = "vladann",
                Email = "vladanjovanovic678@gmail.com",
                FullName = "Vladan Jovanovic",
                Password = BCrypt.Net.BCrypt.HashPassword("vladan"),
                Address = "Danila Kisa 7",
                TypeOfUser = UserType.Administrator,
                Birthday = new DateTime(2000, 06, 02)
            },
            new User
            {
                Id = 2,
                Username = "zec",
                Email = "zec1@gmail.com",
                FullName = "Zec Zekic",
                Password = BCrypt.Net.BCrypt.HashPassword("zekano"),
                Address = "Wonderland 8",
                TypeOfUser = UserType.Seller,
                Birthday = new DateTime(1989, 12, 13),
                VerificationStatus = VerificationStatus.Waiting,
            },
            new User
            {
                Id = 3,
                Username = "andrej234",
                Email = "vladanj23@yahoo.com",
                FullName = "Andrej Mehic",
                Password = BCrypt.Net.BCrypt.HashPassword("andrej"),
                Address = "Sime Perica 16",
                TypeOfUser = UserType.Seller,
                Birthday = new DateTime(2002, 02, 25)
            },
            new User
            {
                Id = 4,
                Username = "slavicaxD",
                Email = "slavicaa@gmail.com",
                FullName = "Slavica Slavisic",
                Password = BCrypt.Net.BCrypt.HashPassword("slavica"),
                Address = "Okrugiceva 13",
                TypeOfUser = UserType.Buyer,
                Birthday = new DateTime(1999, 03, 23)
            });
        }


    }
}

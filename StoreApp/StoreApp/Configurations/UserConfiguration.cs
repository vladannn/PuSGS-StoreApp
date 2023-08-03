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
        }
    }
}

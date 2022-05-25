using System;
using Core.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.OwnsOne(o => o.ShipToAddress, a => 
            {
                a.WithOwner();
                a.Property(f => f.FirstName).IsRequired();
                a.Property(l => l.LastName).IsRequired();
                a.Property(s => s.Street).IsRequired();
                a.Property(c => c.City).IsRequired();
                a.Property(s => s.State).IsRequired();
                a.Property(z => z.ZipCode).IsRequired();
            });
            builder.Property(s => s.Status)
            .HasConversion(
                o => o.ToString(),
                o => (OrderStatus) Enum.Parse(typeof(OrderStatus), o)
            );
            builder.HasMany(o => o.OrderItems).WithOne().OnDelete(DeleteBehavior.Cascade);
        }
    }
}
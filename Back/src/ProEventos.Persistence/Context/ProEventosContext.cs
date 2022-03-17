using Microsoft.EntityFrameworkCore;
using ProEventos.Domain.Models;

namespace ProEventos.Persistence.Context
{
    public class ProEventosContext : DbContext
    {
        public ProEventosContext(DbContextOptions<ProEventosContext> options) : base(options) { }
        public DbSet<Evento> Eventos { get; set; }
        public DbSet<Lote> Lotes { get; set; }
        public DbSet<Palestrante> Palestrantes { get; set; }
        public DbSet<PalestranteEvento> PalestrantesEventos { get; set; }
        public DbSet<RedeSocial> RedesSociais { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PalestranteEvento>()
                 .HasKey(PE => new { PE.EventoId, PE.PalestranteId });

            modelBuilder.Entity<Evento>()
                        .HasMany(evento => evento.RedesSociais)
                        .WithOne(rS => rS.Evento)
                        .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Palestrante>()
                        .HasMany(pales => pales.RedesSociais)
                        .WithOne(rS => rS.Palestrante)
                        .OnDelete(DeleteBehavior.Cascade);
        }

    }
}
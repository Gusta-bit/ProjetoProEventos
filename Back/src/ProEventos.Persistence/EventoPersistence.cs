using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProEventos.Domain.Models;
using ProEventos.Persistence.Context;
using ProEventos.Persistence.Contract;

namespace ProEventos.Persistence
{
    public class EventoPersistence : IEventoPersistence
    {
        private readonly ProEventosContext _context;
        public EventoPersistence(ProEventosContext context)
        {
            _context = context;
        }
        public async Task<Evento[]> GetAllEventosAsync(bool includePalestrantes = false)
        {
            IQueryable<Evento> query = _context.Eventos
                 .Include(evento => evento.Lotes)
                 .Include(evento => evento.RedesSociais);

            if (includePalestrantes)
            {
                query = query.Include(evento => evento.PalestrantesEventos)
                             .ThenInclude(pe => pe.Palestrante);
            }
            query = query.AsNoTracking().OrderBy(evento => evento.Id);

            return await query.ToArrayAsync();
        }
        public async Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false)
        {
            IQueryable<Evento> query = _context.Eventos
                .Include(evento => evento.Lotes)
                .Include(evento => evento.RedesSociais);

            if (includePalestrantes)
            {
                query = query.Include(evento => evento.PalestrantesEventos)
                             .ThenInclude(pe => pe.Palestrante);
            }
            query = query.AsNoTracking().OrderBy(evento => evento.Id)
                         .Where(evento => evento.Tema.ToLower().Contains(tema.ToLower()));

            return await query.ToArrayAsync();
        }
        public async Task<Evento> GetEventoByIdAsync(int eventoId, bool includePalestrantes = false)
        {
            IQueryable<Evento> query = _context.Eventos
                            .Include(evento => evento.Lotes)
                            .Include(evento => evento.RedesSociais);

            if (includePalestrantes)
            {
                query = query.Include(evento => evento.PalestrantesEventos)
                             .ThenInclude(pe => pe.Palestrante);
            }
            query = query.AsNoTracking().OrderBy(evento => evento.Id)
                         .Where(evento => evento.Id == eventoId);

            return await query.FirstOrDefaultAsync();
        }

    }
}
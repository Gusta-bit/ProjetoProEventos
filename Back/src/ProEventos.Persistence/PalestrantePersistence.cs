using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProEventos.Domain.Models;
using ProEventos.Persistence.Context;
using ProEventos.Persistence.Contract;

namespace ProEventos.Persistence
{
    public class PalestrantePersistence : IPalestrantePersistence
    {
        private readonly ProEventosContext _context;
        public PalestrantePersistence(ProEventosContext context)
        {
            _context = context;
        }

        public async Task<Palestrante[]> GetAllPalestrantesAsync(bool includeEventos = false)
        {
            IQueryable<Palestrante> query = _context.Palestrantes
                                  .Include(pales => pales.RedesSociais);

            if (includeEventos)
            {
                query = query.Include(pales => pales.PalestrantesEventos)
                             .ThenInclude(pe => pe.Evento);
            }
            query = query.AsNoTracking().OrderBy(pales => pales.Id);

            return await query.ToArrayAsync();
        }
        public async Task<Palestrante[]> GetAllPalestrantesByNomeAsync(string nome, bool includeEventos = false)
        {
            IQueryable<Palestrante> query = _context.Palestrantes
                               .Include(pales => pales.RedesSociais);

            if (includeEventos)
            {
                query = query.Include(pales => pales.PalestrantesEventos)
                             .ThenInclude(pe => pe.Evento);
            }
            query = query.AsNoTracking().OrderBy(pales => pales.Id).Where(pales => pales.Nome.ToLower().Contains(nome.ToLower()));

            return await query.ToArrayAsync();
        }
        public async Task<Palestrante> GetPalestranteByIdAsync(int palestranteId, bool includeEventos = false)
        {
            IQueryable<Palestrante> query = _context.Palestrantes
                               .Include(pales => pales.RedesSociais);

            if (includeEventos)
            {
                query = query.Include(pales => pales.PalestrantesEventos)
                             .ThenInclude(pe => pe.Evento);
            }
            query = query.AsNoTracking().OrderBy(pales => pales.Id).Where(pales => pales.Id == palestranteId);

            return await query.FirstOrDefaultAsync();
        }

    }
}
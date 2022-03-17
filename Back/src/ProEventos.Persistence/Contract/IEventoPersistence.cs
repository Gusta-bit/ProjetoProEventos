using System.Threading.Tasks;
using ProEventos.Domain.Models;

namespace ProEventos.Persistence.Contract
{
    public interface IEventoPersistence
    {
        Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false);
        Task<Evento[]> GetAllEventosAsync(bool includePalestrantes = false);
        Task<Evento> GetEventoByIdAsync(int eventoId, bool includePalestrantes = false);
    }
}
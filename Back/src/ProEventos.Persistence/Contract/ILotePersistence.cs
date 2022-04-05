using System.Threading.Tasks;
using ProEventos.Domain.Models;

namespace ProEventos.Persistence.Contract
{
    public interface ILotePersistence
    {
        Task<Lote[]> GetLotesByEventoIdAsync(int eventoId);
        Task<Lote> GetLoteByIdsAsync(int eventoId, int id);
    }
}
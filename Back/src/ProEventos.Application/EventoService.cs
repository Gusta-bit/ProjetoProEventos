using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProEventos.Application.Contratos;
using ProEventos.Domain.Models;
using ProEventos.Persistence.Contract;

namespace ProEventos.Application
{
    public class EventoService : IEventoService
    {
        private readonly IGeralPersistence _geralPersit;
        private readonly IEventoPersistence _eventoPersit;
        public EventoService(IGeralPersistence geralPersit, IEventoPersistence eventoPersit)
        {
            _eventoPersit = eventoPersit;
            _geralPersit = geralPersit;

        }
        public async Task<Evento> AddEvento(Evento model)
        {
            try
            {
                _geralPersit.Add<Evento>(model);
                if (await _geralPersit.SaveChangesAsync())
                    return await _eventoPersit.GetEventoByIdAsync(model.Id, false);

                return null;

            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        public async Task<Evento> UpdateEvento(int eventoId, Evento model)
        {
            try
            {
                var evento = await _eventoPersit.GetEventoByIdAsync(eventoId, false);
                if (evento == null) return null;

                model.Id = evento.Id;

                _geralPersit.Update(model);
                if (await _geralPersit.SaveChangesAsync())
                    return await _eventoPersit.GetEventoByIdAsync(model.Id, false);

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<bool> DeleteEvento(int eventoId)
        {
            try
            {
                var evento = await _eventoPersit.GetEventoByIdAsync(eventoId, false);
                if (evento == null) throw new Exception("Evento não encontrado.");


                _geralPersit.Delete<Evento>(evento);
                return await _geralPersit.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<Evento[]> GetAllEventosAsync(bool includePalestrantes = false)
        {
            try
            {
                var eventos = await _eventoPersit.GetAllEventosAsync(includePalestrantes);
                if (eventos == null) return null;

                return eventos;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<Evento> GetEventoByIdAsync(int eventoId, bool includePalestrantes = false)
        {
            try
            {
                var eventos = await _eventoPersit.GetEventoByIdAsync(eventoId, includePalestrantes);
                if (eventos == null) return null;

                return eventos;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false)
        {
            try
            {
                var eventos = await _eventoPersit.GetAllEventosByTemaAsync(tema, includePalestrantes);
                if (eventos == null) return null;

                return eventos;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }

}


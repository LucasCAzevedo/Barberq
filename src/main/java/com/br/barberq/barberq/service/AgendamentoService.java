package com.br.barberq.barberq.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.br.barberq.barberq.model.Agendamento;
import com.br.barberq.barberq.repository.AgendamentoRepository;

import java.util.List;

@Service
public class AgendamentoService {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    public List<Agendamento> findByClienteId(Long clienteId) {
        return agendamentoRepository.findByClienteId(clienteId);
    }

    public List<Agendamento> findByBarbeariaId(Long barbeariaId) {
        return agendamentoRepository.findByBarbeariaId(barbeariaId);
    }

    public Agendamento save(Agendamento agendamento) {
        return agendamentoRepository.save(agendamento);
    }

    public void deleteById(Long id) {
        agendamentoRepository.deleteById(id);
    }

    public List<Agendamento> findPendentes() {
        return agendamentoRepository.findByStatus("pendente");
    }

    public List<Agendamento> findPendentesByBarbeariaId(Long barbeariaId) {
        return agendamentoRepository.findByBarbeariaIdAndStatus(barbeariaId, "pendente");
    }

    public Agendamento confirmarAgendamento(Long id) {
        Agendamento agendamento = agendamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agendamento não encontrado"));

        agendamento.setStatus("confirmado");
        return agendamentoRepository.save(agendamento);
    }

    public Agendamento cancelarAgendamento(Long id) {
        Agendamento agendamento = agendamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agendamento não encontrado"));

        agendamento.setStatus("Cancelado");
        return agendamentoRepository.save(agendamento);
    }

}

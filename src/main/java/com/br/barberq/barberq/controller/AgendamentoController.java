package com.br.barberq.barberq.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.br.barberq.barberq.model.Agendamento;
import com.br.barberq.barberq.service.AgendamentoService;

import java.util.List;

@RestController
@RequestMapping("/agendamentos")
public class AgendamentoController {

    @Autowired
    private AgendamentoService agendamentoService;

    @GetMapping("/cliente/{clienteId}")
    public List<Agendamento> getAgendamentosByCliente(@PathVariable Long clienteId) {
        return agendamentoService.findByClienteId(clienteId);
    }

    @GetMapping("/barbearia/{barbeariaId}")
    public List<Agendamento> getAgendamentosByBarbearia(@PathVariable Long barbeariaId) {
        return agendamentoService.findByBarbeariaId(barbeariaId);
    }

    @PostMapping
    public Agendamento createAgendamento(@RequestBody Agendamento agendamento) {
        return agendamentoService.save(agendamento);
    }

    @PostMapping("/cancelar/{id}")
    public Agendamento cancelarAgendamento(@PathVariable Long id) {
        return agendamentoService.cancelarAgendamento(id);
    }

    @PostMapping("/confirmar/{id}")
    public Agendamento confirmarAgendamento(@PathVariable Long id) {
        return agendamentoService.confirmarAgendamento(id);
    }

    @GetMapping("/barbearia/{barbeariaId}/pendentes")
    public List<Agendamento> getAgendamentosPendentesByBarbearia(@PathVariable Long barbeariaId) {
        return agendamentoService.findPendentesByBarbeariaId(barbeariaId);
    }
}

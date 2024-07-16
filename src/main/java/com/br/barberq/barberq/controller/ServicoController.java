package com.br.barberq.barberq.controller;

import com.br.barberq.barberq.model.Barbearia;
import com.br.barberq.barberq.model.Barbeiro;
import com.br.barberq.barberq.model.Servico;
import com.br.barberq.barberq.service.ServicoService;
import com.br.barberq.barberq.service.BarbeariaService;
import com.br.barberq.barberq.service.BarbeiroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/servicos")
public class ServicoController {

    @Autowired
    private ServicoService servicoService;

    @Autowired
    private BarbeiroService barbeiroService;

    @Autowired
    private BarbeariaService barbeariaService;

    @GetMapping("/cadastrar")
    public String cadastrarServico() {
        return "redirect:/servico.html";
    }

    @PostMapping
    public ResponseEntity<?> criarServico(@RequestBody Servico servico) {
        try {
            if (servicoService.existsByDescricao(servico.getDescricao())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(Collections.singletonMap("message", "Serviço já existe"));
            }
            // Validar e associar o barbeiro
            if (servico.getBarbeiro() == null || servico.getBarbeiro().getId() == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID do barbeiro é obrigatório");
            }
            Barbeiro barbeiro = barbeiroService.findById(servico.getBarbeiro().getId());
            if (barbeiro == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Barbeiro não encontrado com o ID fornecido");
            }
            servico.setBarbeiro(barbeiro);
            // // Validar e associar a barbearia
            // if (servico.getBarbearia() == null || servico.getBarbearia().getId() == null) {
            //     throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID da barbearia é obrigatório");
            // }
            // Optional<Barbearia> barbearia = barbeariaService.findById(servico.getBarbearia().getId());
            // if (barbearia.isEmpty()) {
            //     throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
            //             "Barbearia não encontrada com o ID fornecido");
            // }
            // servico.setBarbearia(barbearia.get());

            Servico salvo = servicoService.salvarServico(servico);
            return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("message", "Erro ao cadastrar serviço"));
        }
    }

    @GetMapping("/solicitacoes")
    public ResponseEntity<List<Servico>> listarSolicitacoes() {
        List<Servico> solicitacoes = servicoService.listarServicosPendentes();
        return ResponseEntity.ok(solicitacoes);
    }

    @PostMapping("/aprovar/{id}")
    public ResponseEntity<?> aprovarSolicitacao(@PathVariable Long id) {
        try {
            Servico servico = servicoService.atualizarStatus(id, "APROVADO");
            return ResponseEntity.ok(servico);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Erro ao aprovar solicitação", e);
        }
    }

    @PostMapping("/rejeitar/{id}")
    public ResponseEntity<?> rejeitarSolicitacao(@PathVariable Long id) {
        try {
            Servico servico = servicoService.atualizarStatus(id, "REJEITADO");
            return ResponseEntity.ok(servico);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Erro ao rejeitar solicitação", e);
        }
    }

    @GetMapping("/aprovar")
    public String paginaAprovacao() {
        return "redirect:/approvalServico.html";
    }

    @GetMapping("/barbearia/{barbeariaId}/servicos")
    public ResponseEntity<List<Servico>> listarServicosPorBarbearia(@PathVariable Long barbeariaId) {
        try {
            if (barbeariaId == null) {
                throw new IllegalArgumentException("ID da barbearia não pode ser nulo.");
            }
            List<Servico> servicos = servicoService.listarServicosPorBarbearia(barbeariaId);
            if (servicos.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(servicos);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}

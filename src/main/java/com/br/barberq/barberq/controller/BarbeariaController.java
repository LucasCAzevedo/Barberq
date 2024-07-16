package com.br.barberq.barberq.controller;

import com.br.barberq.barberq.model.Barbearia;
import com.br.barberq.barberq.model.Barbeiro;
import com.br.barberq.barberq.model.Servico;
import com.br.barberq.barberq.service.BarbeariaService;
import com.br.barberq.barberq.service.BarbeiroService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.Collections;
import java.util.List;

@Controller
@RequestMapping("/barbearias")
public class BarbeariaController {

    @Autowired
    private BarbeariaService barbeariaService;

    @Autowired
    private BarbeiroService barbeiroService;

    @GetMapping("/cadastrar")
    public String cadastrarBarbearia() {
        return "redirect:/signup.html";
    }

    @PostMapping
    public ResponseEntity<?> criarBarbearia(@RequestBody Barbearia barbearia) {
        try {
            Barbearia salva = barbeariaService.save(barbearia);
            return ResponseEntity.ok(salva);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Erro ao salvar a barbearia", e);
        }
    }

    @PostMapping("/check")
    public ResponseEntity<?> verificarDuplicidade(@RequestBody Barbearia barbearia) {
        boolean exists = barbeariaService.existsByFields(
                barbearia.getNome(),
                barbearia.getEmail(),
                barbearia.getRua(),
                barbearia.getNumero(),
                barbearia.getBairro(),
                barbearia.getCidade(),
                barbearia.getEstado(),
                barbearia.getCep());
        return ResponseEntity.ok().body(Collections.singletonMap("exists", exists));
    }

    @GetMapping
    public ResponseEntity<List<Barbearia>> listarBarbearias() {
        return ResponseEntity.ok(barbeariaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Barbearia> buscarPorId(@PathVariable Long id) {
        try {
            Barbearia barbearia = barbeariaService.findById(id)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Barbearia não encontrada"));
            return ResponseEntity.ok(barbearia);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao buscar a barbearia", e);
        }
    }

    @GetMapping("/{barbeariaId}/barbeiros/{barbeiroId}")
    public ResponseEntity<Barbeiro> getBarbeiroByBarbeariaId(
            @PathVariable Long barbeariaId, @PathVariable Long barbeiroId) {
        try {
            Barbeiro barbeiro = barbeiroService.findByIdAndBarbeariaId(barbeiroId, barbeariaId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Barbeiro não encontrado"));
            return ResponseEntity.ok(barbeiro);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao buscar o barbeiro", e);
        }
    }

    @GetMapping("/{barbeariaId}/servicos")
    public ResponseEntity<List<Servico>> listarServicosPorBarbearia(@PathVariable Long barbeariaId) {
        try {
            List<Servico> servicos = barbeariaService.findServicosByBarbeariaId(barbeariaId);
            if (servicos.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(servicos);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Erro ao buscar os serviços da barbearia", e);
        }
    }

}
package com.br.barberq.barberq.controller;

import com.br.barberq.barberq.model.Cliente;
import com.br.barberq.barberq.service.ClienteService;

import jakarta.validation.Valid;

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
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping("/cadastrar")
    public String cadastrarCliente() {
        return "redirect:/cliente-signup.html";
    }

    @PostMapping
    public ResponseEntity<?> cadastrarCliente(@Valid @RequestBody Cliente cliente) {
        try {
            // Aqui garantimos que a senha esteja presente no objeto Cliente
            if (cliente.getSenha() == null || cliente.getSenha().isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Senha é obrigatória");
            }
            
            Cliente salvo = clienteService.save(cliente);
            return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Erro ao salvar cliente", e);
        }
    }

    @PostMapping("/check")
    public ResponseEntity<?> verificarDuplicidade(@RequestBody Cliente cliente) {
        boolean exists = clienteService.existsByFields(
                cliente.getNome(),
                cliente.getEmail());
        return ResponseEntity.ok().body(Collections.singletonMap("exists", exists));
    }

    @GetMapping
    public ResponseEntity<List<Cliente>> listarClientes() {
        return ResponseEntity.ok(clienteService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        try {
            Optional<Cliente> cliente = clienteService.findById(id);
            if (cliente.isPresent()) {
                return ResponseEntity.ok(cliente.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("message", "Erro ao buscar cliente por ID"));
        }
    }
}

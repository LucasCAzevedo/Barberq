package com.br.barberq.barberq.service;

import com.br.barberq.barberq.model.Barbearia;
import com.br.barberq.barberq.model.Barbeiro;
import com.br.barberq.barberq.model.Servico;
import com.br.barberq.barberq.repository.BarbeiroRepository;
import com.br.barberq.barberq.repository.ServicoRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;
import java.util.List;
import java.util.Map;

@Service
public class BarbeiroService {

    @Autowired
    private BarbeiroRepository barbeiroRepository;


    @Autowired
    private ServicoRepository servicoRepository;

    public Barbeiro save(Barbeiro barbeiro) {
        return barbeiroRepository.save(barbeiro);
    }

    public boolean existsByEmailAndBarbeariaId(String email, Long barbeariaId) {
        return barbeiroRepository.existsByEmailAndBarbeariaId(email, barbeariaId);
    }

    public List<Barbeiro> listarSolicitacoesPendentes() {
        return barbeiroRepository.findByStatus("Pendente");
    }

    public Barbeiro aprovarSolicitacao(Long id) {
        Barbeiro barbeiro = barbeiroRepository.findById(id).orElseThrow();
        barbeiro.setStatus("Aprovado");
        Barbeiro atualizado = barbeiroRepository.save(barbeiro);
        //enviarEmailAprovacao(barbeiro);
        return atualizado;
    }

    public Barbeiro rejeitarSolicitacao(Long id) {
        Barbeiro barbeiro = barbeiroRepository.findById(id).orElseThrow();
        barbeiro.setStatus("Rejeitado");
        return barbeiroRepository.save(barbeiro);
    }

    public Optional<Barbearia> getBarbeariaByBarbeiroId(Long barbeiroId) {
        return barbeiroRepository.findBarbeariaByBarbeiroId(barbeiroId);
    }
    public Long findBarbeariaIdByBarbeiroId(Long barbeiroId) {
        Optional<Long> optionalBarbeariaId = barbeiroRepository.findBarbeariaIdByBarbeiroId(barbeiroId);
        return optionalBarbeariaId.orElse(null);
    }

    public Long findBarbeiroIdByEmail(String email) {
        Optional<Barbeiro> barbeiroOptional = barbeiroRepository.findByEmail(email);
        return barbeiroOptional.map(Barbeiro::getId).orElse(null);
    }

    public Barbeiro findById(Long id) {
        Optional<Barbeiro> optionalBarbeiro = barbeiroRepository.findById(id);
        return optionalBarbeiro.orElse(null);
    }

    public List<Servico> getServicosByBarbeiroId(Long barbeiroId) {
        return servicoRepository.findByBarbeiroId(barbeiroId);
    }

    public List<Barbeiro> listarBarbeiros() {
        return barbeiroRepository.findAll();
    }

    public double calcularMediaBarbeirosPorBarbearia() {
        List<Barbeiro> barbeiros = barbeiroRepository.findAll();
        Map<Long, Long> barbeirosPorBarbearia = barbeiros.stream()
                .collect(Collectors.groupingBy(barbeiro -> barbeiro.getBarbearia().getId(), Collectors.counting()));
        double totalBarbearias = barbeirosPorBarbearia.size();
        double totalBarbeiros = barbeirosPorBarbearia.values().stream().mapToLong(Long::longValue).sum();
        return totalBarbearias == 0 ? 0 : totalBarbeiros / totalBarbearias;
    }

    public Optional<Barbeiro> findByIdAndBarbeariaId(Long barbeiroId, Long barbeariaId) {
        return barbeiroRepository.findByIdAndBarbeariaId(barbeiroId, barbeariaId);
    }

}

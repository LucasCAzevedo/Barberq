package com.br.barberq.barberq.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.br.barberq.barberq.model.Agendamento;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
    List<Agendamento> findByClienteId(Long clienteId);
    List<Agendamento> findByBarbeariaId(Long barbeariaId);
    List<Agendamento> findByStatus(String status);
    List<Agendamento> findByBarbeariaIdAndStatus(Long barbeariaId, String status);
    @Query("SELECT COUNT(a) FROM Agendamento a")
    Long countTotalAgendamentos();

    @Query("SELECT a.barbeiro.nome, COUNT(a) FROM Agendamento a GROUP BY a.barbeiro.nome")
    List<Object[]> countAgendamentosPerBarbeiro();
}

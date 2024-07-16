package com.br.barberq.barberq.repository;

import com.br.barberq.barberq.model.Servico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Repository
public interface ServicoRepository extends JpaRepository<Servico, Long> {
    boolean existsByDescricao(String descricao);

    List<Servico> findByStatus(String status);

    List<Servico> findByBarbeiroId(Long barbeiroId);

    List<Servico> findByBarbeariaId(Long barbeariaId);
    
    @Query("SELECT COUNT(s) FROM Servico s WHERE s.barbearia.id = :barbeariaId")
    Long countByBarbeariaId(@Param("barbeariaId") Long barbeariaId);  // Método adicionado para contar serviços por barbearia
}

package com.br.barberq.barberq.repository;

import com.br.barberq.barberq.model.Barbearia;
import com.br.barberq.barberq.model.Servico;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BarbeariaRepository extends JpaRepository<Barbearia, Long> {

    boolean existsByNomeAndEmailAndRuaAndNumeroAndBairroAndCidadeAndEstadoAndCep(
        String nome, String email, String rua, String numero, String bairro, String cidade, String estado, String cep
    );

    Optional<Barbearia> findByEmail(String email);

    @Query("SELECT COUNT(b) FROM Barbearia b")
    Long countAllBarbearias();

    @Query("SELECT s FROM Servico s WHERE s.barbearia.id = :barbeariaId")
    List<Servico> findServicosByBarbeariaId(Long barbeariaId);
}

package com.br.barberq.barberq.repository;

import com.br.barberq.barberq.model.Barbearia;
import com.br.barberq.barberq.model.Barbeiro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface BarbeiroRepository extends JpaRepository<Barbeiro, Long> {
    boolean existsByEmailAndBarbeariaId(String email, Long barbeariaId);
    
    List<Barbeiro> findByStatus(String status);

    Optional<Barbeiro> findByEmail(String email);

    @Query("SELECT b.barbearia.id FROM Barbeiro b WHERE b.id = :barbeiroId")
    Optional<Long> findBarbeariaIdByBarbeiroId(Long barbeiroId);

    @Query("SELECT COUNT(b) FROM Barbeiro b WHERE b.barbearia.id = :barbeariaId")
    Long countBarbeirosByBarbeariaId(Long barbeariaId);

    @Query("SELECT b.barbearia FROM Barbeiro b WHERE b.id = :barbeiroId")
    Optional<Barbearia> findBarbeariaByBarbeiroId(Long barbeiroId);

    Optional<Barbeiro> findByIdAndBarbeariaId(Long id, Long barbeariaId);
}

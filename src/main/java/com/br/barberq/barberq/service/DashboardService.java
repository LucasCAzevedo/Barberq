package com.br.barberq.barberq.service;

import com.br.barberq.barberq.model.Barbearia;
import com.br.barberq.barberq.repository.AgendamentoRepository;
import com.br.barberq.barberq.repository.BarbeariaRepository;
import com.br.barberq.barberq.repository.BarbeiroRepository;
import com.br.barberq.barberq.repository.ServicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardService {

    @Autowired
    private BarbeariaRepository barbeariaRepository;

    @Autowired
    private BarbeiroRepository barbeiroRepository;

    @Autowired
    private ServicoRepository servicoRepository;

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    public Map<String, Object> getDashboardData() {
        Map<String, Object> dashboardData = new HashMap<>();

        // Total de Barbearias
        Long totalBarbearias = barbeariaRepository.countAllBarbearias();
        dashboardData.put("totalBarbearias", totalBarbearias);

        // Barbeiros por Barbearia
        List<Barbearia> barbearias = barbeariaRepository.findAll();
        Map<String, Long> barbeirosPerBarbearia = new HashMap<>();
        for (Barbearia barbearia : barbearias) {
            Long count = barbeiroRepository.countBarbeirosByBarbeariaId(barbearia.getId());
            barbeirosPerBarbearia.put(barbearia.getNome(), count);
        }
        dashboardData.put("barbeirosPerBarbearia", barbeirosPerBarbearia);

        // Total de Agendamentos
        Long totalAgendamentos = agendamentoRepository.countTotalAgendamentos();
        dashboardData.put("totalAgendamentos", totalAgendamentos);

        // Agendamentos por Barbeiro
        Map<String, Long> agendamentosPerBarbeiro = new HashMap<>();
        List<Object[]> results = agendamentoRepository.countAgendamentosPerBarbeiro();
        for (Object[] result : results) {
            agendamentosPerBarbeiro.put((String) result[0], (Long) result[1]);
        }
        dashboardData.put("agendamentosPerBarbeiro", agendamentosPerBarbeiro);

        return dashboardData;
    }
}

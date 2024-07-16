package com.br.barberq.barberq.controller;

import com.br.barberq.barberq.model.Barbeiro;
import com.br.barberq.barberq.model.Cliente;
import com.br.barberq.barberq.model.Barbearia;
import com.br.barberq.barberq.service.AuthService;

import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> body, HttpSession session) {
        String userType = body.get("userType");
        String email = body.get("email");
        String senha = body.get("senha");

        switch (userType) {
            case "barbeiro":
                Optional<Barbeiro> barbeiro = authService.loginBarbeiro(email, senha);
                return processLoginResponse(barbeiro, session, userType);
            case "cliente":
                Optional<Cliente> cliente = authService.loginCliente(email, senha);
                return processLoginResponse(cliente, session, userType);
            case "barbearia":
                Optional<Barbearia> barbearia = authService.loginBarbearia(email, senha);
                return processLoginResponse(barbearia, session, userType);
            default:
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Tipo de usuário inválido."));
        }
    }

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getAuthStatus(HttpSession session) {
        Object loggedInUser = session.getAttribute("loggedInUser");

        if (loggedInUser != null) {
            String userType = (String) session.getAttribute("userType");
            return ResponseEntity.ok(Map.of("loggedIn", true, "userId", getIdFromObject(loggedInUser), "userType", userType));
        } else {
            return ResponseEntity.ok(Map.of("loggedIn", false));
        }
    }
    
    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok(Map.of("message", "Logout successful."));
    }

    private ResponseEntity<Map<String, Object>> processLoginResponse(Optional<?> optional, HttpSession session, String userType) {
        if (optional.isPresent()) {
            Object user = optional.get();
            session.setAttribute("loggedInUser", user);
            session.setAttribute("userType", userType);
            return ResponseEntity.ok(Map.of("id", getIdFromObject(user), "userType", userType));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "Credenciais inválidas. Verifique o e-mail e a senha."));
    }

    private Long getIdFromObject(Object object) {
        if (object instanceof Barbeiro) {
            return ((Barbeiro) object).getId();
        } else if (object instanceof Cliente) {
            return ((Cliente) object).getId();
        } else if (object instanceof Barbearia) {
            return ((Barbearia) object).getId();
        }
        return null;
    }
}
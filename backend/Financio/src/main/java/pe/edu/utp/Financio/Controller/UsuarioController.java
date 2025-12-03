package pe.edu.utp.Financio.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.utp.Financio.Service.UsuarioService;
import pe.edu.utp.Financio.entity.Usuario;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")

public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<Usuario> listar() {
        return usuarioService.listarTodos();
    }

    @PostMapping("/registrar")
    public ResponseEntity<?> registrar(@RequestBody Usuario usuario) {
        try {
            Usuario nuevo = usuarioService.registrar(usuario);
            return ResponseEntity.ok(Map.of(
                    "mensaje", "Usuario registrado correctamente",
                    "usuario", nuevo));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", ex.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario credenciales) {
        Optional<Usuario> usuarioOpt = usuarioService.login(
                credenciales.getDni(),
                credenciales.getContrasena());

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();

            // ✅ Solo enviamos datos seguros al frontend
            return ResponseEntity.ok(Map.of(
                    "id", usuario.getId(),
                    "nombre", usuario.getNombre(),
                    "dni", usuario.getDni(),
                    "rol", usuario.getRol()));
        } else {
            // ❌ Credenciales incorrectas
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("mensaje", "Credenciales incorrectas"));
        }
    }

    @GetMapping("/admin")
    public ResponseEntity<?> obtenerAdmin() {
        Optional<Usuario> admin = usuarioService.obtenerAdmin();
        return admin.isPresent()
                ? ResponseEntity.ok(admin.get())
                : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable int id) {
        if (usuarioService.eliminar(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/admin/{id}")
    public ResponseEntity<?> asignarRolAdmin(@PathVariable int id) {
        Optional<Usuario> usuarioOpt = usuarioService.asignarRolAdmin(id);
        if (usuarioOpt.isPresent()) {
            return ResponseEntity.ok(usuarioOpt.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("mensaje", "Usuario no encontrado"));
        }
    }

    @GetMapping("/{id}")
public ResponseEntity<?> obtenerPorId(@PathVariable int id) {
    Optional<Usuario> usuarioOpt = usuarioService.obtenerPorId(id);

    if (usuarioOpt.isPresent()) {
        return ResponseEntity.ok(usuarioOpt.get());
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("mensaje", "Usuario no encontrado"));
    }
}


}
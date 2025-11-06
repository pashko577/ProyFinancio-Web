package pe.edu.utp.Financio.Controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.utp.Financio.Service.MovimientoService;
import pe.edu.utp.Financio.entity.Movimiento;

@RestController
@RequestMapping("/api/ingresos")
@CrossOrigin(origins = "http://localhost:4200")
public class IngresoController {
    
    @Autowired
    private MovimientoService movimientoService;

    // ✅ Registrar nuevo ingreso
    @PostMapping("/registrar")
    public ResponseEntity<Movimiento> registrarIngreso(@RequestBody Movimiento ingreso) {
        ingreso.setTipo("INGRESO"); // 🔹 Garantiza que sea un ingreso
        ingreso.setFecha(LocalDateTime.now());
        Movimiento nuevo = movimientoService.registrarMovimiento(ingreso);
        return ResponseEntity.ok(nuevo);
    }

    // ✅ Listar ingresos del usuario logueado
    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<Movimiento>> listarIngresosPorUsuario(
            @PathVariable int idUsuario,
            @RequestParam(defaultValue = "false") boolean admin
    ) {
        List<Movimiento> movimientos = movimientoService.listarPorUsuario(idUsuario, admin);
        List<Movimiento> ingresos = movimientos.stream()
                .filter(m -> "INGRESO".equalsIgnoreCase(m.getTipo()))
                .toList();
        return ResponseEntity.ok(ingresos);
    }

    // ✅ Eliminar ingreso
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarIngreso(@PathVariable int id) {
        boolean eliminado = movimientoService.eliminarMovimiento(id);
        return eliminado
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

    // ✅ Buscar ingreso por ID
    @GetMapping("/{id}")
    public ResponseEntity<Movimiento> obtenerIngresoPorId(@PathVariable int id) {
        return movimientoService.buscarPorId(id)
                .filter(m -> "INGRESO".equalsIgnoreCase(m.getTipo()))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    // GET directo a /api/ingresos
@GetMapping
public ResponseEntity<List<Movimiento>> listarTodosIngresos() {
    List<Movimiento> ingresos = movimientoService.listarTodosMovimientos().stream()
            .filter(m -> "INGRESO".equalsIgnoreCase(m.getTipo()))
            .toList();
    return ResponseEntity.ok(ingresos);
}
}

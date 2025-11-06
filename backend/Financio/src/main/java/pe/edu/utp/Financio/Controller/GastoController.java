package pe.edu.utp.Financio.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.utp.Financio.entity.Movimiento;
import pe.edu.utp.Financio.Service.MovimientoService;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/gastos")
@CrossOrigin(origins = "http://localhost:4200")
public class GastoController {

    @Autowired
    private MovimientoService movimientoService;

    // ✅ Registrar gasto
    @PostMapping("/registrar")
    public ResponseEntity<Movimiento> registrarGasto(@RequestBody Movimiento gasto) {
        gasto.setTipo("GASTO");
        gasto.setFecha(LocalDateTime.now());
        Movimiento nuevo = movimientoService.registrarMovimiento(gasto);
        return ResponseEntity.ok(nuevo);
    }

// ✅ Listar todos los gastos
@GetMapping
public ResponseEntity<List<Movimiento>> listarTodosGastos() {
    List<Movimiento> ingresos = movimientoService.listarTodosMovimientos().stream()
            .filter(m -> "GASTO".equalsIgnoreCase(m.getTipo()))
            .toList();
    return ResponseEntity.ok(ingresos);
}

    // ✅ Eliminar gasto
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarGasto(@PathVariable int id) {
        boolean eliminado = movimientoService.eliminarMovimiento(id);
        return eliminado
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

    // ✅ Buscar gasto por ID
    @GetMapping("/{id}")
    public ResponseEntity<Movimiento> obtenerGastoPorId(@PathVariable int id) {
        return movimientoService.buscarPorId(id)
                .filter(m -> "GASTO".equalsIgnoreCase(m.getTipo()))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

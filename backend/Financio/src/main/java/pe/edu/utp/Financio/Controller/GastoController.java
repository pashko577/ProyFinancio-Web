package pe.edu.utp.Financio.Controller;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.utp.Financio.Service.MovimientoService;
import pe.edu.utp.Financio.entity.Movimiento;

@RestController
@RequestMapping("/api/gastos")
public class GastoController {

    @Autowired
    private MovimientoService movimientoService;

    @PostMapping("/registrar")
    public ResponseEntity<Movimiento> registrarGasto(@RequestBody Movimiento gasto) {
        gasto.setTipo("GASTO");
        gasto.setFecha(LocalDateTime.now());
        Movimiento nuevo = movimientoService.registrarMovimiento(gasto);
        return ResponseEntity.ok(nuevo);
    }

    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<Movimiento>> listarGastosPorUsuario(
            @PathVariable int idUsuario,
            @RequestParam(defaultValue = "false") boolean admin
    ) {
        List<Movimiento> movimientos = movimientoService.listarPorUsuario(idUsuario, admin);
        List<Movimiento> gastos = movimientos.stream()
                .filter(m -> "GASTO".equalsIgnoreCase(m.getTipo()))
                .toList();

        return ResponseEntity.ok(gastos);
    }

    @GetMapping
    public ResponseEntity<List<Movimiento>> listarTodosGastos() {
        List<Movimiento> gastos = movimientoService.listarTodosMovimientos().stream()
                .filter(m -> "GASTO".equalsIgnoreCase(m.getTipo()))
                .toList();
        return ResponseEntity.ok(gastos);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarGasto(@PathVariable int id) {
        boolean eliminado = movimientoService.eliminarMovimiento(id);
        return eliminado
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movimiento> obtenerGastoPorId(@PathVariable int id) {
        return movimientoService.buscarPorId(id)
                .filter(m -> "GASTO".equalsIgnoreCase(m.getTipo()))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

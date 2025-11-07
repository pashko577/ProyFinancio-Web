package pe.edu.utp.Financio.Controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.utp.Financio.Service.MovimientoService;
import pe.edu.utp.Financio.Service.CategoriaService;
import pe.edu.utp.Financio.Service.MetodoPagoService;
import pe.edu.utp.Financio.entity.Movimiento;
import pe.edu.utp.Financio.entity.Categoria;
import pe.edu.utp.Financio.entity.Metodopago;
@RestController
@RequestMapping("/api/ingresos")

public class IngresoController {

    @Autowired
    private MovimientoService movimientoService;

    @Autowired
    private CategoriaService categoriaService;

    @Autowired
    private MetodoPagoService metodoPagoService;

    @PostMapping("/registrar")
    public ResponseEntity<Movimiento> registrarIngreso(@RequestBody Movimiento ingreso) {

        Categoria cat = categoriaService.buscarPorId(ingreso.getCategoria().getId())
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
        ingreso.setCategoria(cat);

        Metodopago mp = metodoPagoService.buscarPorId(ingreso.getMetodoPago().getId())
                .orElseThrow(() -> new RuntimeException("Método de pago no encontrado"));
        ingreso.setMetodoPago(mp);

        ingreso.setTipo("INGRESO");
        ingreso.setFecha(LocalDateTime.now());

        Movimiento nuevo = movimientoService.registrarMovimiento(ingreso);
        return ResponseEntity.ok(nuevo);
    }

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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarIngreso(@PathVariable int id) {
        boolean eliminado = movimientoService.eliminarMovimiento(id);
        return eliminado
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

    // ✅ Ruta corregida
    @GetMapping("/buscar/{id}")
    public ResponseEntity<Movimiento> obtenerIngresoPorId(@PathVariable int id) {
        return movimientoService.buscarPorId(id)
                .filter(m -> "INGRESO".equalsIgnoreCase(m.getTipo()))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Movimiento>> listarTodosIngresos() {
        List<Movimiento> ingresos = movimientoService.listarTodosMovimientos().stream()
                .filter(m -> "INGRESO".equalsIgnoreCase(m.getTipo()))
                .toList();

        return ResponseEntity.ok(ingresos);
    }
}

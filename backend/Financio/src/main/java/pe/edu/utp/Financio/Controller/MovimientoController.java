package pe.edu.utp.Financio.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.utp.Financio.entity.Movimiento;
import pe.edu.utp.Financio.Service.MovimientoService;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/movimientos")
@CrossOrigin(origins = "*")
public class MovimientoController {

    @Autowired
    private MovimientoService movimientoService;

    @PostMapping
    public Movimiento registrarMovimiento(@RequestBody Movimiento movimiento) {
        return movimientoService.registrarMovimiento(movimiento);
    }

    @GetMapping("/usuario/{idUsuario}")
    public List<Movimiento> listarPorUsuario(
            @PathVariable int idUsuario,
            @RequestParam(defaultValue = "false") boolean admin) {
        return movimientoService.listarPorUsuario(idUsuario, admin);
    }

    @GetMapping("/{idMovimiento}")
    public Optional<Movimiento> buscarPorId(@PathVariable int idMovimiento) {
        return movimientoService.buscarPorId(idMovimiento);
    }

    @DeleteMapping("/{idMovimiento}")
    public String eliminar(@PathVariable int idMovimiento) {
        boolean eliminado = movimientoService.eliminarMovimiento(idMovimiento);
        return eliminado ? "✅ Movimiento eliminado" : "⚠ Movimiento no encontrado";
    }
}
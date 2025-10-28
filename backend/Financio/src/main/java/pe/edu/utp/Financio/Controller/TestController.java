package pe.edu.utp.Financio.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.utp.Financio.Service.MovimientoService;
import pe.edu.utp.Financio.model.Movimiento;

@RestController
public class TestController {

    private MovimientoService movimientoService;

    @Autowired
    public TestController(MovimientoService movimientoService) {
        this.movimientoService = movimientoService;
    }

    @GetMapping("/")
    public String home() {
        return "✅ El backend Financio está corriendo correctamente";
    }

    @GetMapping("/movimientos")
    public List<Movimiento> getMovimientos() {
        return movimientoService.listarPorUsuario(1); // Ejemplo: obtener movimientos del usuario con ID 1
    }

    @GetMapping("/allMovimientos")
    public List<Movimiento> getAllMovimientos() {
        return movimientoService.listarTodos(); // Ejemplo: obtener todos los movimientos
    }


    @GetMapping("/test-guardar-movimiento")
    public String testdsadaad(){
        return "Movimiento guardado con ID: dadaadda" ;
    }
}

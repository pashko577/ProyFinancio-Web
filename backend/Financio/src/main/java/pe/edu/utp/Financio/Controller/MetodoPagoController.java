package pe.edu.utp.Financio.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.utp.Financio.entity.Metodopago;
import pe.edu.utp.Financio.Service.MetodoPagoService;
import java.util.List;

@RestController
@RequestMapping("/api/metodos-pago")
@CrossOrigin(origins = "*")
public class MetodoPagoController {

    @Autowired
    private MetodoPagoService metodoPagoService;

    @PostMapping
    public Metodopago registrar(@RequestBody Metodopago metodoPago) {
        return metodoPagoService.registrar(metodoPago);
    }

    @GetMapping("/usuario/{idUsuario}")
    public List<Metodopago> listarPorUsuario(@PathVariable int idUsuario) {
        return metodoPagoService.listarPorUsuario(idUsuario);
    }

    @GetMapping("/existe")
    public boolean existe(
            @RequestParam int idUsuario,
            @RequestParam String tipo) {
        return metodoPagoService.existeMetodoPago(idUsuario, tipo);
    }
}
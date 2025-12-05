package pe.edu.utp.Financio.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.utp.Financio.Service.PagoService;
import pe.edu.utp.Financio.entity.Pago;

@RestController
@RequestMapping("/api/pagos")
public class PagoController {

    @Autowired
    private PagoService pagoService;

    @GetMapping("/lista") 
    public List<Pago> listarPagos() {
        return pagoService.listarPagos();
    }

    @GetMapping("/aprobar/{id}")
    public Pago aprobarPago(@PathVariable Long id) {
        return pagoService.aprobarPago(id);
    }
}

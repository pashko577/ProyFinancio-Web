package pe.edu.utp.Financio.Controller;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.utp.Financio.Service.AporteService;
import pe.edu.utp.Financio.entity.Aporte;

@RestController
@RequestMapping("/api/aportes")
public class AporteController {

    @Autowired
    private AporteService aporteService;

    @PostMapping
    public Aporte registrarAporte(@RequestBody Aporte aporte) {
        // El backend asigna la fecha
        return aporteService.registrarAporte(aporte);
    }
    @GetMapping("/acumulado/{idMeta}")
public BigDecimal obtenerAcumulado(@PathVariable String idMeta) {
    return aporteService.getAcumuladoPorMeta(idMeta);
}
}

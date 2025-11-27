package pe.edu.utp.Financio.Controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import pe.edu.utp.Financio.Service.CajaService;
import pe.edu.utp.Financio.entity.Caja;

@RestController
@RequestMapping("/api/cajas")
@CrossOrigin("*")
@RequiredArgsConstructor

public class CajaController {

    private final CajaService cajaService;

    @GetMapping
    public List<Caja> listar() {
        return cajaService.listar();
    }

    @PostMapping("/fondo")
    public Caja agregarFondo(@RequestBody Caja caja) {
        return cajaService.guardarFondo(caja);
    }

    @PutMapping("/cierre/{id}")
    public ResponseEntity<Caja> agregarCierre(
            @PathVariable int id,
            @RequestBody Caja datos
    ) {
        return cajaService.guardarCierre(id, datos.getCierre())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable int id) {
        return cajaService.eliminar(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}

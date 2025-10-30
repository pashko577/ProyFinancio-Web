package pe.edu.utp.Financio.Controller;

import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.utp.Financio.entity.Caja;
import pe.edu.utp.Financio.repository.CajaRepository;

@RestController
@RequestMapping("/api/cajas")
@CrossOrigin(origins = "*")
public class CajaController {

    @Autowired
    private CajaRepository cajaRepository;

    @GetMapping
    public List<Caja> listar() {
        return cajaRepository.findAll();
    }

    @PostMapping("/fondo")
    public Caja agregarFondo(@RequestBody Caja caja) {
        caja.setFechaApertura(LocalDate.now());
        return cajaRepository.save(caja);
    }

    @PutMapping("/cierre/{id}")
    public ResponseEntity<Caja> agregarCierre(@PathVariable int id, @RequestBody Caja datos) {
        return cajaRepository.findById(id)
                .map(caja -> {
                    caja.setCierre(datos.getCierre());
                    caja.setFechaCierre(LocalDate.now());
                    return ResponseEntity.ok(cajaRepository.save(caja));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable int id) {
        if (cajaRepository.existsById(id)) {
            cajaRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
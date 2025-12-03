package pe.edu.utp.Financio.Controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import pe.edu.utp.Financio.Service.CajaService;
import pe.edu.utp.Financio.entity.Caja;
import pe.edu.utp.Financio.repository.CajaRepository;

@RestController
@RequestMapping("/api/caja")
@RequiredArgsConstructor

public class CajaController {

    private final CajaService cajaService;

    @GetMapping
    public List<Caja> listar() {
        return cajaService.listar();
    }

    @PostMapping("/fondo")
    public ResponseEntity<?> agregarFondo(@RequestBody Caja caja) {

        // Validar usuario
        if (caja.getUsuario() == null || caja.getUsuario().getId() == null) {
            return ResponseEntity.badRequest().body(
                Map.of("error", "Debe enviar el id del usuario en el JSON")
            );
        }

        // Validar fondo
        if (caja.getFondo() == null) {
            return ResponseEntity.badRequest().body(
                Map.of("error", "Debe enviar el monto del fondo")
            );
        }

        // Asignar fecha de apertura si no existe
        if (caja.getFechaApertura() == null) {
            caja.setFechaApertura(LocalDate.now());
        }

        Caja nueva = cajaService.guardarFondo(caja);

        return ResponseEntity.ok(
            Map.of(
                "idCaja", nueva.getIdCaja(),
                "mensaje", "Fondo registrado correctamente",
                "caja", nueva
            )
        );
    }


@GetMapping("/ultima")
public ResponseEntity<?> obtenerUltimaCaja() {
    return cajaService.obtenerUltimaCaja()
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
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

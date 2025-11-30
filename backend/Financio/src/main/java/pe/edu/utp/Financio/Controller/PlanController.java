package pe.edu.utp.Financio.Controller;

import pe.edu.utp.Financio.Service.SuscripcionService;
import pe.edu.utp.Financio.dto.SuscripcionRequest;
import pe.edu.utp.Financio.entity.Plan;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/planes")
@RequiredArgsConstructor
public class PlanController {

    private final SuscripcionService service;

    @PostMapping("/suscribir")
    public ResponseEntity<?> suscribir(@RequestBody SuscripcionRequest request) {
        var sub = service.registrarSuscripcion(request);
        return ResponseEntity.ok(Map.of(
                "mensaje", "Suscripción registrada correctamente",
                "idSuscripcion", sub.getId()
        ));
    }

    @GetMapping
    public ResponseEntity<List<Plan>> listarPlanes() {
        return ResponseEntity.ok(service.listarPlanes());
    }
}

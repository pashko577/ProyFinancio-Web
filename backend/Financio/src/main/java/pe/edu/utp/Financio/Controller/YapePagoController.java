package pe.edu.utp.Financio.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import pe.edu.utp.Financio.entity.Suscripcion;
import pe.edu.utp.Financio.entity.Plan;
import pe.edu.utp.Financio.entity.Usuario;
import pe.edu.utp.Financio.entity.Pago;
import pe.edu.utp.Financio.repository.PlanRepository;
import pe.edu.utp.Financio.repository.SuscripcionRepository;
import pe.edu.utp.Financio.repository.PagoRepository;
import pe.edu.utp.Financio.Service.UsuarioService;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/api/pagos/yape")
public class YapePagoController {

    @Autowired
    private SuscripcionRepository suscripcionRepository;

    @Autowired
    private PlanRepository planRepository;

    @Autowired
    private PagoRepository pagoRepository;

    @Autowired
    private UsuarioService usuarioService;

    // Iniciar pago -> genera suscripción pendiente
@PostMapping
public ResponseEntity<?> iniciarPago(@RequestBody Map<String, Object> payload) {
   
        try {
        
        Long idUsuario = Long.parseLong(payload.get("idUsuario").toString());
        Long idPlan = Long.parseLong(payload.get("idPlan").toString());

        Usuario usuario = usuarioService.obtenerPorId(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Plan plan = planRepository.findById(idPlan)
                .orElseThrow(() -> new RuntimeException("Plan no encontrado"));

        Suscripcion suscripcion = Suscripcion.builder()
                .usuario(usuario)
                .plan(plan)
                .nombreCliente(usuario.getNombre())
                .correo(usuario.getCorreo())
                .estado("PENDIENTE")  // YA ACTIVAS LA SUSCRIPCIÓN
                .build();

        suscripcionRepository.save(suscripcion);

/*         // 🔥 ACTIVAR AL USUARIO TAMBIÉN
        usuario.setSuscripcionActiva(true);
        usuarioService.guardar(usuario);
 */
        return ResponseEntity.ok(Map.of(
                "idSuscripcion", suscripcion.getId(),
                "monto", plan.getPrecio(),
                "descripcion", "Pago plan " + plan.getNombre()
        ));

    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body(Map.of(
                "error", "Error interno del servidor",
                "detalle", e.getMessage()
        ));
    }
}





    // Confirmar pago
   @PostMapping("/confirmar")
public ResponseEntity<?> confirmarPago(@RequestBody Map<String, Object> payload) {
    try {
        // 1️⃣ Obtener datos del payload
        Long idUsuario = payload.get("idUsuario") != null
                ? Long.parseLong(payload.get("idUsuario").toString())
                : null;
        Long idSuscripcion = payload.get("idSuscripcion") != null
                ? Long.parseLong(payload.get("idSuscripcion").toString())
                : null;
        BigDecimal monto = payload.get("monto") != null
                ? new BigDecimal(payload.get("monto").toString())
                : null;
        String codigoOperacion = payload.get("codigoOperacion") != null
                ? payload.get("codigoOperacion").toString()
                : null;
        String imagenComprobante = payload.get("imagenComprobante") != null
                ? payload.get("imagenComprobante").toString()
                : null;

        // 2️⃣ Validaciones básicas
        if (idUsuario == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "idUsuario es obligatorio"));
        }
        if (idSuscripcion == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "idSuscripcion es obligatorio"));
        }
        if (monto == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "monto es obligatorio"));
        }
        if (codigoOperacion == null || codigoOperacion.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "codigoOperacion es obligatorio"));
        }

        // 3️⃣ Obtener la suscripción y el usuario
        Suscripcion sus = suscripcionRepository.findById(idSuscripcion)
                .orElseThrow(() -> new RuntimeException("Suscripción no encontrada"));

        Usuario usuario = sus.getUsuario();
        if (usuario == null || !usuario.getId().equals(idUsuario)) {
            return ResponseEntity.badRequest().body(Map.of("error", "Usuario no coincide con la suscripción"));
        }

        // 4️⃣ Logging para depuración
        System.out.println("=== Confirmar Pago ===");
        System.out.println("Usuario: " + usuario);
        System.out.println("Suscripción: " + sus);
        System.out.println("Monto: " + monto);
        System.out.println("CodigoOperacion: " + codigoOperacion);
        System.out.println("ImagenComprobante presente: " + (imagenComprobante != null));

        // 5️⃣ Verificar si ya existe un pago con el mismo código (opcional)
        if (pagoRepository.existsByCodigoOperacion(codigoOperacion)) {
            return ResponseEntity.badRequest().body(Map.of("error", "Ya existe un pago con este código"));
        }

        // 6️⃣ Crear el pago
        Pago pago = new Pago();
        pago.setUsuario(usuario);
        pago.setSuscripcion(sus);
        pago.setMonto(monto);
        pago.setCodigoOperacion(codigoOperacion);
        pago.setImagenComprobante(imagenComprobante);
        pago.setEstado("PENDIENTE");

        pagoRepository.save(pago);

   /*      // 7️⃣ Activar suscripción y usuario
        sus.setEstado("ACTIVA");
        suscripcionRepository.save(sus);

        usuario.setSuscripcionActiva(true);
        usuarioService.guardar(usuario); */

        return ResponseEntity.ok(Map.of(
                "mensaje", "Pago registrado y suscripción activada",
                "idPago", pago.getId()
        ));

    } catch (Exception e) {
        e.printStackTrace(); // Esto va al log del servidor
        return ResponseEntity.status(500).body(Map.of(
                "error", "Error interno del servidor",
                "detalle", e.getMessage()
        ));
    }
}

}

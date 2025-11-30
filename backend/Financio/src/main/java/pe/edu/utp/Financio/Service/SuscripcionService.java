package pe.edu.utp.Financio.Service;

import pe.edu.utp.Financio.dto.SuscripcionRequest;
import pe.edu.utp.Financio.entity.Suscripcion;
import pe.edu.utp.Financio.entity.Plan;
import pe.edu.utp.Financio.repository.SuscripcionRepository;
import pe.edu.utp.Financio.repository.PlanRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SuscripcionService {

    private final SuscripcionRepository repo;
    private final PlanRepository planRepo;
    private final JavaMailSender mailSender; // Inyectar el servicio de correo

    public Suscripcion registrarSuscripcion(SuscripcionRequest request) {
        Plan plan = planRepo.findById(request.getIdPlan())
                .orElseThrow(() -> new RuntimeException("Plan no encontrado"));

        Suscripcion s = Suscripcion.builder()
                .plan(plan)
                .nombreCliente(request.getNombreCliente())
                .correo(request.getCorreo())
                .telefono(request.getTelefono())
                .estado("PENDIENTE")
                .fechaSuscripcion(LocalDateTime.now())
                .build();
        Suscripcion suscripcionGuardada = repo.save(s);
        // ✅ Enviar correo de confirmación

        enviarCorreoConfirmacion(suscripcionGuardada);

        return suscripcionGuardada;
    }

    // ✅ Agrega este método para listar planes
    public List<Plan> listarPlanes() {
        return planRepo.findAll();
    }

     private void enviarCorreoConfirmacion(Suscripcion suscripcion) {
        SimpleMailMessage mensaje = new SimpleMailMessage();
        mensaje.setTo(suscripcion.getCorreo()); // correo del usuario
        mensaje.setSubject("Confirmación de suscripción");
        mensaje.setText(
            "Hola " + suscripcion.getNombreCliente() + ",\n\n" +
            "Tu suscripción al plan '" + suscripcion.getPlan().getNombre() + "' ha sido registrada correctamente.\n\n" +
            "Gracias por confiar en nosotros.\n\n" +
            "Financio"
        );
        mailSender.send(mensaje);
    }
}

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
    private final JavaMailSender mailSender;

    public Suscripcion registrarSuscripcion(SuscripcionRequest request) {
        Long idPlan = request.getIdPlan().longValue();
        Plan plan = planRepo.findById(idPlan)
                .orElseThrow(() -> new RuntimeException("Plan no encontrado"));
        Suscripcion s = Suscripcion.builder()
                .plan(plan)
                .nombreCliente(request.getNombreCliente())
                .correo(request.getCorreo())
                .telefono(request.getTelefono())
                .estado("PENDIENTE")
                .fechaSuscripcion(LocalDateTime.now())
                .build();

        // Guardar en BD
        Suscripcion suscripcionGuardada = repo.save(s);

        // Envío del correo
         enviarCorreoConfirmacion(suscripcionGuardada); //desactivar

        return suscripcionGuardada;
    }

    public List<Plan> listarPlanes() {
        return planRepo.findAll();
    }

    private void enviarCorreoConfirmacion(Suscripcion suscripcion) {
        SimpleMailMessage mensaje = new SimpleMailMessage();
        mensaje.setTo(suscripcion.getCorreo());
        mensaje.setSubject("Confirmación de Suscripción");
        mensaje.setText(
                "Hola " + suscripcion.getNombreCliente() + ",\n\n" +
                        "Tu suscripción al plan '" + suscripcion.getPlan().getNombre()
                        + "' ha sido registrada correctamente.\n" +
                        "Gracias por confiar en nosotros.\n\nFinancio");

        mailSender.send(mensaje);
    }

    public Suscripcion obtenerPorId(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Suscripción no encontrada"));
    }

    public void activarSuscripcion(Suscripcion sus) {
        sus.setEstado("ACTIVA");
        repo.save(sus);
    }
}

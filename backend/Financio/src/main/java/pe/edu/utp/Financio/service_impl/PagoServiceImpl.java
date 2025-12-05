package pe.edu.utp.Financio.service_impl;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.edu.utp.Financio.Service.PagoService;
import pe.edu.utp.Financio.entity.Pago;
import pe.edu.utp.Financio.entity.Suscripcion;
import pe.edu.utp.Financio.entity.Usuario;
import pe.edu.utp.Financio.repository.PagoRepository;
import pe.edu.utp.Financio.repository.SuscripcionRepository;
import pe.edu.utp.Financio.repository.UsuarioRepository;

@Service
public class PagoServiceImpl implements PagoService {

    @Autowired
    private PagoRepository pagoRepository;

    @Autowired
    private SuscripcionRepository suscripcionRepository;

    @Override
    public Pago registrarPago(Pago pago) {

        // Validar código único
        if (pagoRepository.findByCodigoOperacion(pago.getCodigoOperacion()).isPresent()) {
            throw new RuntimeException("El código de operación ya fue registrado.");
        }

        // Validar monto del plan
        BigDecimal precioPlan = pago.getSuscripcion().getPlan().getPrecio();

        if (pago.getMonto().compareTo(precioPlan) < 0) {
            throw new RuntimeException("Monto insuficiente. El plan cuesta " + precioPlan);
        }

        // Guardar pago PENDIENTE
        pago.setEstado("PENDIENTE");
        return pagoRepository.save(pago);
    }

@Autowired
private UsuarioRepository usuarioRepository;

@Override
public Pago aprobarPago(Long idPago) {  
    Pago pago = pagoRepository.findById(idPago)
            .orElseThrow(() -> new RuntimeException("Pago no encontrado"));

    pago.setEstado("VALIDADO");

    // Activar suscripción
    Suscripcion sus = pago.getSuscripcion();
    sus.setEstado("ACTIVA");
    suscripcionRepository.save(sus);

    // Activar usuario
    Usuario usuario = sus.getUsuario();
    usuario.setSuscripcionActiva(true);
    usuarioRepository.save(usuario);

    return pagoRepository.save(pago);
}


    @Override
    public Pago obtenerPagoPorId(Long id) {
        return pagoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pago no encontrado"));
    }

    @Override
    public List<Pago> listarPagos() {
        return pagoRepository.findAll();
    }
}

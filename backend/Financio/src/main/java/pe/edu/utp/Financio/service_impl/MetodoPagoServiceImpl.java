package pe.edu.utp.Financio.service_impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.utp.Financio.entity.Metodopago;
import pe.edu.utp.Financio.entity.Usuario;
import pe.edu.utp.Financio.repository.MetodopagoRepository;
import pe.edu.utp.Financio.Service.MetodoPagoService;
import pe.edu.utp.Financio.Service.UsuarioService;

import java.util.List;
import java.util.Optional;

@Service
public class MetodoPagoServiceImpl implements MetodoPagoService {

    @Autowired
    private MetodopagoRepository metodoPagoRepository;

    @Autowired
private UsuarioService usuarioService;

    @Override
    public Metodopago registrar(Metodopago metodoPago) {
        return metodoPagoRepository.save(metodoPago);
    }

@Override
public List<Metodopago> listarPorUsuario(Integer idUsuario) {
    List<Metodopago> metodos = metodoPagoRepository.findByUsuario_Id(idUsuario);

    
    if (metodos.isEmpty()) {
        // Buscar el usuario por ID
        Usuario usuario = usuarioService.obtenerPorId(Long.valueOf(idUsuario))
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        String[] tipos = {
            "Efectivo",
            "Depósito",
            "Tarjeta de crédito",
            "Tarjeta de débito",
            "Transferencia bancaria",
            "Yape / Plin",
            "Otro"
        };

        for (String tipo : tipos) {
            Metodopago mp = new Metodopago();
            mp.setTipo(tipo);
            mp.setUsuario(usuario); // 🔥 Asignar el objeto Usuario completo
            metodoPagoRepository.save(mp);
            metodos.add(mp);
        }
    }

    return metodos;
}


    @Override
    public boolean existeMetodoPago(Integer idUsuario, String tipo) {
        return metodoPagoRepository.existsByUsuario_IdAndTipo(idUsuario, tipo); // ✅ corregido
    }

    @Override
    public Optional<Metodopago> buscarPorId(Integer id) {
        return metodoPagoRepository.findById(id);
    }

    @Override
    public List<Metodopago> listarTodos() {
        return metodoPagoRepository.findAll();
    }

}
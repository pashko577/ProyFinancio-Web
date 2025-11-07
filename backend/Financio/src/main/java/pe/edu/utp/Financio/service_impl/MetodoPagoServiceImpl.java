package pe.edu.utp.Financio.service_impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.utp.Financio.entity.Metodopago;
import pe.edu.utp.Financio.repository.MetodopagoRepository;
import pe.edu.utp.Financio.Service.MetodoPagoService;
import java.util.List;
import java.util.Optional;

@Service
public class MetodoPagoServiceImpl implements MetodoPagoService {

    @Autowired
    private MetodopagoRepository metodoPagoRepository;

    @Override
    public Metodopago registrar(Metodopago metodoPago) {
        return metodoPagoRepository.save(metodoPago);
    }

@Override
public List<Metodopago> listarPorUsuario(Integer idUsuario) {
    return metodoPagoRepository.findByUsuario_Id(idUsuario);
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
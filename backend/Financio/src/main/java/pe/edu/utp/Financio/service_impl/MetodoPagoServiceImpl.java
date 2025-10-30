package pe.edu.utp.Financio.service_impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.utp.Financio.entity.Metodopago;
import pe.edu.utp.Financio.repository.MetodopagoRepository;
import pe.edu.utp.Financio.Service.MetodoPagoService;
import java.util.List;

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
        return metodoPagoRepository.findByUsuario_Id(idUsuario); // ✅ corregido
    }

    @Override
    public boolean existeMetodoPago(Integer idUsuario, String tipo) {
        return metodoPagoRepository.existsByUsuario_IdAndTipo(idUsuario, tipo); // ✅ corregido
    }
}
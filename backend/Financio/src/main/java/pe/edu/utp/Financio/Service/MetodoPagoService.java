package pe.edu.utp.Financio.Service;

import pe.edu.utp.Financio.entity.Metodopago;
import java.util.List;
import java.util.Optional;

public interface MetodoPagoService {
    Metodopago registrar(Metodopago metodoPago);

    List<Metodopago> listarPorUsuario(Integer idUsuario);

    boolean existeMetodoPago(Integer idUsuario, String tipo);

    Optional<Metodopago> buscarPorId(Integer id);

    List<Metodopago> listarTodos();

}
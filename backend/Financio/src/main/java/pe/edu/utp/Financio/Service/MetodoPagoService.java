package pe.edu.utp.Financio.Service;


import pe.edu.utp.Financio.entity.Metodopago;
import java.util.List;

public interface MetodoPagoService {
    Metodopago registrar(Metodopago metodoPago);
    List<Metodopago> listarPorUsuario(Integer idUsuario);
    boolean existeMetodoPago(Integer idUsuario, String tipo);
}
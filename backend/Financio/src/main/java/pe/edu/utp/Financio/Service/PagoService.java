package pe.edu.utp.Financio.Service;

import java.util.List;

import pe.edu.utp.Financio.entity.Pago;

public interface PagoService {

    Pago registrarPago(Pago pago);

    Pago aprobarPago(Long idPago);
      Pago obtenerPagoPorId(Long id);
    List<Pago> listarPagos(); 
}

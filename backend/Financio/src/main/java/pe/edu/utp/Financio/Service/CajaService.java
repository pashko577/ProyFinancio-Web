package pe.edu.utp.Financio.Service;
import pe.edu.utp.Financio.entity.Caja;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;


public interface CajaService {
    Caja guardarFondo(Caja caja);
    Optional<Caja> guardarCierre(int idCaja, BigDecimal cierre); // ✔ corregido
    boolean eliminar(int idCaja);
    List<Caja> listar();
    Optional<Caja> obtenerUltimaCaja();
}

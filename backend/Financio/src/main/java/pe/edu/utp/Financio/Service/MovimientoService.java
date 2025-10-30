package pe.edu.utp.Financio.Service;


import pe.edu.utp.Financio.entity.Movimiento;
import java.util.List;
import java.util.Optional;

public interface MovimientoService {
    Movimiento registrarMovimiento(Movimiento movimiento);
    List<Movimiento> listarPorUsuario(int idUsuario, boolean esAdmin);
    boolean eliminarMovimiento(int idMovimiento);
    Optional<Movimiento> buscarPorId(int idMovimiento);
}

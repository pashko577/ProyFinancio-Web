package pe.edu.utp.Financio.service_impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.utp.Financio.Service.MovimientoService;
import pe.edu.utp.Financio.entity.Movimiento;
import pe.edu.utp.Financio.repository.MovimientoRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MovimientoServiceImpl implements MovimientoService {

    private final MovimientoRepository movimientoRepository;

    @Override
    public Movimiento registrarMovimiento(Movimiento movimiento) {
        // Asigna fecha si no viene desde frontend
        if (movimiento.getFecha() == null) {
            movimiento.setFecha(LocalDateTime.now());
        }
        return movimientoRepository.save(movimiento);
    }

    @Override
    public List<Movimiento> listarPorUsuario(int idUsuario, boolean esAdmin) {
        return esAdmin
                ? movimientoRepository.findAll()
                : movimientoRepository.findByUsuario_Id(idUsuario);
    }

    @Override
    public boolean eliminarMovimiento(int idMovimiento) {
        if (movimientoRepository.existsById(idMovimiento)) {
            movimientoRepository.deleteById(idMovimiento);
            return true;
        }
        return false;
    }

    @Override
    public Optional<Movimiento> buscarPorId(int idMovimiento) {
        return movimientoRepository.findById(idMovimiento);
    }
    @Override
public List<Movimiento> listarTodosMovimientos() {
    return movimientoRepository.findAll(); // Asumiendo que usas JpaRepository
}

}

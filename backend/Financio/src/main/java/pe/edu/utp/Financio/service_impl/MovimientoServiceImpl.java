package pe.edu.utp.Financio.service_impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.utp.Financio.entity.Movimiento;
import pe.edu.utp.Financio.repository.MovimientoRepository;
import pe.edu.utp.Financio.Service.MovimientoService;
import java.util.List;
import java.util.Optional;

@Service
public class MovimientoServiceImpl implements MovimientoService {

    @Autowired
    private MovimientoRepository movimientoRepository;

    @Override
    public Movimiento registrarMovimiento(Movimiento movimiento) {
        return movimientoRepository.save(movimiento);
    }

    @Override
    public List<Movimiento> listarPorUsuario(int idUsuario, boolean esAdmin) {
        return esAdmin ? movimientoRepository.findAll()
                : movimientoRepository.findByUsuario_Id(idUsuario); // ✅ corregido
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
}
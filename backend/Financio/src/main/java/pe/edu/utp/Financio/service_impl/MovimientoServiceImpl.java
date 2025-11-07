package pe.edu.utp.Financio.service_impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.utp.Financio.Service.MovimientoService;
import pe.edu.utp.Financio.entity.Movimiento;
import pe.edu.utp.Financio.entity.Categoria;
import pe.edu.utp.Financio.entity.Metodopago;
import pe.edu.utp.Financio.repository.MovimientoRepository;
import pe.edu.utp.Financio.repository.CategoriaRepository;
import pe.edu.utp.Financio.repository.MetodopagoRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MovimientoServiceImpl implements MovimientoService {

    private final MovimientoRepository movimientoRepository;
    private final CategoriaRepository categoriaRepository;
    private final MetodopagoRepository metodoPagoRepository;

    @Override
    public Movimiento registrarMovimiento(Movimiento movimiento) {

        // Asigna fecha si no viene desde frontend
        if (movimiento.getFecha() == null) {
            movimiento.setFecha(LocalDateTime.now());
        }

        // 🔹 Buscar categoría existente
        if (movimiento.getCategoria() != null && movimiento.getCategoria().getId() != null) {
            Categoria categoria = categoriaRepository.findById(movimiento.getCategoria().getId())
                    .orElseThrow(() -> new RuntimeException("Categoría no encontrada con id " + movimiento.getCategoria().getId()));
            movimiento.setCategoria(categoria);
        }

        // 🔹 Buscar método de pago existente
        if (movimiento.getMetodoPago() != null && movimiento.getMetodoPago().getId() != null) {
            Metodopago metodoPago = metodoPagoRepository.findById(movimiento.getMetodoPago().getId())
                    .orElseThrow(() -> new RuntimeException("Método de pago no encontrado con id " + movimiento.getMetodoPago().getId()));
            movimiento.setMetodoPago(metodoPago);
        }

        return movimientoRepository.save(movimiento);
    }

    @Override
    public List<Movimiento> listarPorUsuario(int idUsuario, boolean esAdmin) {
        return esAdmin
                ? movimientoRepository.findByTipo("INGRESO")
                : movimientoRepository.findByUsuario_IdAndTipo(idUsuario, "INGRESO");
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
        return movimientoRepository.findAll();
    }
}

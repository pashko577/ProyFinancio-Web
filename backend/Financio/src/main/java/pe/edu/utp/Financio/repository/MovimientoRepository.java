package pe.edu.utp.Financio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.utp.Financio.model.Movimiento;

public interface MovimientoRepository extends JpaRepository<Movimiento, Integer> {
    List<Movimiento> findByUsuarioId(int idUsuario);
}

package pe.edu.utp.Financio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.utp.Financio.entity.Movimiento;
import java.util.List;

@Repository
public interface MovimientoRepository extends JpaRepository<Movimiento, Integer> {

    // Buscar movimientos por ID de usuario
    List<Movimiento> findByUsuario_Id(int idUsuario);

    // Buscar movimientos por tipo (ingreso/gasto)
    List<Movimiento> findByTipo(String tipo);
}
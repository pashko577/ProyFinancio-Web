package pe.edu.utp.Financio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.utp.Financio.entity.Recordatorio;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface RecordatorioRepository extends JpaRepository<Recordatorio, Long> {
    List<Recordatorio> findByIdUsuarioAndFechaRecordatorioLessThanEqualAndEnviadoFalse(
        Integer idUsuario, LocalDate fecha
    );
}

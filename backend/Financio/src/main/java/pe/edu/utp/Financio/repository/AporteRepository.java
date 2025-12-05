package pe.edu.utp.Financio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.edu.utp.Financio.entity.Aporte;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface AporteRepository extends JpaRepository<Aporte, Long> {

    List<Aporte> findByIdMeta(String idMeta);

    @Query("SELECT COALESCE(SUM(a.monto), 0) FROM Aporte a WHERE a.idMeta = :idMeta")
    BigDecimal sumMontoByIdMeta(String idMeta);
}

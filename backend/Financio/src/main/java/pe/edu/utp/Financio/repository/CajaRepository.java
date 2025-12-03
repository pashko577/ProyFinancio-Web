package pe.edu.utp.Financio.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.edu.utp.Financio.entity.Caja;

@Repository
public interface CajaRepository extends JpaRepository<Caja, Integer> {
    @Query(value = "SELECT * FROM cajas ORDER BY id_caja DESC LIMIT 1", nativeQuery = true)
    Caja findUltimaCaja();
}

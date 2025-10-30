package pe.edu.utp.Financio.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.utp.Financio.entity.Metodopago;
import java.util.List;

@Repository
public interface MetodopagoRepository extends JpaRepository<Metodopago, Integer> {

    // Listar métodos de pago por usuario
    List<Metodopago> findByUsuario_Id(Integer idUsuario);

    // Verificar existencia de un método de pago para un usuario
    boolean existsByUsuario_IdAndTipo(Integer idUsuario, String tipo);
}
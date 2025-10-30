package pe.edu.utp.Financio.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.utp.Financio.entity.Categoria;
import java.util.List;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {

    
    List<Categoria> findByUsuario_IdAndTipo(Integer idUsuario, String tipo);

    // Verificar existencia de una categoría para un usuario
    boolean existsByUsuario_IdAndNombreAndTipo(Integer idUsuario, String nombre, String tipo);
}
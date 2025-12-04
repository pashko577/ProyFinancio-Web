package pe.edu.utp.Financio.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
import pe.edu.utp.Financio.entity.Usuario;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
Optional<Usuario> findByDniOrCorreo(String dni, String correo);
   Optional<Usuario> findByDni(String dni);

}
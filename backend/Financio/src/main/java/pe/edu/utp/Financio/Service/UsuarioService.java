package pe.edu.utp.Financio.Service;

import pe.edu.utp.Financio.entity.Usuario;
import java.util.List;
import java.util.Optional;

public interface UsuarioService {
    Usuario registrar(Usuario usuario);

    Optional<Usuario> buscarPorDni(String dni);

    List<Usuario> listarTodos();

    boolean eliminar(Long id);

    Optional<Usuario> login(String dni, String contrasenaHash);

    Optional<Usuario> obtenerAdmin();

    Optional<Usuario> asignarRolAdmin(Long idUsuario);

    Optional<Usuario> obtenerPorId(Long id);

    // para superadmin
    Optional<Usuario> asignarRolSuperadmin(Long idUsuario);
    public Usuario guardar(Usuario usuario);

}
package pe.edu.utp.Financio.service_impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.mindrot.jbcrypt.BCrypt;
import pe.edu.utp.Financio.entity.Usuario;
import pe.edu.utp.Financio.repository.UsuarioRepository;
import pe.edu.utp.Financio.Service.CategoriaService;
import pe.edu.utp.Financio.Service.UsuarioService;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private CategoriaService categoriaService;

    @Override
    public Usuario registrar(Usuario usuario) {
        Optional<Usuario> existente = usuarioRepository.findByDniOrCorreo(usuario.getDni(), usuario.getCorreo());
        if (existente.isPresent()) {
            throw new RuntimeException("El usuario ya está registrado");
        }

        String hash = BCrypt.hashpw(usuario.getContrasena(), BCrypt.gensalt());
        usuario.setContrasena(hash);

        long totalUsuarios = usuarioRepository.count();
        usuario.setRol(totalUsuarios == 0 ? "ADMIN" : "EMPLEADO");

        Usuario nuevoUsuario = usuarioRepository.save(usuario);

        categoriaService.asignarCategoriasPorDefecto(nuevoUsuario);
        return nuevoUsuario;
    }

    @Override
    public Optional<Usuario> obtenerPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    @Override
    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    @Override
    public boolean eliminar(Long id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public Optional<Usuario> login(String dniOCorreo, String contrasena) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByDniOrCorreo(dniOCorreo, dniOCorreo);
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            if (BCrypt.checkpw(contrasena, usuario.getContrasena())) {
                // Asignar categorías si aún no tiene
                if (categoriaService.listarPorUsuarioYTipo(usuario.getId(), "INGRESO").isEmpty() &&
                        categoriaService.listarPorUsuarioYTipo(usuario.getId(), "GASTO").isEmpty()) {
                    categoriaService.asignarCategoriasPorDefecto(usuario);
                }
                return Optional.of(usuario);
            }
        }
        return Optional.empty();
    }

    @Override
    public Optional<Usuario> obtenerAdmin() {
        return usuarioRepository.findAll()
                .stream()
                .filter(u -> "ADMIN".equalsIgnoreCase(u.getRol()))
                .findFirst();
    }

    @Override
    public Optional<Usuario> asignarRolAdmin(Long idUsuario) {
        return usuarioRepository.findById(idUsuario)
                .map(u -> {
                    u.setRol("ADMIN");
                    return usuarioRepository.save(u);
                });
    }

    @Override
    public Optional<Usuario> asignarRolSuperadmin(Long idUsuario) {
        return usuarioRepository.findById(idUsuario)
                .map(u -> {
                    u.setRol("SUPERADMIN");
                    return usuarioRepository.save(u);
                });
    }

    @Override
    public Usuario guardar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    @Override
    public Optional<Usuario> buscarPorDni(String dni) {
        return usuarioRepository.findByDni(dni);
    }

}

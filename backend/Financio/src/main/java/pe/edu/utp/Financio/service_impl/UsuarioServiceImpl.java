package pe.edu.utp.Financio.service_impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.mindrot.jbcrypt.BCrypt;
import pe.edu.utp.Financio.entity.Usuario;
import pe.edu.utp.Financio.repository.UsuarioRepository;
import pe.edu.utp.Financio.Service.UsuarioService;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public Usuario registrar(Usuario usuario) {

        // 🔍 Validar si ya existe DNI o correo
        Optional<Usuario> existente = usuarioRepository.findByDniOrCorreo(
                usuario.getDni(),
                usuario.getCorreo());

        if (existente.isPresent()) {
            throw new RuntimeException("El usuario ya está registrado");
        }

        // 🔒 Encriptar la contraseña antes de guardar
        String hash = BCrypt.hashpw(usuario.getContrasena(), BCrypt.gensalt());
        usuario.setContrasena(hash);

        // ✅ Asignar rol automáticamente
        long totalUsuarios = usuarioRepository.count();
        usuario.setRol(totalUsuarios == 0 ? "ADMIN" : "EMPLEADO");
        return usuarioRepository.save(usuario);
    }

    // ✅ Nuevo método para asignar rol ADMIN
    public Optional<Usuario> asignarRolAdmin(Integer idUsuario) {
        Optional<Usuario> opt = usuarioRepository.findById(idUsuario);
        if (opt.isPresent()) {
            Usuario usuario = opt.get();
            usuario.setRol("ADMIN");
            return Optional.of(usuarioRepository.save(usuario));
        }
        return Optional.empty();
    }

    @Override
    public Optional<Usuario> buscarPorDni(String dni) {
        return usuarioRepository.findByDni(dni);
    }

    @Override
    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    @Override
    public boolean eliminar(int id) {
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
}

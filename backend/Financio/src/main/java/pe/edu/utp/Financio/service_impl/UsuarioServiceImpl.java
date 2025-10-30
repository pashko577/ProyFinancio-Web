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
        String hash = BCrypt.hashpw(usuario.getContrasenaHash(), BCrypt.gensalt());
        usuario.setContrasenaHash(hash);
        return usuarioRepository.save(usuario);
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
    public Optional<Usuario> login(String dni, String contrasenaHash) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByDni(dni);
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            if (BCrypt.checkpw(contrasenaHash, usuario.getContrasenaHash())) {
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
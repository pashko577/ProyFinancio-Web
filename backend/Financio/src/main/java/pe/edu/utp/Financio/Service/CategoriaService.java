package pe.edu.utp.Financio.Service;

import pe.edu.utp.Financio.entity.Categoria;
import pe.edu.utp.Financio.entity.Usuario;

import java.util.List;
import java.util.Optional;

public interface CategoriaService {
    
    Categoria registrar(Categoria categoria);

    List<Categoria> listarPorUsuarioYTipo(Long idUsuario, String tipo);

    boolean existeCategoria(Long idUsuario, String nombre, String tipo);

    Optional<Categoria> buscarPorId(Integer id);

    List<Categoria> listarTodas();

    void asignarCategoriasPorDefecto(Usuario usuario);
}

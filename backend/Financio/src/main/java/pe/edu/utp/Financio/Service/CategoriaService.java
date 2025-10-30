package pe.edu.utp.Financio.Service;


import pe.edu.utp.Financio.entity.Categoria;
import java.util.List;

public interface CategoriaService {
    Categoria registrar(Categoria categoria);
    List<Categoria> listarPorUsuario(Integer idUsuario, String tipo);
    boolean existeCategoria(Integer idUsuario, String nombre, String tipo);
}

package pe.edu.utp.Financio.service_impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.utp.Financio.entity.Categoria;
import pe.edu.utp.Financio.repository.CategoriaRepository;
import pe.edu.utp.Financio.Service.CategoriaService;
import java.util.List;

@Service
public class CategoriaServiceImpl implements CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Override
    public Categoria registrar(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    @Override
    public List<Categoria> listarPorUsuario(Integer idUsuario, String tipo) { 
        return categoriaRepository.findByUsuario_IdAndTipo(idUsuario, tipo);
    }

    @Override
    public boolean existeCategoria(Integer idUsuario, String nombre, String tipo) { 
        return categoriaRepository.existsByUsuario_IdAndNombreAndTipo(idUsuario, nombre, tipo);
    }
}
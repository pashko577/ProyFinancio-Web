package pe.edu.utp.Financio.service_impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.utp.Financio.entity.Categoria;
import pe.edu.utp.Financio.entity.Usuario;
import pe.edu.utp.Financio.repository.CategoriaRepository;
import pe.edu.utp.Financio.Service.CategoriaService;
import java.util.List;
import java.util.Optional;

@Service
public class CategoriaServiceImpl implements CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Override
    public Categoria registrar(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    @Override
    public List<Categoria> listarPorUsuarioYTipo(Long idUsuario, String tipo) {
        return categoriaRepository.findByUsuario_IdAndTipo(idUsuario, tipo);
    }

    @Override
    public boolean existeCategoria(Long idUsuario, String nombre, String tipo) {
        return categoriaRepository.existsByUsuario_IdAndNombreAndTipo(idUsuario, nombre, tipo);
    }

    @Override
    public Optional<Categoria> buscarPorId(Integer id) {
        return categoriaRepository.findById(id);
    }

    @Override
    public List<Categoria> listarTodas() {
        return categoriaRepository.findAll();
    }

    @Override
    public void asignarCategoriasPorDefecto(Usuario usuario) {
        String[] ingresos = {
                "Ventas en tienda", "Ventas online", "Ventas por redes sociales",
                "Ventas al por mayor", "Ingresos por personalización", "Otros ingresos"
        };

        String[] gastos = {
                "Alquiler", "Servicios básicos", "Publicidad y marketing",
                "Sueldos y salarios", "Insumos y materiales", "Transporte", "Otros gastos"
        };

        for (String nombre : ingresos) {
            Categoria c = Categoria.builder()
                    .usuario(usuario)
                    .nombre(nombre)
                    .tipo("INGRESO")
                    .build();
            categoriaRepository.save(c);
        }

        for (String nombre : gastos) {
            Categoria c = Categoria.builder()
                    .usuario(usuario)
                    .nombre(nombre)
                    .tipo("GASTO")
                    .build();
            categoriaRepository.save(c);
        }
    }
}
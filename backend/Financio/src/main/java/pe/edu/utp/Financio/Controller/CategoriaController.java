package pe.edu.utp.Financio.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.utp.Financio.entity.Categoria;
import pe.edu.utp.Financio.Service.CategoriaService;
import java.util.List;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "*")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @PostMapping
    public Categoria registrar(@RequestBody Categoria categoria) {
        return categoriaService.registrar(categoria);
    }

    @GetMapping("/usuario/{idUsuario}")
    public List<Categoria> listarPorUsuario(
            @PathVariable int idUsuario,
            @RequestParam String tipo) {
        return categoriaService.listarPorUsuario(idUsuario, tipo);
    }

    @GetMapping("/existe")
    public boolean existeCategoria(
            @RequestParam int idUsuario,
            @RequestParam String nombre,
            @RequestParam String tipo) {
        return categoriaService.existeCategoria(idUsuario, nombre, tipo);
    }
}
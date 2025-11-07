package pe.edu.utp.Financio.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.utp.Financio.entity.Categoria;
import pe.edu.utp.Financio.Service.CategoriaService;
import java.util.List;

@RestController
@RequestMapping("/api/categorias")

public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @PostMapping
    public Categoria registrar(@RequestBody Categoria categoria) {
        return categoriaService.registrar(categoria);
    }

@GetMapping("/usuario/{idUsuario}/{tipo}")
public ResponseEntity<List<Categoria>> listarPorUsuarioYTipo(
        @PathVariable int idUsuario,
        @PathVariable String tipo
) {
    return ResponseEntity.ok(
            categoriaService.listarPorUsuarioYTipo(idUsuario, tipo.toUpperCase())
    );
}

    @GetMapping("/existe")
    public boolean existeCategoria(
            @RequestParam int idUsuario,
            @RequestParam String nombre,
            @RequestParam String tipo) {
        return categoriaService.existeCategoria(idUsuario, nombre, tipo);
    }
}
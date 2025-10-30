package pe.edu.utp.Financio.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.utp.Financio.entity_mongo.Meta;
import pe.edu.utp.Financio.repository.MetaRepository;
import java.util.List;

@RestController
@RequestMapping("/api/metas")
@CrossOrigin(origins = "*")
public class MetaController {

    @Autowired
    private MetaRepository metaRepository;

    @PostMapping
    public Meta crearMeta(@RequestBody Meta meta) {
        return metaRepository.save(meta);
    }

    @GetMapping("/usuario/{idUsuario}")
    public List<Meta> listarPorUsuario(@PathVariable Integer idUsuario) {
        return metaRepository.findByIdUsuarioAndActivaTrue(idUsuario);
    }

    @PutMapping("/{idMeta}/acumulado")
    public Meta actualizarAcumulado(
            @PathVariable String idMeta,
            @RequestParam Double nuevoAcumulado) {
        Meta meta = metaRepository.findById(idMeta)
                .orElseThrow(() -> new RuntimeException("Meta no encontrada"));
        meta.setAcumulado(nuevoAcumulado);
        return metaRepository.save(meta);
    }

    @PutMapping("/{idMeta}/desactivar")
    public Meta desactivarMeta(@PathVariable String idMeta) {
        Meta meta = metaRepository.findById(idMeta)
                .orElseThrow(() -> new RuntimeException("Meta no encontrada"));
        meta.setActiva(false);
        return metaRepository.save(meta);
    }
}
package pe.edu.utp.Financio.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.utp.Financio.entity_mongo.Meta;
import pe.edu.utp.Financio.Service.MetaService;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/metas")
public class MetaController {

    @Autowired
    private MetaService metaService;

    @PostMapping
    public ResponseEntity<Meta> crearMeta(@RequestBody Meta meta) {
        Meta creada = metaService.registrar(meta);
        return ResponseEntity.created(URI.create("/api/metas/" + creada.getId())).body(creada);
    }

    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<Meta>> listarPorUsuario(@PathVariable Integer idUsuario) {
        List<Meta> metas = metaService.listarActivasPorUsuario(idUsuario);

        if (metas.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(metas);
    }

    @PutMapping("/{idMeta}/acumulado")
    public ResponseEntity<Meta> actualizarAcumulado(
            @PathVariable String idMeta,
            @RequestParam double monto) {

        if (monto <= 0) {
            return ResponseEntity.badRequest().build();
        }

        Meta meta = metaService.actualizarAcumulado(idMeta, monto);

        return ResponseEntity.ok(meta);
    }

    @PutMapping("/{idMeta}/desactivar")
    public ResponseEntity<Void> desactivarMeta(@PathVariable String idMeta) {
        metaService.desactivarSiCumplida(idMeta);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{idMeta}/desactivar-manual")
    public ResponseEntity<Void> desactivarManual(@PathVariable String idMeta) {
        Meta meta = metaService.actualizarAcumulado(idMeta, 0);

        if (meta == null) {
            return ResponseEntity.notFound().build();
        }

        meta.setActiva(false);
        metaService.registrar(meta);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{idMeta}")
    public ResponseEntity<Void> eliminarMeta(@PathVariable String idMeta) {
        try {
            metaService.eliminar(idMeta);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}

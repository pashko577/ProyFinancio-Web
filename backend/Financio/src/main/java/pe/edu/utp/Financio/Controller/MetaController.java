package pe.edu.utp.Financio.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.utp.Financio.entity_mongo.Meta;
import pe.edu.utp.Financio.Service.MetaService;
import java.util.List;

@RestController
@RequestMapping("/api/metas")
@CrossOrigin(origins = "*")
public class MetaController {

    @Autowired
    private MetaService metaService;

    @PostMapping
    public Meta crearMeta(@RequestBody Meta meta) {
        return metaService.registrar(meta);
    }

    @GetMapping("/usuario/{idUsuario}")
    public List<Meta> listarPorUsuario(@PathVariable Integer idUsuario) {
        return metaService.listarActivasPorUsuario(idUsuario);
    }

    @PutMapping("/{idMeta}/acumulado")
    public Meta actualizarAcumulado(
            @PathVariable String idMeta,
            @RequestParam double monto) {
        return metaService.actualizarAcumulado(idMeta, monto);
    }

    @PutMapping("/{idMeta}/desactivar")
    public void desactivarMeta(@PathVariable String idMeta) {
        metaService.desactivarSiCumplida(idMeta);
    }
}

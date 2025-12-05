package pe.edu.utp.Financio.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.utp.Financio.entity.Recordatorio;
import pe.edu.utp.Financio.Service.RecordatorioService;

import java.util.List;

@RestController
@RequestMapping("/api/recordatorios")
public class RecordatorioController {

    @Autowired
    private RecordatorioService service;

    @GetMapping("/usuario/{idUsuario}")
    public List<Recordatorio> obtenerPendientes(@PathVariable Integer idUsuario) {
        return service.obtenerRecordatoriosPendientes(idUsuario);
    }

    @PostMapping
    public Recordatorio crear(@RequestBody Recordatorio r) {
        return service.crearRecordatorio(r);
    }

    @PutMapping("/{id}/enviado")
    public void marcarComoEnviado(@PathVariable Long id) {
        service.marcarComoEnviado(id);
    }
}

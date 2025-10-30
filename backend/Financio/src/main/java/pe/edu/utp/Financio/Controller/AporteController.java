package pe.edu.utp.Financio.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import pe.edu.utp.Financio.entity_mongo.Aporte;
import pe.edu.utp.Financio.Service.AporteService;

@RestController
@RequestMapping("/api/aportes")
@CrossOrigin(origins = "*")
public class AporteController {

    @Autowired
    private AporteService aporteService;

    @PostMapping
    public Aporte registrarAporte(@RequestBody Aporte aporte) {
        return aporteService.registrarAporte(aporte);
    }
}
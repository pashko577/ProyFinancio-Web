package pe.edu.utp.Financio.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import pe.edu.utp.Financio.entity.Pago;
import pe.edu.utp.Financio.entity.Suscripcion;
import pe.edu.utp.Financio.Service.PagoService;
import pe.edu.utp.Financio.Service.SuscripcionService;

@Controller
@RequestMapping("/pagos")
public class PagoController {

    @Autowired
    private PagoService pagoService;

    @Autowired
    private SuscripcionService suscripcionService;

    // FORMULARIO PARA REGISTRAR UN PAGO
    @GetMapping("/nuevo/{idSuscripcion}")
    public String nuevoPago(@PathVariable Long idSuscripcion, Model model) {

        Suscripcion sus = suscripcionService.obtenerPorId(idSuscripcion);

        Pago pago = new Pago();
        pago.setSuscripcion(sus);

        model.addAttribute("pago", pago);
        return "pagos/form";
    }

    // GUARDAR PAGO
    @PostMapping("/guardar")
    public String guardarPago(@ModelAttribute Pago pago, Model model) {

        try {
            pagoService.registrarPago(pago);
            return "redirect:/pagos/lista?exito=true";

        } catch (Exception e) {
            model.addAttribute("error", e.getMessage());
            model.addAttribute("pago", pago);
            return "pagos/form";
        }
    }

    // LISTAR PAGOS
    @GetMapping("/lista")
    public String listarPagos(Model model) {
        model.addAttribute("pagos", pagoService.listarPagos());
        return "pagos/lista";
    }

    // APROBAR PAGO (ADMIN)
    @GetMapping("/aprobar/{id}")
    public String aprobarPago(@PathVariable Long id) {

        pagoService.aprobarPago(id);
        return "redirect:/pagos/lista?aprobado=true";
    }
}

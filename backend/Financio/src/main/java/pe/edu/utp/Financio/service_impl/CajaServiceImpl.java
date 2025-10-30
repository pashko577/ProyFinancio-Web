package pe.edu.utp.Financio.service_impl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.utp.Financio.entity.Caja;
import pe.edu.utp.Financio.repository.CajaRepository;
import pe.edu.utp.Financio.Service.CajaService;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class CajaServiceImpl implements CajaService {

    @Autowired
    private CajaRepository cajaRepository;

    @Override
    public Caja guardarFondo(Caja caja) {
        caja.setFechaApertura(LocalDate.now());
        return cajaRepository.save(caja);
    }

    @Override
    public Optional<Caja> guardarCierre(int idCaja, double cierre) {
        return cajaRepository.findById(idCaja).map(caja -> {
            caja.setCierre(cierre);
            caja.setFechaCierre(LocalDate.now());
            return cajaRepository.save(caja);
        });
    }

    @Override
    public boolean eliminar(int idCaja) {
        if (cajaRepository.existsById(idCaja)) {
            cajaRepository.deleteById(idCaja);
            return true;
        }
        return false;
    }

    @Override
    public List<Caja> listar() {
        return cajaRepository.findAll();
    }
}
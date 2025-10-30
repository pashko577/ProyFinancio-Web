package pe.edu.utp.Financio.service_impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.edu.utp.Financio.entity_mongo.Aporte;
import pe.edu.utp.Financio.repository.AporteRepository;
import pe.edu.utp.Financio.Service.AporteService;

@Service
public class AporteServiceImpl implements AporteService {

    @Autowired
    private AporteRepository aporteRepository;

    @Override
    public Aporte registrarAporte(Aporte aporte) {
        return aporteRepository.save(aporte);
    }
}
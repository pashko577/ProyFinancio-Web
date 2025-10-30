package pe.edu.utp.Financio.repository;


import org.springframework.data.mongodb.repository.MongoRepository;

import org.springframework.stereotype.Repository;
import pe.edu.utp.Financio.entity_mongo.Aporte;

@Repository
public interface AporteRepository extends MongoRepository<Aporte, String> {
}
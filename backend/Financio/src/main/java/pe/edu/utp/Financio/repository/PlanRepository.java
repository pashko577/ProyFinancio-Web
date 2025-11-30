package pe.edu.utp.Financio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.utp.Financio.entity.Plan;

public interface PlanRepository extends JpaRepository<Plan, Integer> {
}

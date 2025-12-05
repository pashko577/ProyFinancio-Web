package pe.edu.utp.Financio.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private SuscripcionInterceptor suscripcionInterceptor;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(suscripcionInterceptor)
                .addPathPatterns(
                        "/api/caja/**",
                        "/api/ingresos/**",
                        "/api/gastos/**",
                        "/api/metas/**",
                        "/api/movimientos/**",
                        "/api/aportes/**"
                )
                .excludePathPatterns("/api/usuarios/**", "/api/pagos/**", "/api/login/**"); // rutas públicas
    }
}

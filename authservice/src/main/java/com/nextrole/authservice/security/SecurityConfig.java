package com.nextrole.authservice.security;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.cors.CorsConfiguration;

// import com.nextrole.authservice.jwt.JwtAuthenticationEntryPoint;
// import com.nextrole.authservice.jwt.JwtAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

//   @Autowired
//   private JwtAuthenticationEntryPoint point;

//   @Autowired
//   private JwtAuthenticationFilter filter;

  
//   @Bean
// public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

//     http
//         // .cors(cors -> cors.configurationSource(request -> {
//         //     CorsConfiguration config = new CorsConfiguration();
//         //     config.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
//         //     config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//         //     config.setAllowedHeaders(Arrays.asList("*"));
//         //     config.setAllowCredentials(true);
//         //     return config;
//         // }))
//         .csrf(csrf -> csrf.disable())
//         .authorizeHttpRequests(requests -> requests
//             .requestMatchers("/auth/**").permitAll()
//             .anyRequest().authenticated())
//         .exceptionHandling(ex -> ex.authenticationEntryPoint(point))
//         .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

//     http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);

//     return http.build();
// }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.disable()) // or configure CORS if frontend runs on another port
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/**").permitAll()
                .requestMatchers(org.springframework.http.HttpMethod.OPTIONS, "/**").permitAll() // ✅ allow preflight
                .anyRequest().authenticated()
            );

        return http.build();
    }


}

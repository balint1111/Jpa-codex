package com.example.tasksservice.security

import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.AuthenticationException
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.stereotype.Component
import org.springframework.web.reactive.function.client.WebClient
import org.springframework.web.reactive.function.client.WebClientResponseException

@Component
class RemoteAuthProvider(private val webClient: WebClient) : AuthenticationProvider {
    data class Role(val name: String)
    data class UserResponse(val username: String, val roles: List<Role>)

    override fun authenticate(authentication: Authentication): Authentication {
        val username = authentication.name
        val password = authentication.credentials.toString()
        try {
            val user = webClient.get()
                .uri("http://user-service:8081/api/me")
                .headers { it.setBasicAuth(username, password) }
                .retrieve()
                .bodyToMono(UserResponse::class.java)
                .block() ?: throw BadCredentialsException("Bad credentials")
            val authorities = user.roles.map { SimpleGrantedAuthority(it.name) }
            return UsernamePasswordAuthenticationToken(username, password, authorities)
        } catch (ex: WebClientResponseException) {
            throw BadCredentialsException("Bad credentials")
        }
    }

    override fun supports(authentication: Class<*>): Boolean {
        return UsernamePasswordAuthenticationToken::class.java.isAssignableFrom(authentication)
    }
}

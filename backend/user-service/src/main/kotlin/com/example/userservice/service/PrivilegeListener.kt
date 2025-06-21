package com.example.userservice.service

import com.example.userservice.repository.UserRepository
import org.springframework.kafka.annotation.KafkaListener
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component

@Component
class PrivilegeListener(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder
) {
    data class PrivilegeRequest(val username: String, val password: String)
    data class PrivilegeResponse(val roles: List<String>)

    @KafkaListener(topics = ["privilege.requests"], groupId = "user-service")
    @SendTo("privilege.responses")
    fun handle(request: PrivilegeRequest): PrivilegeResponse {
        val user = userRepository.findByUsername(request.username).orElse(null)
            ?: return PrivilegeResponse(emptyList())
        return if (passwordEncoder.matches(request.password, user.password)) {
            PrivilegeResponse(user.roles.map { it.name })
        } else {
            PrivilegeResponse(emptyList())
        }
    }
}

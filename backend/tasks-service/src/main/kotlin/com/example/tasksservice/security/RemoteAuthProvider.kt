package com.example.tasksservice.security

import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.AuthenticationException
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.stereotype.Component
import org.apache.kafka.clients.producer.ProducerRecord
import org.apache.kafka.common.header.internals.RecordHeader
import org.springframework.kafka.requestreply.ReplyingKafkaTemplate
import org.springframework.kafka.support.KafkaHeaders
import com.example.tasksservice.service.PrivilegeSaga.PrivilegeRequest
import com.example.tasksservice.service.PrivilegeSaga.PrivilegeResponse

@Component
class RemoteAuthProvider(
    private val kafka: ReplyingKafkaTemplate<String, PrivilegeRequest, PrivilegeResponse>
) : AuthenticationProvider {

    override fun authenticate(authentication: Authentication): Authentication {
        val username = authentication.name
        val password = authentication.credentials.toString()
        val request = PrivilegeRequest(username, password)
        val record = ProducerRecord<String, PrivilegeRequest>("privilege.requests", request).apply {
            headers().add(RecordHeader(KafkaHeaders.REPLY_TOPIC, "privilege.responses".toByteArray()))
        }
        return try {
            val response = kafka.sendAndReceive(record).get(5, java.util.concurrent.TimeUnit.SECONDS).value()
            if (response.roles.isEmpty()) {
                throw BadCredentialsException("Bad credentials")
            }
            val authorities = response.roles.map { SimpleGrantedAuthority(it) }
            UsernamePasswordAuthenticationToken(username, password, authorities)
        } catch (ex: Exception) {
            throw BadCredentialsException("Bad credentials")
        }
    }

    override fun supports(authentication: Class<*>): Boolean {
        return UsernamePasswordAuthenticationToken::class.java.isAssignableFrom(authentication)
    }
}

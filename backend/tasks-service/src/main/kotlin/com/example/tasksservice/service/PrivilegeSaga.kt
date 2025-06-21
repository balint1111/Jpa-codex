package com.example.tasksservice.service

import org.apache.kafka.clients.producer.ProducerRecord
import org.apache.kafka.common.header.internals.RecordHeader
import org.springframework.kafka.requestreply.ReplyingKafkaTemplate
import org.springframework.kafka.support.KafkaHeaders
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Component
import java.util.concurrent.TimeUnit

@Component("privilegeSaga")
class PrivilegeSaga(
    private val kafka: ReplyingKafkaTemplate<String, PrivilegeRequest, PrivilegeResponse>
) {
    data class PrivilegeRequest(val username: String, val password: String)
    data class PrivilegeResponse(val roles: List<String>)

    fun hasTaskPrivilege(auth: Authentication): Boolean {
        val request = PrivilegeRequest(auth.name, auth.credentials.toString())
        val record = ProducerRecord<String, PrivilegeRequest>("privilege.requests", request).apply {
            headers().add(RecordHeader(KafkaHeaders.REPLY_TOPIC, "privilege.responses".toByteArray()))
        }
        val future = kafka.sendAndReceive(record)
        val result = future.get(5, TimeUnit.SECONDS)
        val response = result.value()
        return response.roles.contains("TASK")
    }
}

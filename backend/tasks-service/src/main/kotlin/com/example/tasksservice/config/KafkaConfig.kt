package com.example.tasksservice.config

import org.springframework.kafka.core.ConsumerFactory
import org.springframework.kafka.core.ProducerFactory
import com.example.tasksservice.service.PrivilegeSaga.PrivilegeRequest
import com.example.tasksservice.service.PrivilegeSaga.PrivilegeResponse
import org.springframework.boot.autoconfigure.kafka.KafkaProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.kafka.annotation.EnableKafka
import org.springframework.kafka.core.*
import org.springframework.kafka.requestreply.ReplyingKafkaTemplate
import org.springframework.kafka.listener.KafkaMessageListenerContainer
import org.springframework.kafka.listener.ContainerProperties

@Configuration
@EnableKafka
class KafkaConfig(private val properties: KafkaProperties) {

    @Bean
    fun producerFactory(): ProducerFactory<String, PrivilegeRequest> =
        DefaultKafkaProducerFactory(properties.buildProducerProperties())

    @Bean
    fun consumerFactory(): ConsumerFactory<String, PrivilegeResponse> =
        DefaultKafkaConsumerFactory(properties.buildConsumerProperties())

    @Bean
    fun repliesContainer(cf: ConsumerFactory<String, PrivilegeResponse>): KafkaMessageListenerContainer<String, PrivilegeResponse> {
        val containerProps = ContainerProperties("privilege.responses")
        return KafkaMessageListenerContainer(cf, containerProps)
    }

    @Bean
    fun replyingKafkaTemplate(
        pf: ProducerFactory<String, PrivilegeRequest>,
        repliesContainer: KafkaMessageListenerContainer<String, PrivilegeResponse>
    ): ReplyingKafkaTemplate<String, PrivilegeRequest, PrivilegeResponse> = ReplyingKafkaTemplate(pf, repliesContainer)

    @Bean
    fun kafkaTemplate(pf: ProducerFactory<String, PrivilegeRequest>): KafkaTemplate<String, PrivilegeRequest> = KafkaTemplate(pf)
}

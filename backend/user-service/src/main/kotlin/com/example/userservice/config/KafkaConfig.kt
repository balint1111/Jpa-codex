package com.example.userservice.config

import org.springframework.kafka.core.ConsumerFactory
import org.springframework.kafka.core.ProducerFactory
import org.springframework.boot.autoconfigure.kafka.KafkaProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory
import org.springframework.kafka.core.*
import org.springframework.kafka.annotation.EnableKafka

@Configuration
@EnableKafka
class KafkaConfig(private val properties: KafkaProperties) {

    @Bean
    fun producerFactory(): ProducerFactory<String, Any> =
        DefaultKafkaProducerFactory(properties.buildProducerProperties())

    @Bean
    fun consumerFactory(): ConsumerFactory<String, Any> =
        DefaultKafkaConsumerFactory(properties.buildConsumerProperties())

    @Bean
    fun kafkaTemplate(pf: ProducerFactory<String, Any>): KafkaTemplate<String, Any> =
        KafkaTemplate(pf)

    @Bean
    fun kafkaListenerContainerFactory(cf: ConsumerFactory<String, Any>): ConcurrentKafkaListenerContainerFactory<String, Any> {
        val factory = ConcurrentKafkaListenerContainerFactory<String, Any>()
        factory.consumerFactory = cf
        return factory
    }
}

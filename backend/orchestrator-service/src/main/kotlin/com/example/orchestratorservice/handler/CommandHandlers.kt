package com.example.orchestratorservice.handler

import com.example.orchestratorservice.api.CreateTaskCommand
import com.example.orchestratorservice.api.RegisterUserCommand
import org.axonframework.commandhandling.CommandHandler
import org.springframework.stereotype.Component
import org.springframework.web.reactive.function.client.WebClient

@Component
class CommandHandlers(private val webClient: WebClient) {

    @CommandHandler
    fun handle(cmd: RegisterUserCommand) {
        webClient.post()
            .uri("http://user-service:8081/api/register")
            .bodyValue(mapOf("username" to cmd.username, "password" to cmd.password))
            .retrieve()
            .bodyToMono(Void::class.java)
            .block()
    }

    @CommandHandler
    fun handle(cmd: CreateTaskCommand) {
        webClient.post()
            .uri("http://tasks-service:8082/api/tasks")
            .bodyValue(mapOf("description" to cmd.description, "assignee" to cmd.assignee))
            .retrieve()
            .bodyToMono(Void::class.java)
            .block()
    }
}

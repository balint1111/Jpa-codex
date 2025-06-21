package com.example.orchestratorservice

import com.example.orchestratorservice.api.CreateTaskCommand
import com.example.orchestratorservice.api.RegisterUserCommand
import org.axonframework.commandhandling.gateway.CommandGateway
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class OrchestratorController(private val commandGateway: CommandGateway) {

    @PostMapping("/orchestrate/register")
    fun register(@RequestBody cmd: RegisterUserCommand) {
        commandGateway.sendAndWait<Void>(cmd)
    }

    @PostMapping("/orchestrate/tasks")
    fun createTask(@RequestBody cmd: CreateTaskCommand) {
        commandGateway.sendAndWait<Void>(cmd)
    }
}

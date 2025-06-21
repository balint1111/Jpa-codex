package com.example.orchestratorservice.api

data class RegisterUserCommand(val username: String, val password: String)

data class CreateTaskCommand(val description: String, val assignee: String)

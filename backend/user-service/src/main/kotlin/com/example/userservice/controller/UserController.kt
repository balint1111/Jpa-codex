package com.example.userservice.controller

import com.example.userservice.entity.Role
import com.example.userservice.entity.User
import com.example.userservice.repository.RoleRepository
import com.example.userservice.repository.UserRepository
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import java.security.Principal
import java.util.*

@RestController
@RequestMapping("/api")
class UserController(
    private val userRepository: UserRepository,
    private val roleRepository: RoleRepository
) {

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    fun register(@RequestBody request: Map<String, String>): User {
        val username = request["username"] ?: throw IllegalArgumentException("username required")
        val password = request["password"] ?: throw IllegalArgumentException("password required")
        val role = roleRepository.findById(1L).orElse(Role(name = "USER"))
        return userRepository.save(User(username = username, password = password, roles = setOf(role)))
    }

    @GetMapping("/users")
    fun all(): List<User> = userRepository.findAll()

    @GetMapping("/me")
    fun me(principal: Principal): User = userRepository.findByUsername(principal.name).orElseThrow()
}

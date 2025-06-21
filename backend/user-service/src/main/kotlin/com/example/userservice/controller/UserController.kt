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
    private val roleRepository: RoleRepository,
    private val passwordEncoder: org.springframework.security.crypto.password.PasswordEncoder) {

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    fun register(@RequestBody request: Map<String, String>): User {
        val username = request["username"] ?: throw IllegalArgumentException("username required")
        val password = request["password"] ?: throw IllegalArgumentException("password required")
        val role = roleRepository.findById(1L).orElseGet { roleRepository.save(Role(name = "USER")) }
        val encoded = passwordEncoder.encode(password)
        return userRepository.save(User(username = username, password = encoded, roles = setOf(role)))
    }

    @GetMapping("/users")
    fun all(): List<User> = userRepository.findAll()

    @DeleteMapping("/users/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun delete(@PathVariable id: UUID) {
        userRepository.deleteById(id)
    }

    @GetMapping("/me")
    fun me(principal: Principal): User = userRepository.findByUsername(principal.name).orElseThrow()
}

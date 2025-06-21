package com.example.userservice.controller

import com.example.userservice.entity.Role
import com.example.userservice.entity.User
import com.example.userservice.repository.RoleRepository
import com.example.userservice.repository.UserRepository
import org.springframework.http.HttpStatus
import org.springframework.security.access.prepost.PreAuthorize
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
        val role = roleRepository.findByName("USER").orElseGet { roleRepository.save(Role(name = "USER")) }
        val encoded = passwordEncoder.encode(password)
        return userRepository.save(User(username = username, password = encoded, roles = setOf(role)))
    }

    @GetMapping("/users")
    @PreAuthorize("hasAuthority('DASHBOARD')")
    fun all(): List<User> = userRepository.findAll()

    @GetMapping("/users/{id}")
    @PreAuthorize("hasAuthority('DASHBOARD')")
    fun get(@PathVariable id: UUID): User = userRepository.findById(id).orElseThrow()

    @PutMapping("/users/{id}/roles")
    @PreAuthorize("hasAuthority('DASHBOARD')")
    fun updateRoles(@PathVariable id: UUID, @RequestBody request: Map<String, List<String>>): User {
        val names = request["roles"] ?: emptyList()
        val roles = names.mapNotNull { roleRepository.findByName(it).orElse(null) }.toSet()
        val user = userRepository.findById(id).orElseThrow()
        val updated = User(id = user.id, username = user.username, password = user.password, roles = roles)
        return userRepository.save(updated)
    }

    @DeleteMapping("/users/{id}")
    @PreAuthorize("hasAuthority('DASHBOARD')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun delete(@PathVariable id: UUID) {
        userRepository.deleteById(id)
    }

    @GetMapping("/roles")
    @PreAuthorize("hasAuthority('DASHBOARD')")
    fun roles(): List<Role> = roleRepository.findAll()

    @GetMapping("/me")
    fun me(principal: Principal): User = userRepository.findByUsername(principal.name).orElseThrow()
}

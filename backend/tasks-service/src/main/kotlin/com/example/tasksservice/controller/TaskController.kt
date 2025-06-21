package com.example.tasksservice.controller

import com.example.tasksservice.entity.Task
import com.example.tasksservice.repository.TaskRepository
import java.util.UUID
import org.springframework.http.HttpStatus
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/tasks")
class TaskController(private val taskRepository: TaskRepository) {

    @GetMapping
    @PreAuthorize("hasAuthority('TASK')")
    fun all(): List<Task> = taskRepository.findAll()

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('TASK')")
    fun one(@PathVariable id: UUID): Task = taskRepository.findById(id).orElseThrow()

    @PostMapping
    @PreAuthorize("hasAuthority('TASK')")
    @ResponseStatus(HttpStatus.CREATED)
    fun create(@RequestBody task: Task): Task = taskRepository.save(task)

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('TASK')")
    fun update(@PathVariable id: UUID, @RequestBody updated: Task): Task {
        val existing = taskRepository.findById(id).orElseThrow()
        val task = existing.copy(description = updated.description, completed = updated.completed, userId = updated.userId)
        return taskRepository.save(task)
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('TASK')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun delete(@PathVariable id: UUID) {
        taskRepository.deleteById(id)
    }
}

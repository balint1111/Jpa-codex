package com.example.tasksservice.controller

import com.example.tasksservice.entity.Task
import com.example.tasksservice.repository.TaskRepository
import org.springframework.http.HttpStatus
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/tasks")
class TaskController(private val taskRepository: TaskRepository) {

    @GetMapping
    @PreAuthorize("hasRole('TASK')")
    fun all(): List<Task> = taskRepository.findAll()

    @PostMapping
    @PreAuthorize("hasRole('TASK')")
    @ResponseStatus(HttpStatus.CREATED)
    fun create(@RequestBody task: Task): Task = taskRepository.save(task)
}

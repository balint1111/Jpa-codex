package com.example.tasksservice.controller

import com.example.tasksservice.entity.Task
import com.example.tasksservice.repository.TaskRepository
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/tasks")
class TaskController(private val taskRepository: TaskRepository) {

    @GetMapping
    fun all(): List<Task> = taskRepository.findAll()

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun create(@RequestBody task: Task): Task = taskRepository.save(task)
}

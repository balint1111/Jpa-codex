package com.example.tasksservice.entity

import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "tasks")
data class Task(
    @Id @GeneratedValue
    val id: UUID? = null,
    val description: String,
    val completed: Boolean = false,
    val userId: UUID? = null
)

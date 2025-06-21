package com.example.tasksservice.repository

import com.example.tasksservice.entity.Task
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface TaskRepository : JpaRepository<Task, UUID>

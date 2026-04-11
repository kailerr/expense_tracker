package com.example.tracker.repository;

import com.example.tracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> 
{
    //search by category
    List<Expense> findByCategory(String category);

    //search by keyword
    List<Expense> findByDescriptionContainingIgnoreCase(String keyword);
}
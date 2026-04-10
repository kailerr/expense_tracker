package com.example.tracker.controller;

import com.example.tracker.model.Expense;
import com.example.tracker.repository.ExpenseRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "*") // cho phép React gọi API

public class ExpenseController {

    private final ExpenseRepository expenseRepository;

    // Constructor injection
    public ExpenseController(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    // =========================
    // GET ALL EXPENSES
    // =========================
    @GetMapping
    public List<Expense> getAll() {
        return expenseRepository.findAll();
    }

    // =========================
    // CREATE EXPENSE
    // =========================
    @PostMapping
    public Expense create(@RequestBody Expense expense) {
        return expenseRepository.save(expense);
    }

    // =========================
    // GET ONE BY ID
    // =========================
    @GetMapping("/{id}")
    public Expense getById(@PathVariable Long id) {
        return expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));
    }

    // =========================
    // UPDATE EXPENSE
    // =========================
    @PutMapping("/{id}")
    public Expense update(@PathVariable Long id, @RequestBody Expense newExpense) {

        return expenseRepository.findById(id).map(expense -> {

            // update từng field
            expense.setDescription(newExpense.getDescription());
            expense.setAmount(newExpense.getAmount());
            expense.setCategory(newExpense.getCategory());

            return expenseRepository.save(expense);

        }).orElseThrow(() -> new RuntimeException("Expense not found"));
    }

    // =========================
    // DELETE EXPENSE
    // =========================
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        expenseRepository.deleteById(id);
    }
}
package com.example.tracker.controller;

import com.example.tracker.model.Expense;
import com.example.tracker.repository.ExpenseRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "*") // allow frontend to access API
public class ExpenseController 
{
    private final ExpenseRepository expenseRepository;

    // constructor injection
    public ExpenseController(ExpenseRepository expenseRepository) 
    {
        this.expenseRepository = expenseRepository;
    }


    // =============GET ALL EXPENSES============

    @GetMapping
    public List<Expense> getAllExpenses() 
    {
        return expenseRepository.findAll();
    }

  
    // ==============CREATE NEW EXPENSE==================

    @PostMapping
    public Expense createExpense(@RequestBody Expense expense) 
    {
        return expenseRepository.save(expense);
    }

    // =========GET EXPENSE BY ID============

    @GetMapping("/{id}")
    public Expense getExpenseById(@PathVariable Long id) 
    {
        return expenseRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Expense not found with id: " + id));
    }

 
    // ==============UPDATE EXPENSE=============

    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable Long id, @RequestBody Expense updatedExpense) 
    {

        return expenseRepository.findById(id).map(expense -> 
        {
            // update fields
            expense.setDescription(updatedExpense.getDescription());
            expense.setAmount(updatedExpense.getAmount());
            expense.setCategory(updatedExpense.getCategory());

            return expenseRepository.save(expense);

        })
        .orElseThrow(() -> new RuntimeException("Expense not found with id: " + id));
    }

    // =========DELETE EXPENSE=============

    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) 
    {
        expenseRepository.deleteById(id);
    }
}
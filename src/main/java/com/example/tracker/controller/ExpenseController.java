package com.example.tracker.controller;

import com.example.tracker.model.Expense;
import com.example.tracker.service.ExpenseService;
import org.springframework.web.bind.annotation.*;

import com.example.tracker.repository.ExpenseRepository;
import com.example.tracker.repository.UserRepository; 

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "*") // allow frontend to access API
public class ExpenseController 
{
    private final ExpenseService expenseService;
    private final UserRepository userRepo;

    // constructor injection
    public ExpenseController(ExpenseService expenseService, UserRepository userRepo) 
    {
        this.expenseService = expenseService;
        this.userRepo = userRepo;
    }



    // =============GET ALL EXPENSES============
    @GetMapping
    public List<Expense> getAllExpenses() 
    {
        //delegate to service to get all expense
        return expenseService.getAll();
    }


  
    // ==============CREATE NEW EXPENSE==================

    @PostMapping
    public Expense createExpense(@RequestBody Expense expense) 
    {
        return expenseService.save(expense);
    }


    // =========GET EXPENSE BY ID============
    @GetMapping("/{id}")
    public Expense getExpenseById(@PathVariable Long id) 
    {
        //find expense by id using service
        return expenseService.getAll().stream()
            .filter(e -> e.getId().equals(id))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Expense not found with id: " + id));
    }


    // ==============UPDATE EXPENSE=============
    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable Long id, @RequestBody Expense updatedExpense) 
    {

        //find existing expense
        Expense expense = expenseService.getAll().stream()
            .filter(e -> e.getId().equals(id))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Expense not found"));

        //update field
        expense.setDescription(updatedExpense.getDescription());
        expense.setAmount(updatedExpense.getAmount());
        expense.setCategory(updatedExpense.getCategory());

        return expenseService.save(expense);
    }


    // =========DELETE EXPENSE=============
    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) 
    {
        //delegate to service to delete expense by id
        expenseService.delete(id);
    }
}//test
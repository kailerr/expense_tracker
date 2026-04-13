package com.example.tracker.controller;

import com.example.tracker.model.Expense;
import com.example.tracker.service.ExpenseService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> createExpense(@Valid @RequestBody Expense expense) 
    {
        Expense save = expenseService.createExpense(expense);
        return ResponseEntity.ok(save);
    }


    // =========GET EXPENSE BY ID============
    @GetMapping("/{id}")
    public Expense getExpenseById(@PathVariable Long id) 
    {
        return expenseService.getById(id);
    }


    // ==============UPDATE EXPENSE=============
    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable Long id, @RequestBody Expense updatedExpense) 
    {
        return expenseService.update(id, updatedExpense);
    }



    // =========DELETE EXPENSE=============
    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) 
    {
        //delegate to service to delete expense by id
        expenseService.delete(id);
    }


    // ===========ADD SEARCH=============
    @GetMapping("/search")
    public List<Expense> search(@RequestParam(value = "category", required = false) String category,
                                @RequestParam(value = "keyword", required = false) String keyword) 
    {

        if (category != null) 
        {
            return expenseService.searchByCategory(category);
        }

        if (keyword != null) 
        {
            return expenseService.searchByKeyword(keyword);
        }

        return expenseService.getAll();
    }
}
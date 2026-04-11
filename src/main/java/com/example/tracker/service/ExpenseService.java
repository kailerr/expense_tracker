package com.example.tracker.service;

import com.example.tracker.model.Expense;
import com.example.tracker.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService 
{
    private final ExpenseRepository repo;

    //constructor injection of repository
    public ExpenseService(ExpenseRepository repo) 
    {
        this.repo = repo;
    }

    //get all expenses from database
    public List<Expense> getAll() 
    {
        return repo.findAll();
    }

    //get expense by id
    public Expense getById(Long id) 
    {
        return repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Expense not found"));
    }
    public Expense save(Expense expense) 
    {
        return repo.save(expense);
    }
    public Expense update(Long id, Expense newExpense) 
    {
        Expense expense = getById(id);

        expense.setDescription(newExpense.getDescription());
        expense.setAmount(newExpense.getAmount());
        expense.setCategory(newExpense.getCategory());

        return repo.save(expense);
    }

    //delete expense by id
    public void delete(Long id) 
    {
        repo.deleteById(id);
    }

    //search by keyword
        public List<Expense> searchByKeyword(String keyword) 
    {
        return repo.findByDescriptionContainingIgnoreCase(keyword);
    }

    // search by category
    public List<Expense> searchByCategory(String category) 
    {
        return repo.findByCategory(category);
    }
}
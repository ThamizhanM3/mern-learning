import React, { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseItem from "./components/ExpenseItem";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Expense() {
    const [expenses, setExpenses] = useState([]);
    const [calculatedAmount, setCalculatedAmount] = useState({
        amount: 0,
        expense: 0,
        balance: 0,
    });

    const [cookies, setCookies, removeCookies] = useCookies()
    
    useEffect(() => {
        fetchDetails()
    }, []);
    
    useEffect(() => {
        let income = 0,
            expense = 0;
        expenses.forEach((exp) => {
            if (exp.amount > 0) {
                income += parseFloat(exp.amount);
            } else {
                expense += parseFloat(exp.amount);
            }
        });
        
        const balance = income + expense;
        setCalculatedAmount({
            income: parseFloat(income),
            expense: parseFloat(expense),
            balance,
        });
    }, [expenses]);
    
    const fetchDetails = () => {
        fetch(`http://localhost:8000/expense/all/${cookies.userdetails.userid}`, {
            headers: {
                'Authorization': `Bearer ${cookies.token}`
            }
        }).then(res => res.json())
            .then(data => setExpenses(data))
            .then(() => { console.log(cookies.userdetails.userid); })
            .catch((err) => { console.log(err); })
    }

    const addExpense = (title, amount) => {
        fetch(`http://localhost:8000/expense/new/${cookies.userdetails.userid}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount,
                category: title,
                userId: "66209ac899a358114911fdbc",
                date: new Date(),
            }),
        }).then(() => {
            fetchDetails()
        }).catch((err) => { console.log(err); })
    };

    const deleteExpense = (id) => {
        // setExpenses(expenses.filter((exp) => exp.id !== id));
        fetch(`http://localhost:8000/expense/delete/${id}`, {
            method: 'delete'
        }).then(() => {
            fetchDetails()
        }).catch((err) => { console.log(err); })
    };

    return (
        <>
            <div>
                <div>Expense Tracker</div>
                <div className="balance">Balance: {calculatedAmount.balance}</div>
                <div className="income-expense-container">
                    <div className="income">
                        <span className="title">Income</span>
                        <span>{calculatedAmount.income}</span>
                    </div>
                    <div className="block"></div>
                    <div className="expense">
                        <span className="title">Expense</span>
                        <span>{calculatedAmount.expense}</span>
                    </div>
                </div>
                <ExpenseForm addExpense={addExpense} removeCookies={removeCookies} />
            </div>
            {expenses.map((expense) => (
                <ExpenseItem
                    key={expense.id}
                    title={expense.category}
                    amount={expense.amount}
                    id={expense._id}
                    deleteExpense={deleteExpense}
                />
            ))}
        </>
    );
}
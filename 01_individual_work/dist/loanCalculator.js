"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateLoanSchedule = calculateLoanSchedule;
function calculateLoanSchedule(loanAmount, monthlySalaryUsd, months = 6) {
    let annualInterestRate;
    // ლოგიკა: if/else კონსტრუქციით მოწმდება კლიენტის ხელფასი
    if (monthlySalaryUsd > 2000) {
        annualInterestRate = 0.1; // 10%
    }
    else {
        annualInterestRate = 0.14; // 14%
    }
    const monthlyInterestRate = annualInterestRate / 12;
    const fixedPrincipal = loanAmount / months;
    let remainingPrincipal = loanAmount;
    const schedule = [];
    // ციკლი: for ციკლის საშუალებით გამოაქვს მომდევნო 6 თვის გადახდის გრაფიკი
    for (let month = 1; month <= months; month++) {
        const interestAmount = remainingPrincipal * monthlyInterestRate;
        const monthlyPayment = fixedPrincipal + interestAmount;
        remainingPrincipal = Math.max(0, remainingPrincipal - fixedPrincipal);
        const installment = {
            month,
            monthlyPayment: Number(monthlyPayment.toFixed(2)),
            principalAmount: Number(fixedPrincipal.toFixed(2)),
            interestAmount: Number(interestAmount.toFixed(2)),
            remainingPrincipal: Number(remainingPrincipal.toFixed(2)),
        };
        schedule.push(installment);
        console.log(`თვე ${installment.month}: ${installment.monthlyPayment} ლარი (ძირი: ${installment.principalAmount} ლარი, პროცენტი: ${installment.interestAmount} ლარი, ნაშთი: ${installment.remainingPrincipal} ლარი)`);
    }
    return {
        loanAmount,
        monthlySalaryUsd,
        annualInterestRate: annualInterestRate * 100,
        schedule,
    };
}
// გაშვების მაგალითები
console.log("=== სტუდენტი 1: სესხის კალკულატორი ===");
console.log("შემთხვევა 1 (ხელფასი > 2000$ -> 10%):");
calculateLoanSchedule(6000, 2500, 6);
console.log("\nშემთხვევა 2 (ხელფასი <= 2000$ -> 14%):");
calculateLoanSchedule(6000, 1500, 6);

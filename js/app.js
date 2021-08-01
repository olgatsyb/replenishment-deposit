'use strict';
function calculateResults(amount, period) {
    function convertToRatesString(periods){
        const percentLevel = periods;
        const firstPercent = 2; // for 3-5 months
        const secondPercent = 2.2; // for 6-8 months
        const thirdPercent = 2.3; // for 9-11 months
        const fourthPercent = 2.6; // for 12-17 months
        const fifthPercent = 2.7; // for 18 months
        if (percentLevel <= 5) {
            return firstPercent;
        } else {
            if (percentLevel >= 6 && percentLevel <= 8) {return secondPercent;}
            if (percentLevel >= 9 && percentLevel <= 11) {return thirdPercent;}
            if (percentLevel >= 12 && percentLevel <= 17) {return fourthPercent;}
            if (percentLevel >= 18) {return fifthPercent;}
        }
    }
    const percent = convertToRatesString(period);
    const total = amount * (1 + percent / 100 / 12) ** period;
    const profit = total - amount;
    return {
        percent,
        total,
        profit,
    };

}
function handleSubmit(evt) {
    evt.preventDefault();

    totalEl.textContent = '';
    profitEl.textContent = '';
    percentEl.textContent = '';
    amountErrorEl.textContent = '';
    periodErrorEl.textContent = '';

    const amount = Number(amountInputEl.value);
    if (Number.isNaN(amount)){
        amountErrorEl.textContent = 'Неверное значение. Введите число, например: 15000';
        return;
    }
    if (amount < 15000) {
        amountErrorEl.textContent = 'Неверное значение. Минимальная сумма: 15000 ₽';
        return;
    }
    if (amount > 50000000) {
        amountErrorEl.textContent = 'Неверное значение. Максимальная сумма: 50000000 ₽';
        return;
    }

    const period = Number(periodInputEl.value);
    if (Number.isNaN(period)){
        periodErrorEl.textContent = 'Неверное значение. Введите число месяцев, например: 3';
        return;
    }
    if (period < 3) {
        periodErrorEl.textContent = 'Неверное значение. Минимальный период: 3 месяца';
        return;
    }
    if (period > 18) {
        periodErrorEl.textContent = 'Неверное значение. Максимальный период: 18 месяцев';
        return;
    }



    const result = calculateResults(amount, period);
    totalEl.textContent = result.total.toFixed(0);
    profitEl.textContent = result.profit.toFixed(0);
    percentEl.textContent = result.percent.toFixed(1);
}

const formEl = document.getElementById('deposit-form');
formEl.addEventListener('submit', handleSubmit, true);

const amountInputEl = document.getElementById ('amount-input');
const periodInputEl = document.getElementById ('period-input');
const amountErrorEl = document.getElementById('amount-error');
const periodErrorEl = document.getElementById('period-error');
const totalEl = document.getElementById('total');
const profitEl = document.getElementById('profit');
const percentEl = document.getElementById('percent');
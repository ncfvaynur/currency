
document.addEventListener("DOMContentLoaded", function () {
// Methods
const firstInput = document.getElementById("first-input");
const secondInput = document.getElementById("second-input");
const currency = document.querySelectorAll(".currency");
const currency1 = document.querySelectorAll(".currency1");
const one = document.getElementsByName("one");
const two = document.getElementsByName("two");
const rubl = document.getElementById("rubl");
const dollar = document.getElementById("dollar");
const euro = document.getElementById("euro");
const fs = document.getElementById("fs");
const rubl1 = document.getElementById("rubl1");
const dollar1 = document.getElementById("dollar1");
const euro1 = document.getElementById("euro1");
const fs1 = document.getElementById("fs1");
const list = document.querySelector(".list");
const heading = document.querySelector("h1");

    // Functions
    let first;
    let second;

    function changeOfCurrencies(e) {
        if (e.target.className == "currency" || e.target.className == "currency1") {
            const changes = [...e.target.parentElement.children];
            changes.forEach(item => {
                if (item.classList.contains("change")) {
                    item.classList.remove("change");
                }
            });
            e.target.classList.add("change");
            calculateOnClassChange();
        }
    }

    const calculateOnClassChange = () => {
        one.forEach(item => {
            if (item.classList.contains("change")) {
                first = item.innerText;
            }
        });

        two.forEach(item => {
            if (item.classList.contains("change")) {
                second = item.innerText;
            }
        });

        const url = 'http://api.exchangerate.host/convert';
        const key = 'c2527c1c915a59145032558ad151a60e';
        let input1 = Number(firstInput.value);

        fetch(`${url}?access_key=${key}&from=${first}&to=${second}&amount=${input1}`)
            .then(r => r.json())
            .then((data) => {
                secondInput.value = data.result;
                console.log(data.result);
                console.log(data);
            })
            .catch(error => {
                alert("Internet bağlantınızı kontrol edin");
                console.log("Internet bağlantınızı kontrol edin");
            });
    };
    const updateExchangeRateText = (rate) => {
        const exchangeRateElement = document.getElementById("exchange-rate-text");
        exchangeRateElement.textContent = `1 ${first} = ${rate} ${second}`;
    };
    

    // Add event listener to currency buttons for class change
    currency.forEach(button => {
        button.addEventListener("click", changeOfCurrencies);
    });

    currency1.forEach(button => {
        button.addEventListener("click", changeOfCurrencies);
    });

    // Add event listener to the second input for input changes
    secondInput.addEventListener("input", calculateOnClassChange);

    one.forEach(button => {
        button.addEventListener("click", calculateOnClassChange);
    });

    // Other existing code...

    firstInput.addEventListener("input", calculateOnClassChange);
});

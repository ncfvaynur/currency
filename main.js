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

    const isNumeric = (value) => {
        return !isNaN(parseFloat(value)) && isFinite(value);
    };

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

        const url = "https://v6.exchangerate-api.com/v6";
        const key = '8732f75239e1f369e3a9d869';
        let input1 = Number(firstInput.value);

        if (!isNumeric(input1)) {
            alert("Please enter a valid numeric value.");
            return;
        }

        fetch(`${url}/${key}/pair/${first}/${second}/${input1}`)
            .then(r => r.json())
            .then((data) => {
                secondInput.value = data.conversion_result.toFixed(2);

                // Display exchange rate in the "exchange-rate" paragraph
                const exchangeRateParagraph = document.querySelector(".exchange-rate");
                exchangeRateParagraph.textContent = `Exchange Rate: 1 ${first} = ${data.conversion_rate} ${second}`;

                const exchangeRateParagraph2 = document.querySelector(".exchange-rate1");
                exchangeRateParagraph2.textContent = `Exchange Rate: 1 ${second} = ${1 / data.conversion_rate} ${first}`;

                console.log(data.conversion_result);
                console.log(data);
            })
            .catch(error => {
                alert("Internet bağlantınızı kontrol edin");
                console.log("Internet bağlantınızı kontrol edin");
            });
    };

    // Add event listener to the second input for input changes
    secondInput.addEventListener("input", function () {
        // Allow any input
        calculateOnClassChange();
    });
    

    // Add event listener to the first input for input changes
    firstInput.addEventListener("input", function () {
        // Allow any input
        calculateOnClassChange();
    });

        // Add event listener to the second input for input changes
        secondInput.addEventListener("input", function () {
            // Allow only numbers and a dot (for decimal values)
            const inputValue = secondInput.value.replace(/[^0-9.]/g, '');
            secondInput.value = inputValue;
    
            calculateOnClassChange();
        });
    
        // Add event listener to the first input for input changes
        firstInput.addEventListener("input", function () {
            // Allow only numbers and a dot (for decimal values)
            const inputValue = firstInput.value.replace(/[^0-9.]/g, '');
            firstInput.value = inputValue;
    
            calculateOnClassChange();
        });
        
    // Add event listener to currency buttons for class change
    currency.forEach(button => {
        button.addEventListener("click", changeOfCurrencies);
    });

    currency1.forEach(button => {
        button.addEventListener("click", changeOfCurrencies);
    });

    one.forEach(button => {
        button.addEventListener("click", calculateOnClassChange);
    });

    firstInput.addEventListener("input", calculateOnClassChange);
});

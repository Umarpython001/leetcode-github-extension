let submit_btn = document.querySelector("button[data-e2e-locator='console-submit-button']")
console.log(submit_btn)

/*
If Rejected
    "Rejected" will be in a h3 with text content of Wrong Answer
        
If Accepted
    It is in a span element with "data-e2e-locator="submission-result" with "Accepted" as text content

*/

function check_if_solution_is_accepted_or_rejeted(timeout = 1200000) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();

        const checkResult = () => {
            const negative = document.querySelectorAll('h3');
            const positive = document.querySelector('span[data-e2e-locator="submission-result"]');

            
            for (let element of negative){
                
                if (element.textContent == "Rejected"){
                    negative = true
                }

            }

            if (positive) {
                observer.disconnect();
                resolve({
                    type: "positive",
                    element: positive
                });
                return;
            }

            if (negative) {
                observer.disconnect();
                resolve({
                    type: "negative",
                    element: negative
                });
                return;
            }

            if (Date.now() - startTime >= timeout) {
                observer.disconnect();
                reject(new Error("Timed out waiting for result"));
            }
        };

        const observer = new MutationObserver(checkResult); //Instantiates an observer object

        observer.observe(document.body, { //Tells the observer object to observe the document body (Node) for changes in childList(Added or removed elements) and subtree(Descendants of the Node)
            childList: true,               //It calls the checkResult function whenever a mutation in these configurations are observed. 
            subtree: true
        });

        // Check immediately in case the elements already exist
        checkResult();
    });
}




submit_btn.addEventListener("click", (event) => {


    // Check if the solution is accepted or rejected
    check_if_solution_is_accepted_or_rejeted()

})



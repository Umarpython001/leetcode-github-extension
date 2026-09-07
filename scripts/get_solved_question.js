let submit_btn = document.querySelector("button[data-e2e-locator='console-submit-button']")

const currentUrl = window.location.href;

let description_tab = document.querySelector(".flexlayout__layout")

description_tab = Array.from(description_tab.children)

description_tab = (description_tab[3])

description_tab = (Array.from(((Array.from(description_tab.getElementsByTagName("div")))[0]).getElementsByTagName("div")))[0]

let problem_number_and_name = Array.from(((Array.from(description_tab.getElementsByTagName("div")))[0]).getElementsByTagName("a"))[0]

console.log(problem_number_and_name.textContent)


/*
If Rejected
    "Rejected" will be in a h3 with text content of Wrong Answer
        
If Accepted
    It is in a span element with "data-e2e-locator="submission-result" with "Accepted" as text content

*/

function check_if_solution_is_accepted_or_rejeted(timeout = 10000) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        // console.log("PROMISE DEFINED!!!")

        const checkResult = () => {

            const accepted = document.querySelector('span[data-e2e-locator="submission-result"]');
            // const runtime_error =document.querySelector('span[data-e2e-locator="console-result"]'); //I'll handle other error messages later

            const allH3 = document.querySelectorAll('h3');
            const wrong_answer = allH3[0]

            if (accepted) {
                observer.disconnect();
                // console.log("OBSERVER HAS BEEN DISCONNECTED. CORRECT ANSWERRRR")

                resolve({
                    type: "Accepted",
                    element: accepted
                });
                return;
            }

            if (wrong_answer) {
                observer.disconnect();
                // console.log("OBSERVER HAS BEEN DISCONNECTED. WRONG ANSWERRRR")

                resolve({
                    type: "wrong_answer",
                    element: wrong_answer
                });
                return;
            }

            if (Date.now() - startTime >= timeout) {
                observer.disconnect();
                // console.log("OBSERVER HAS BEEN DISCONNECTED. TIME EXCEEDED")

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


if (submit_btn){
    // console.log(submit_btn)




    submit_btn.addEventListener("click", (event) => {
        // console.log("SUBMIT BUTTON CLICKED")


        //Get all information about the problem to send it to the backend. 
        // Problem name and number
        // Difficulty, 
        //




        let code_string = document.querySelector("div[role='presentation'][data-mprt='8']")

        if (code_string){

            // console.log(code_string)
            
        }


        // Check if the solution is accepted or rejected
        check_if_solution_is_accepted_or_rejeted()
        .then((obj) => {
            
            // console.log(obj)



        }) //Get correct solution and pass it to the backend
        .catch((error) => {


            // console.log(error)

        }) //Do nothing after. Wait for the submit button to be clicked on again

    })



}



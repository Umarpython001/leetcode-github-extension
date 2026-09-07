let submit_btn = document.querySelector("button[data-e2e-locator='console-submit-button']");

/*
If Rejected
    "Rejected" will be in a h3 with text content of Wrong Answer

If Accepted
    It is in a span element with "data-e2e-locator="submission-result" with "Accepted" as text content
*/

function check_if_solution_is_accepted_or_rejeted(timeout = 10000) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();

        const checkResult = () => {
            const accepted = document.querySelector('span[data-e2e-locator="submission-result"]');

            const allH3 = Array.from(document.querySelectorAll('h3'));
            const wrong_answer = allH3.find(el => el.textContent.trim() === "Wrong Answer");

            if (accepted) {
                observer.disconnect();
                resolve({
                    type: "Accepted",
                    element: accepted
                });
                return;
            }

            if (wrong_answer) {
                observer.disconnect();
                resolve({
                    type: "wrong_answer",
                    element: wrong_answer
                });
                return;
            }

            if (Date.now() - startTime >= timeout) {
                observer.disconnect();
                reject(new Error("Timed out waiting for result"));
            }
        };

        const observer = new MutationObserver(checkResult);
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        checkResult();
    });
}

if (submit_btn) {
    submit_btn.addEventListener("click", (event) => {
        console.log("SUBMIT BUTTON CLICKED");

        // 1. Get Problem name and number (fetched at time of click for SPA support)
        let problem_info = "";
        let description_tab_el = document.querySelector(".flexlayout__layout");
        if (description_tab_el) {
            let children = Array.from(description_tab_el.children);
            let tab = children[3];
            if (tab) {
                let firstDiv = Array.from(tab.getElementsByTagName("div"))[0];
                if (firstDiv) {
                    let innerDiv = Array.from(firstDiv.getElementsByTagName("div"))[0];
                    if (innerDiv) {
                        let link = Array.from(innerDiv.getElementsByTagName("a"))[0];
                        if (link) problem_info = link.textContent;
                    }
                }
            }
        }

        console.log(problem_info)

        // 2. Get the code the user wrote
        let code_string_holder = document.querySelector("div[role='presentation'][data-mprt='8']");
        let code_str = "";

        if (code_string_holder) {
            let each_line = code_string_holder.querySelectorAll("div.view-line");
            for (let line of each_line) {
                let line_holder = line.firstElementChild;
                if (line_holder) {
                    // Replace non-breaking spaces ( ) with regular spaces
                    code_str += line_holder.textContent.replace(/ /g, ' ') + "\n";
                }
            }
        }

        console.log(code_str)

        // 3. Check if the solution is accepted and then handle result
        check_if_solution_is_accepted_or_rejeted()
            .then((obj) => {
                if (obj.type === "Accepted") {
                    console.log("Solution Accepted! Ready to send to backend:", {
                        problem: problem_info,
                        code: code_str
                    });
                    // TODO: Add your backend fetch call here
                } else {
                    console.log("Solution was not accepted:", obj.type);
                }
            })
            .catch((error) => {
                console.error("Error checking submission result:", error);
            });
    });
}

import { Person } from "./registration.state";

export const submit = async (person: Person) : Promise<void> => {
    try{
        const response = await fetch("api/v1/Login/Register", {
            method: "POST",
            body: JSON.stringify(person),
            headers: {
                "content-type" : "application/json"
            }
        });
        if (response.ok) {
            // const result = await response.json();
            onSuccess(`User with name ${person.firstname} registered successfully. \nNow you can login`);
        } else {
            const textResult = await response.text();
            onFailure(textResult);
        }
    }catch (error: any) {
        onFailure(error.errorMessage);
    }
}

const onSuccess = (Message: string) => {
    alert(Message);
}

function onFailure(errorMessage: string) {
    alert("Failed to register: " + errorMessage + " \nTry again");
}

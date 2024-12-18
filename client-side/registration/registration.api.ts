import { Person } from "../Home/home.state";

export const submit = async (person: Person) : Promise<void> => {
    await fetch("api/storage", {
        method: "POST",
        body: JSON.stringify(person),
        headers: {
            "content-type" : "application/json"
        }
    });
}
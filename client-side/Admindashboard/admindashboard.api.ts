export const getAllEvents = async (): Promise<string> => {
    const response = await fetch("api/v1/Events", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
  
    const result = await response.text();
    if (response.ok) {
      return `Success: ${result}`;
    } else {
      return `Error: ${result}`;
    }
  };
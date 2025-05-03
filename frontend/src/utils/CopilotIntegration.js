export async function askCopilot(query) {
  try {
    const response = await fetch("https://api.githubcopilot.com/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch response from Copilot API");
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error communicating with Copilot:", error);
    return "An error occurred while communicating with Copilot.";
  }
}
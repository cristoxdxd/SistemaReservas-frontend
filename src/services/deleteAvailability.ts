export async function deleteAvailability(id: string) {
    const response = await fetch(`/api/availability/${id}`, {
        method: "DELETE",
    });

    const data = await response.json();
    console.log(data);
    return data;
}
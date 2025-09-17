const generarID = () => {
    const timestamp = Date.now().toString(36); // Convert current timestamp to base-36
    const randomPart = Math.random().toString(36).substring(2, 10); // Generate a random string in base-36
    return timestamp + randomPart;
}

export default generarID;
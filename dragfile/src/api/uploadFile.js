export async function uploadFile(file) {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: file.name,
      size: file.size,
      userId: 1,
    }),
  });

  if (response.status !== 201) {
    throw new Error(`Upload failed for ${file.name}`);
  }

  return response.json();
}
export async function uploadFile(file){
  const formdata = new FormData()
  formdata.append("file", file)
  formdata.append("filename", file.name)
  formdata.append("filesize", file.size)

  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: formdata
  });

  if (response.status !== 201) {
    throw new Error(`Upload failed for ${file.name}`);
  }

  return response.json();
}
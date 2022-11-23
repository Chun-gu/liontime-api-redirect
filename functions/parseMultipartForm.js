// import busboy from "busboy";

// export function parseMultipartForm(event) {
//   return new Promise((resolve) => {
//     const fields = {};

//     const busBoy = busboy({
//       headers: event.headers,
//     });

//     const files = [];
//     busBoy.on("file", (fieldname, filestream, filename) => {
//       filestream.on("data", (data) => {
//         files.push({
//           content: data,
//           filename: filename.filename,
//           type: filename.mimeType,
//         });
//         fields[fieldname] = files;
//       });
//     });

//     busBoy.on("field", (fieldName, value) => {
//       fields[fieldName] = value;
//     });

//     busBoy.on("close", () => {
//       resolve(fields);
//     });

//     busBoy.end(Buffer.from(event.body, "base64"));
//   });
// }

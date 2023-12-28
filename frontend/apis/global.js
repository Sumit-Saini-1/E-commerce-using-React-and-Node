export const SERVER_URL = "http://localhost:2000";

export function Token() {
    const user = JSON.parse(window.sessionStorage.getItem("user"));
    return user?.token;
}

// export function RefreshToken() {
//     const refreshInterval = setInterval(function () {
//         let token = Token();
//         fetch(SERVER_URL + "/refreshToken", {
//             credentials: "include",
//             headers: {
//                 'Authorization': token
//             }
//         }).then(response => {
//             return response.json();
//         }).then(token=>{
//             console.log(token);
//         }).catch(err => {
//             console.log(err);
//         });
//     }, 9000);
//     return refreshInterval;
// }
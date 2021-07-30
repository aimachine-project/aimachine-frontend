// import React from "react";

export function PostToApi(apiUrl, requestBody, responseOk, responseNotOk) {
  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: requestBody,
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((json) => {
          responseOk(response);
        });
      } else {
        responseNotOk();
      }
    })
    .catch((error) => console.log(error));
}

export function GetFromApi(apiUrl, userAuth, responseOk, responseNotOk) {
  fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: userAuth,
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.ok) {
        responseOk(response);
      } else {
        responseNotOk();
      }
    })
    .catch((error) => console.log(error));
}

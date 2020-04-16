const publicVapidKey =
  "BPhOKk6oJEuTlPMXXgXDroD5oUfK7a9sC9FFKzuD5EUpZNysXxEZPJOXpR_mIugxAnalCeGMEbx0wMb_cswo3dY";

//check service worker
if ("serviceWorker" in navigator) {
  send().catch((err) => console.error(err));
}

//register service worker
//register push
//send the push
async function send() {
  //register service worker
  console.log("Registering service worker");

  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/",
  });

  console.log( "Service worker registered");

  //register push
  console.log("Registering push...");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });

  console.log("Push registered");

  //send push notification
  console.log("sending push ");

  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json",
    },
  });

  console.log("Push sent done");
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

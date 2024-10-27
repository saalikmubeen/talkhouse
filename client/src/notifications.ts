import {
  saveuserSubscription,
  removeUserSubscription,
} from './api/api';

const convertedVapidKey = urlBase64ToUint8Array(
  // process.env.REACT_APP_VAPID_PUBLIC_KEY || ''
  'BF2mnXpqC9uNzj3ivnclQQtKSSxNGYixWb7z3f8kB2SGh1Qgmdhw7sZwg8KDKntP7jGOlU2H_pPFPj7qA2wuwBE'
);

/**
 * conforms to both Apis (promise or callback)
 */
export function askPermission() {
  return new Promise(function (resolve, reject) {
    const permissionResult = Notification.requestPermission(function (
      result
    ) {
      resolve(result);
    });
    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  }).then((result) => {
    if (result !== 'granted') {
      alert(
        'Notification permission denied\nIf it was by mistake, turn it on from the settings'
      );
      return false;
    }
    return true;
  });
}

export function subscribeUserToPush() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function (registration) {
      if (!registration.pushManager) {
        console.warn('Push manager unavailable.');
        return;
      }

      registration.pushManager
        .getSubscription()
        .then(function (existingSubscription) {
          if (existingSubscription === null) {
            console.info(
              'No push subscription detected. Making one..'
            );
            const subscribeOptions = {
              userVisibleOnly: true,
              applicationServerKey: convertedVapidKey,
            };
            registration.pushManager
              .subscribe(subscribeOptions)
              .then(function (newSubscription) {
                console.log('New push subscription added.');
                return saveuserSubscription(newSubscription);
              })
              .catch(function (e) {
                if (Notification.permission !== 'granted') {
                  console.info('Permission was not granted.');
                } else {
                  console.error(
                    'An error ocurred during the subscription process.',
                    e
                  );
                }
              });
          } else {
            console.info('Existing subscription detected.');
            return saveuserSubscription(existingSubscription);
          }
        });
    });
  }
}
export function unsubscribeUser() {
  navigator.serviceWorker.ready.then(function (registration) {
    registration.pushManager
      .getSubscription()
      .then(function (subscription) {
        if (subscription) {
          return removeUserSubscription(subscription).then(() => {
            console.info('User is unsubscribed.');
            return subscription.unsubscribe();
          });
        }
      })
      .catch(function (error) {
        console.error('Error unsubscribing', error);
      })
      .then(function () {
        console.info('User is unsubscribed.');
      });
  });
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  // eslint-disable-next-line
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

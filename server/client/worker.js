console.log('Service worker loaded');

self.addEventListener('push', e => {
    const data = e.data.json();
    console.log('push received in service worker');
    self.registration.showNotification(data.title, {
        body: 'Notified by client',
        icon: 'http://image.ibb.co/frYOFd/tmlogo.png'
    });
})
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register(`${location.pathname}service-worker.js`)
    });
}
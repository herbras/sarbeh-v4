import { registerSW } from 'virtual:pwa-register'

registerSW({
    immediate: true,
    onNeedRefresh() {
        console.log('Ada versi baru, tampilkan toast …')
    },
    onOfflineReady() {
        console.log('App siap offline 🚀')
    },
})

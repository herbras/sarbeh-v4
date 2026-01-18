// src/components/PWAUpdater.tsx
import { useRegisterSW } from 'virtual:pwa-register/react'
import { toast } from 'sonner'

export default function PWAUpdater() {
    const {
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onOfflineReady() {
            toast.success('✅ Aplikasi siap offline')
        },
        onNeedRefresh() {
            setNeedRefresh(true)
        },
    })

    // Show update notification when needed
    if (needRefresh) {
        toast('🔄 Versi baru tersedia', {
            description: 'Klik untuk memperbarui aplikasi',
            action: {
                label: 'Refresh',
                onClick: () => {
                    updateServiceWorker(true)
                    setNeedRefresh(false)
                }
            },
            duration: Infinity,
        })
    }

    return null
}

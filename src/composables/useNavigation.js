import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'

export function useNavigation() {
  const router = useRouter()
  const currentRoute = useRoute()
  const isNavigating = ref(false)

  const navigateTo = async (location) => {
    if (isNavigating.value) return

    // Avoid navigating to the same location
    const isSameRoute =
      typeof location === 'string'
        ? location === currentRoute.path
        : JSON.stringify(location) === JSON.stringify({
            name: currentRoute.name,
            path: currentRoute.path,
            params: currentRoute.params,
            query: currentRoute.query,
          })

    if (isSameRoute) return

    isNavigating.value = true

    try {
      await router.push(location)
    } catch (err) {
      if (err.name !== 'NavigationDuplicated') {
        console.error(err)
      }
    } finally {
      isNavigating.value = false
    }
  }

  return { navigateTo }
}

import { useUnitCompletionStore } from '~/stores/unitCompletion'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    useUnitCompletionStore().load()
  })
})

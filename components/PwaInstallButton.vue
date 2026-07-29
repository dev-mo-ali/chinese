<script setup>
const { $pwa } = useNuxtApp()
const baseURL = useRuntimeConfig().app.baseURL

const mounted = ref(false)
const installing = ref(false)
const showIosHelp = ref(false)
const isIosSafari = ref(false)

const nativeInstallAvailable = computed(() =>
  Boolean($pwa?.showInstallPrompt && !$pwa?.isPWAInstalled)
)

const isInstalled = computed(() => Boolean($pwa?.isPWAInstalled))
const showButton = computed(() =>
  mounted.value && !isInstalled.value && (nativeInstallAvailable.value || isIosSafari.value)
)

const install = async () => {
  if (nativeInstallAvailable.value) {
    installing.value = true
    try {
      await $pwa.install()
    } finally {
      installing.value = false
    }
    return
  }

  if (isIosSafari.value) showIosHelp.value = true
}

const closeIosHelp = () => { showIosHelp.value = false }
const onKeydown = (event) => {
  if (event.key === 'Escape') closeIosHelp()
}

onMounted(() => {
  mounted.value = true

  const userAgent = navigator.userAgent
  const isIos = /iPad|iPhone|iPod/.test(userAgent)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  const isSafari = /Safari/.test(userAgent) && !/CriOS|FxiOS|EdgiOS|OPiOS/.test(userAgent)
  const standalone = window.matchMedia('(display-mode: standalone)').matches
    || window.navigator.standalone === true

  isIosSafari.value = isIos && isSafari && !standalone
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div v-if="showButton" class="relative shrink-0">
    <button
      type="button"
      class="h-9 sm:h-10 px-2.5 sm:px-3 rounded-full border border-gold-deep/70 bg-gold-deep/20 text-gold hover:bg-gold-deep/40 hover:text-cream transition inline-flex items-center justify-center gap-1.5 disabled:opacity-60"
      :disabled="installing"
      aria-label="Install Chinese Learning Companion"
      title="Install app"
      @click="install"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-5 h-5"
        aria-hidden="true"
      >
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </svg>
      <span class="hidden lg:inline text-xs font-semibold">{{ installing ? 'Installing…' : 'Install' }}</span>
    </button>

    <Teleport to="body">
      <div
        v-if="showIosHelp"
        class="fixed inset-0 z-[100] bg-ink/60 px-4 flex items-center justify-center"
        role="presentation"
        @click.self="closeIosHelp"
      >
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="ios-install-title"
          class="w-full max-w-sm rounded-2xl bg-cream text-ink shadow-2xl border border-gold p-5"
        >
          <div class="flex items-start gap-3">
            <img
              :src="`${baseURL}pwa-192x192.png`"
              alt=""
              class="w-12 h-12 rounded-xl"
            >
            <div class="flex-1">
              <h2 id="ios-install-title" class="font-bold text-lg">Install Chinese</h2>
              <p class="mt-1 text-sm text-ink/70 leading-relaxed">
                Tap the Share button in Safari, choose <strong>Add to Home Screen</strong>, then tap <strong>Add</strong>.
              </p>
            </div>
            <button
              type="button"
              class="w-8 h-8 -mt-1 -mr-1 rounded-full hover:bg-ink/10 text-xl leading-none"
              aria-label="Close install instructions"
              @click="closeIosHelp"
            >
              ×
            </button>
          </div>
        </section>
      </div>
    </Teleport>
  </div>
</template>

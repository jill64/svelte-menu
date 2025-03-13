<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    Class = '',
    style = '',
    summaryClass = '',
    summaryStyle = '',
    initialOpened = false,
    duration = 400,
    noOuterClosing = false,
    hoverOpen = false,
    onOpen = undefined,
    onClose = undefined,
    button,
    contents
  }: {
    Class?: string
    style?: string
    summaryClass?: string
    summaryStyle?: string
    initialOpened?: boolean
    duration?: number
    noOuterClosing?: boolean
    hoverOpen?: boolean
    onOpen?: (close: () => unknown) => Promise<void>
    onClose?: () => unknown
    button: Snippet<[Phase]>
    contents: Snippet<[typeof close]>
  } = $props()

  type Phase = 'OPENING' | 'OPENED' | 'CLOSING' | 'CLOSED'

  let phase = $state<Phase>(initialOpened ? 'OPENED' : 'CLOSED')

  let controller: AbortController | undefined = undefined

  const close = async () => {
    if (phase === 'CLOSED' || phase === 'CLOSING') {
      return
    }

    phase = 'CLOSING'

    controller?.abort()
    controller = new AbortController()

    onClose?.()

    // eslint-disable-next-line no-undef
    const timerID = setTimeout(() => {
      phase = 'CLOSED'
      controller = undefined
    }, duration)

    // eslint-disable-next-line no-undef
    controller.signal.onabort = () => clearTimeout(timerID)
  }

  const open = async () => {
    if (phase === 'OPENED' || phase === 'OPENING') {
      return
    }

    phase = 'OPENING'

    controller?.abort()
    controller = new AbortController()

    onOpen?.(close)

    // eslint-disable-next-line no-undef
    const timerID = setTimeout(() => {
      phase = 'OPENED'
      controller = undefined
    }, duration)

    // eslint-disable-next-line no-undef
    controller.signal.onabort = () => clearTimeout(timerID)
  }

  let initialized = false

  $effect(() => {
    if (!initialized && initialOpened && close) {
      onOpen?.(close)
      initialized = true
    }
  })

  let toggle = $derived(
    phase === 'OPENED' || phase === 'OPENING' ? close : open
  )

  const usable = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-'
  const id = Array(8)
    .fill(0)
    .map(() => usable[Math.floor(Math.random() * usable.length)])
    .join('')

  const onClick = ({ target }: MouseEvent) => {
    if (!noOuterClosing && !(target as Element).closest(`#${id}`)) {
      close()
    }
  }

  const enter = () => {
    if (hoverOpen) {
      open()
    }
  }

  const leave = () => {
    if (hoverOpen) {
      close()
    }
  }
</script>

<svelte:window onclick={onClick} />

<details
  {id}
  open={phase !== 'CLOSED'}
  onmouseenter={enter}
  onmouseleave={leave}
  class={Class}
  {style}
>
  <summary
    style={summaryStyle}
    class={summaryClass}
    onclick={(e) => {
      e.preventDefault()
      toggle()
    }}
  >
    {@render button(phase)}
  </summary>
  {#if phase === 'OPENED' || phase === 'OPENING'}
    {@render contents(close)}
  {/if}
</details>

<style>
  details {
    position: relative;
  }
  summary {
    display: block;
    cursor: pointer;
  }
  summary::-webkit-details-marker {
    display: none;
  }
</style>

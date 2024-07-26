<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    class: Class = '',
    style = '',
    summaryClass = '',
    summaryStyle = '',
    initialOpened = false,
    duration = 400,
    noOuterClosing = false,
    hoverOpen = false,
    onopen = undefined,
    onclose = undefined,
    button,
    menu
  }: {
    class?: string
    style?: string
    summaryClass?: string
    summaryStyle?: string
    initialOpened?: boolean
    duration?: number
    noOuterClosing?: boolean
    hoverOpen?: boolean
    onopen?: ((close: () => Promise<void>) => unknown) | undefined
    onclose?: (() => unknown) | undefined
    button: Snippet<[states: 'OPENING' | 'OPENED' | 'CLOSING' | 'CLOSED']>
    menu: Snippet<[close: typeof close]>
  } = $props()

  let states = $state<'OPENING' | 'OPENED' | 'CLOSING' | 'CLOSED'>(
    initialOpened ? 'OPENED' : 'CLOSED'
  )

  let controller: AbortController | undefined = undefined

  const close = async () => {
    if (states === 'CLOSED' || states === 'CLOSING') {
      return
    }

    states = 'CLOSING'

    controller?.abort()
    controller = new AbortController()

    onclose?.()

    const timerID = setTimeout(() => {
      states = 'CLOSED'
      controller = undefined
    }, duration)

    controller.signal.onabort = () => clearTimeout(timerID)
  }

  const open = async () => {
    if (states === 'OPENED' || states === 'OPENING') {
      return
    }

    states = 'OPENING'

    controller?.abort()
    controller = new AbortController()

    onopen?.(close)

    const timerID = setTimeout(() => {
      states = 'OPENED'
      controller = undefined
    }, duration)

    controller.signal.onabort = () => clearTimeout(timerID)
  }

  let initialized = false

  $effect(() => {
    if (!initialized && initialOpened && close) {
      onopen?.(close)
      initialized = true
    }
  })

  let toggle = $derived(
    states === 'OPENED' || states === 'OPENING' ? close : open
  )

  const usable = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-'
  const id = Array(8)
    .fill(0)
    .map(() => usable[Math.floor(Math.random() * usable.length)])
    .join('')

  const onclick = ({ target }: MouseEvent) => {
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

<svelte:window on:click={onclick} />

<details
  {id}
  open={states !== 'CLOSED'}
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
    {@render button(states)}
  </summary>
  {#if states === 'OPENED' || states === 'OPENING'}
    {@render menu(close)}
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

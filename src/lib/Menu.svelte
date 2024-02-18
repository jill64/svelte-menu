<script lang="ts">
  export let Class = ''
  export let style = ''
  export let summaryClass = ''
  export let summaryStyle = ''
  export let initialOpened = false
  export let duration = 400
  export let noOuterClosing = false
  export let hoverOpen = false

  export let onOpen: ((close: () => Promise<void>) => unknown) | undefined =
    undefined

  export let onClose: (() => unknown) | undefined = undefined

  let state = (initialOpened ? 'OPENED' : 'CLOSED') as
    | 'OPENING'
    | 'OPENED'
    | 'CLOSING'
    | 'CLOSED'

  let controller: AbortController | undefined = undefined

  $: close = async () => {
    if (state === 'CLOSED' || state === 'CLOSING') {
      return
    }

    state = 'CLOSING'

    controller?.abort()
    controller = new AbortController()

    onClose?.()

    const timerID = setTimeout(() => {
      state = 'CLOSED'
      controller = undefined
    }, duration)

    controller.signal.onabort = () => clearTimeout(timerID)
  }

  $: open = async () => {
    if (state === 'OPENED' || state === 'OPENING') {
      return
    }

    state = 'OPENING'

    controller?.abort()
    controller = new AbortController()

    onOpen?.(close)

    const timerID = setTimeout(() => {
      state = 'OPENED'
      controller = undefined
    }, duration)

    controller.signal.onabort = () => clearTimeout(timerID)
  }

  let initialized = false

  $: if (!initialized && initialOpened && close) {
    onOpen?.(close)
    initialized = true
  }

  $: toggle = state === 'OPENED' || state === 'OPENING' ? close : open

  const usable = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-'
  const id = Array(8)
    .fill(0)
    .map(() => usable[Math.floor(Math.random() * usable.length)])
    .join('')

  $: onClick = ({ target }: MouseEvent) => {
    if (!noOuterClosing && !(target as Element).closest(`#${id}`)) {
      close()
    }
  }

  $: enter = () => {
    if (hoverOpen) {
      open()
    }
  }

  $: leave = () => {
    if (hoverOpen) {
      close()
    }
  }
</script>

<svelte:window on:click={onClick} />

<details
  {id}
  open={state !== 'CLOSED'}
  on:mouseenter={enter}
  on:mouseleave={leave}
  class={Class}
  {style}
>
  <summary
    style={summaryStyle}
    class={summaryClass}
    on:click|preventDefault={toggle}
  >
    <slot {state} />
  </summary>
  {#if state === 'OPENED' || state === 'OPENING'}
    <slot name="contents" {close} />
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

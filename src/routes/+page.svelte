<script lang="ts">
  import { page } from '$app/stores'
  import { Menu } from '$lib'
  import { theme } from '@jill64/svelte-dark-theme'
  import { ToggleSwitch } from '@jill64/svelte-input'
  import { HighlightSvelte } from 'svelte-highlight'
  import { define } from 'svelte-qparam'
  import { boolean } from 'svelte-qparam/serde'
  import { slide } from 'svelte/transition'
  import { code } from './code'

  const extract = define({
    no_outer_closing: boolean,
    hover_open: boolean,
    floating: boolean,
    no_transition: boolean
  })

  $: ({ qparams } = extract($page.url))
  $: ({ no_outer_closing, hover_open, floating, no_transition } = qparams)

  $: noOuterClosing = $no_outer_closing
  $: hoverOpen = $hover_open
  $: position = $floating ? 'absolute' : 'static'
  $: top = $floating ? '0' : 'auto'
  $: left = $floating ? '100%' : 'auto'
  $: duration = $no_transition ? 0 : 400
  $: slideParam = { duration }
</script>

<aside>
  <ToggleSwitch
    value={!$no_outer_closing}
    onChange={(x) => {
      $no_outer_closing = !x
    }}
    disabled={$hover_open}
  >
    <span style:margin-left="0.5rem"> Outer Closing</span>
  </ToggleSwitch>
  <ToggleSwitch bind:value={$hover_open}>
    <span style:margin-left="0.5rem">Hover Open</span>
  </ToggleSwitch>
  <ToggleSwitch bind:value={$floating}>
    <span style:margin-left="0.5rem">Floating</span>
  </ToggleSwitch>
  <ToggleSwitch
    value={!$no_transition}
    onChange={(x) => {
      $no_transition = !x
    }}
  >
    <span style:margin-left="0.5rem">Transition</span>
  </ToggleSwitch>
</aside>

<main>
  <div style:overflow="auto">
    <HighlightSvelte
      code={code({
        noOuterClosing,
        hoverOpen,
        floating: $floating,
        transition: !$no_transition
      }).trim()}
    />
  </div>
  <div style:--section-bg={$theme === 'dark' ? '#222' : 'whitesmoke'}>
    <Menu
      let:state
      {noOuterClosing}
      {duration}
      {hoverOpen}
      style={$floating ? 'display: inline;' : ''}
    >
      <h2>Menu - {state}</h2>
      <section
        slot="contents"
        style:position
        style:top
        style:left
        let:close
        transition:slide={slideParam}
      >
        <Menu {noOuterClosing} {duration} {hoverOpen}>
          <h3>Section1</h3>
          <section
            slot="contents"
            style:position
            style:top
            style:left
            let:close
            transition:slide={slideParam}
          >
            <p>Contents1</p>
            <button on:click={close}>Close1</button>
          </section>
        </Menu>
        <Menu {noOuterClosing} {duration} {hoverOpen}>
          <h3>Section2</h3>
          <section
            slot="contents"
            style:position
            style:top
            style:left
            let:close
            transition:slide={slideParam}
          >
            <p>Contents2</p>
            <button on:click={close}>Close2</button>
          </section>
        </Menu>
        <Menu {noOuterClosing} {duration} {hoverOpen}>
          <h3>Section3</h3>
          <section
            slot="contents"
            style:position
            style:top
            style:left
            let:close
            transition:slide={slideParam}
          >
            <p>Contents3</p>
            <button on:click={close}>Close3</button>
          </section>
        </Menu>
        <button on:click={close}>Close</button>
      </section>
    </Menu>
  </div>
</main>

<style>
  main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  @media (max-width: 600px) {
    main {
      grid-template-columns: 1fr;
    }
  }
  button {
    padding: 0.5rem 1rem;
    border-radius: 9999rem;
    border: 1px solid #999;
    background: inherit;
    color: inherit;
    cursor: pointer;
    font-weight: bold;
  }
  aside {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
  }
  :global(pre code) {
    border-radius: 0.5rem;
  }
  section {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
    background: var(--section-bg);
    border: 1px solid #888;
  }
</style>

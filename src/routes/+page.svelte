<script lang="ts">
  import { page } from '$app/stores'
  import { Menu } from '$lib'
  import { theme } from '@jill64/npm-demo-layout'
  import { HighlightSvelte } from '@jill64/npm-demo-layout/highlight'
  import { ToggleSwitch } from '@jill64/svelte-input'
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

  // eslint-disable-next-line
  // @ts-ignore
  let qparams = $derived(extract($page.url).qparams)

  let noOuterClosing = $derived(qparams.no_outer_closing.value)
  let hoverOpen = $derived(qparams.hover_open.value)
  let position = $derived(qparams.floating.value ? 'absolute' : 'static')
  let top = $derived(qparams.floating.value ? '0' : 'auto')
  let left = $derived(qparams.floating.value ? '100%' : 'auto')
  let duration = $derived(qparams.no_transition.value ? 0 : 400)
  let slideParam = $derived({ duration })
</script>

<aside>
  <ToggleSwitch
    value={!qparams.no_outer_closing.value}
    onchange={(x) => {
      qparams.no_outer_closing.value = !x
    }}
    disabled={qparams.hover_open.value}
  >
    <span style:margin-left="0.5rem"> Outer Closing</span>
  </ToggleSwitch>

  <ToggleSwitch bind:value={qparams.hover_open.value}>
    <span style:margin-left="0.5rem">Hover Open</span>
  </ToggleSwitch>

  <ToggleSwitch bind:value={qparams.floating.value}>
    <span style:margin-left="0.5rem">Floating</span>
  </ToggleSwitch>

  <ToggleSwitch
    value={!qparams.no_transition.value}
    onchange={(x) => {
      qparams.no_transition.value = !x
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
        floating: qparams.floating.value,
        transition: !qparams.no_transition.value
      }).trim()}
    />
  </div>
  <div style:--section-bg={$theme === 'dark' ? '#222' : 'whitesmoke'}>
    <Menu
      {noOuterClosing}
      {duration}
      {hoverOpen}
      style={qparams.floating.value ? 'display: inline;' : ''}
    >
      {#snippet button(state)}
        <h2>Menu - {state}</h2>
      {/snippet}
      {#snippet menu(close)}
        <section
          style:position
          style:top
          style:left
          transition:slide={slideParam}
        >
          <Menu {noOuterClosing} {duration} {hoverOpen}>
            {#snippet button()}
              <h3>Section1</h3>
            {/snippet}
            {#snippet menu(close)}
              <section
                style:position
                style:top
                style:left
                transition:slide={slideParam}
              >
                <p>Contents1</p>
                <button onclick={close}>Close1</button>
              </section>
            {/snippet}
          </Menu>
          <Menu {noOuterClosing} {duration} {hoverOpen}>
            {#snippet button()}
              <h3>Section2</h3>
            {/snippet}
            {#snippet menu(close)}
              <section
                style:position
                style:top
                style:left
                transition:slide={slideParam}
              >
                <p>Contents2</p>
                <button onclick={close}>Close2</button>
              </section>
            {/snippet}
          </Menu>
          <Menu {noOuterClosing} {duration} {hoverOpen}>
            {#snippet button()}
              <h3>Section3</h3>
            {/snippet}
            {#snippet menu(close)}
              <section
                style:position
                style:top
                style:left
                transition:slide={slideParam}
              >
                <p>Contents3</p>
                <button onclick={close}>Close3</button>
              </section>
            {/snippet}
          </Menu>
          <button onclick={close}>Close</button>
        </section>
      {/snippet}
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

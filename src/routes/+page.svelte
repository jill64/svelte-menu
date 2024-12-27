<script lang="ts">
  import { page } from '$app/state'
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

  let { qparams: q } = $derived(extract(page.url))

  let noOuterClosing = $derived(q.no_outer_closing)
  let hoverOpen = $derived(q.hover_open)
  let position = $derived(q.floating ? 'absolute' : 'static')
  let top = $derived(q.floating ? '0' : 'auto')
  let left = $derived(q.floating ? '100%' : 'auto')
  let duration = $derived(q.no_transition ? 0 : 400)
  let slideParam = $derived({ duration })
</script>

<aside>
  <ToggleSwitch
    value={!q.no_outer_closing}
    onChange={(x) => {
      q.no_outer_closing = !x
    }}
    disabled={q.hover_open}
  >
    <span style:margin-left="0.5rem"> Outer Closing</span>
  </ToggleSwitch>
  <ToggleSwitch bind:value={q.hover_open}>
    <span style:margin-left="0.5rem">Hover Open</span>
  </ToggleSwitch>
  <ToggleSwitch bind:value={q.floating}>
    <span style:margin-left="0.5rem">Floating</span>
  </ToggleSwitch>
  <ToggleSwitch
    value={!q.no_transition}
    onChange={(x) => {
      q.no_transition = !x
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
        floating: q.floating,
        transition: !q.no_transition
      }).trim()}
    />
  </div>
  <div style:--section-bg={$theme === 'dark' ? '#222' : 'whitesmoke'}>
    <Menu
      {noOuterClosing}
      {duration}
      {hoverOpen}
      style={q.floating ? 'display: inline;' : ''}
    >
      {#snippet button(phase)}
        <h2>Menu - {phase}</h2>
      {/snippet}
      {#snippet contents(close)}
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
            {#snippet contents(close)}
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
            {#snippet contents(close)}
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
            {#snippet contents(close)}
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

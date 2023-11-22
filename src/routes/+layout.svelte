<script lang="ts">
  import { FlipButton, ThemeManager, theme } from '@jill64/svelte-dark-theme'
  import github from 'svelte-highlight/styles/github'
  import githubDark from 'svelte-highlight/styles/github-dark'
  import GitHubLogo from './GitHubLogo.svelte'
</script>

<svelte:head>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html $theme === 'dark' ? githubDark : github}
</svelte:head>

<ThemeManager />

<header>
  <hgroup>
    <h1>@jill64/svelte-menu</h1>
    <p>📋 Configurable Menu Component for Svelte</p>
  </hgroup>
  <FlipButton />
  <a href="https://github.com/jill64/svelte-menu">
    <GitHubLogo />
  </a>
</header>

<slot />

<style>
  hgroup {
    margin-right: auto;
  }
  header {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: center;
  }
  :global(body) {
    font-family: sans-serif;
    margin: 0 1rem;
  }
  :global(.dark body) {
    background-color: #161616;
    color: whitesmoke;
  }
</style>

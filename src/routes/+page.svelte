<script lang="ts">
    import { Resource, invoke } from '@tauri-apps/api/core';

  let name = ''
  let greetMsg = ''

  async function greet() {
    greetMsg = await invoke('greet', { name })
  }
</script>

<button on:click={greet}>Greet me</button>
<h1 class="text-3xl font-bold underline">
    {greetMsg}
</h1>
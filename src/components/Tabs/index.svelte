<script lang="ts">
  import * as Tabs from "$lib/shadcn/components/ui/tabs";
  export let activeTab: string;
  export let tabs: string[];
  export let onTabChange: (tab: string) => void;
</script>

<Tabs.Root value={activeTab} class="border-b px-4 pb-4 min-w-full overflow-x-scroll no-scrollbar touch-pan-x">
  <Tabs.List class="flex justify-around bg-yellow-400 p-0">
    {#each tabs as tab}
      <Tabs.Trigger value={tab} class="text-center text-white" on:click={() => onTabChange(tab)}>
        {tab}
      </Tabs.Trigger>
    {/each}
  </Tabs.List>
</Tabs.Root>
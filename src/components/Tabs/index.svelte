<script>
  import { Tabs, TabsList, TabsTrigger } from "$lib/shadcn/components/ui/tabs";
  export let activeTab = "Trash";
  const tabs = ["Recommended", "Favorite", "Trash"];
</script>

<Tabs value={activeTab} class="border-b border-gray-200">
  <TabsList class="flex justify-around">
    {#each tabs as tab}
      <TabsTrigger value={tab} class="flex-1 text-center p-4">
        {tab}
      </TabsTrigger>
    {/each}
  </TabsList>
</Tabs>
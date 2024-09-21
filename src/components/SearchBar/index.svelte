<script>
	import { Button } from '$lib/shadcn/components/ui/button';
</script>

<div class="flex items-center justify-between p-4">
	<input
		type="text"
		placeholder="Search..."
		class="w-full rounded-md border border-gray-300 p-2 text-gray-600"
	/>
	<Button variant="outline" class="ml-4 rounded-full bg-yellow-400 p-2">
		<svg
			class="h-6 w-6 text-white"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-6-6m-6 6l6-6"
			></path>
		</svg>
	</Button>
</div>

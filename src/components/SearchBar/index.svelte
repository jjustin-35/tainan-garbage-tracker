<script lang="ts">
	import { Input } from '$lib/shadcn/components/ui/input';

	export let onSearch: (value: string) => void;
	let value: string = '';

	const handleInput = (e: Event) => {
		const input = e.target as HTMLInputElement;
		value = input.value;
	};

	const handleKeyPress = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			onSearch(value);
		}
	};
</script>

<div class="flex items-center justify-between gap-2 p-4">
	<div class="h-[50px] w-[50px] content-center">
		<i class="fa-solid fa-truck-fast block text-[36px] text-white"></i>
	</div>
	<Input
		type="text"
		placeholder="Search..."
		{value}
		on:change={handleInput}
		on:keypress={handleKeyPress}
		class="w-full rounded-full"
	/>
</div>

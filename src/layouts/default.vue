<template>
    <div class="my-10 mx-24 max-h-[calc(100vh-80px)] bg-primary-alt drop-shadow-md overflow-hidden rounded-xl">
        <ShareHeader class="min-h-16 max-h-16 px-10" />
        <hr class="bg-accent opacity-10" />
        <main class="[&>:first-child]:pl-10 [&>:last-child]:pr-10 flex h-[calc(100vh-144px)] gap-10">
            <slot />
        </main>
    </div>
</template>
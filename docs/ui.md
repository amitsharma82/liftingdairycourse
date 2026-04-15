# UI Coding Standards

## Rule: Use shadcn/ui Components Only

**All UI in this project must be built exclusively with [shadcn/ui](https://ui.shadcn.com/) components.**

- **NO custom UI components** may be created.
- **NO raw HTML elements** styled as interactive components (buttons, inputs, dialogs, dropdowns, etc.).
- **NO third-party component libraries** other than shadcn/ui.

If a shadcn/ui component exists for what you need, use it. If you need a component that does not exist in shadcn/ui, open a discussion before building anything custom.

## Installing shadcn/ui Components

Add components via the CLI:

```bash
npx shadcn@latest add <component-name>
```

Components are installed into `src/components/ui/`. Do not modify files in that directory — they are managed by the shadcn/ui CLI.

## Allowed Deviations

The following are permitted alongside shadcn/ui components:

| Allowed | Notes |
|---------|-------|
| Layout wrappers (`<div>`, `<main>`, `<section>`, etc.) | Structural/layout only — no interactive behaviour |
| Tailwind utility classes | Applied directly to shadcn components via `className` |
| CSS variables / `@theme` blocks in `globals.css` | For theming the shadcn component palette |
| Lucide icons (already a shadcn/ui dependency) | Used inside shadcn components |

## Theming

Customise the look of shadcn/ui by editing the CSS variables in `src/app/globals.css` under the `@layer base` block. Do not override individual component internals directly.

## Examples

**Correct:**
```tsx
import { Button } from "@/components/ui/button";
import { Input }  from "@/components/ui/input";

<Button variant="outline" size="sm">Save</Button>
<Input placeholder="Search..." />
```

**Incorrect — do not do this:**
```tsx
// Custom button component
function MyButton({ children }: { children: React.ReactNode }) {
  return <button className="px-4 py-2 bg-lime-400 text-black">{children}</button>;
}

// Inline styled raw element used as an interactive component
<button className="px-4 py-2 border border-zinc-700 text-zinc-400 hover:text-lime-400">
  Click me
</button>
```

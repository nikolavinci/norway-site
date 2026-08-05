git add package.json package-lock.json
git commit -m "chore: add UI dependencies (framer-motion, shadcn/ui)"
git add src/shared/lib/utils.ts
git commit -m "feat: add cn utility for tailwind merge"
git add src/app/globals.css
git commit -m "feat: add accordion animations to tailwind globals"
git add src/components/ProductCard.tsx
git commit -m "feat: implement framer-motion scroll animations on product cards"
git add src/components/FeaturedCarousel.tsx
git commit -m "feat: create FeaturedCarousel component using embla-carousel"
git add src/components/ui/accordion.tsx
git commit -m "feat: create accessible accordion components from radix-ui"
git add src/app/(storefront)/page.tsx
git commit -m "feat: add torn edge dividers and carousel to homepage"
git add src/app/(storefront)/shop/[id]/page.tsx
git commit -m "refactor: replace custom state accordions with radix-ui accordions on product page"
git push

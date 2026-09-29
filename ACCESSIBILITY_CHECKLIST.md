# Accessibility Testing Checklist

## Phase 2: Navigation & Footer — Accessibility Verification

### Keyboard Navigation

- [ ] Tab through all links and buttons in desktop navigation
- [ ] Tab order is logical (left to right, top to bottom)
- [ ] Focus is always visible (blue outline)
- [ ] Can reach all navigation items via Tab key
- [ ] Mobile menu can be opened/closed with Enter or Space
- [ ] Mobile menu can be dismissed with Escape
- [ ] All links in footer are reachable via Tab

### Focus States

- [ ] Primary buttons show clear focus indicator (2px outline)
- [ ] Secondary buttons show clear focus indicator
- [ ] Navigation links show underline on hover and focus
- [ ] All interactive elements have visible focus states
- [ ] Focus outline has sufficient contrast

### Screen Reader Testing

#### Desktop Navigation
- [ ] Logo is labeled as "GET HOME OFFER" (clickable link)
- [ ] "How It Works" link is announced correctly
- [ ] "Services" link is announced correctly
- [ ] "About Us" link is announced correctly
- [ ] "FAQ" link is announced correctly
- [ ] "Contact" link is announced correctly
- [ ] "Get Your Offer" button is announced as a button

#### Mobile Menu
- [ ] Menu toggle button announces as "Open menu" or "Close menu"
- [ ] Menu toggle has `aria-expanded` attribute
- [ ] Menu has `role="navigation"` or inside `<nav>`
- [ ] Menu items are announced when open
- [ ] Screen reader announces when menu is opened/closed

#### Footer
- [ ] "Fast Solutions for Your Next Move" heading is announced
- [ ] All footer links are reachable and announced
- [ ] Legal links (Privacy, Terms) are clearly labeled
- [ ] Copyright text is readable

### Color Contrast

- [ ] Primary CTA button (sky blue) has sufficient contrast
  - Text: Dark charcoal on sky blue ≥ 4.5:1 (WCAG AA)
- [ ] Secondary button text has sufficient contrast
- [ ] Navigation text has sufficient contrast
- [ ] Footer text has sufficient contrast
- [ ] Focus outline is clearly visible against all backgrounds

### Responsive Behavior (No Keyboard Issues)

#### Mobile (320px - 767px)
- [ ] Mobile menu toggle is accessible
- [ ] Menu doesn't block tab navigation
- [ ] Sticky CTA button doesn't obstruct content
- [ ] All buttons are touch-friendly (min 44x44px)
- [ ] No horizontal scrolling

#### Tablet (768px - 1024px)
- [ ] Mobile menu works correctly
- [ ] Navigation is accessible
- [ ] Sticky CTA is visible but doesn't overlap important content

#### Desktop (1025px+)
- [ ] Desktop navigation is fully keyboard accessible
- [ ] No mobile menu
- [ ] All navigation visible

### ARIA Labels & Attributes

- [ ] Menu toggle has `aria-label` for button purpose
- [ ] Menu toggle has `aria-expanded` (true/false)
- [ ] Menu toggle has `aria-controls` pointing to mobile-menu
- [ ] Skip link (optional) implemented for keyboard users
- [ ] No unnecessary ARIA (only when semantics insufficient)

### Motion & Reduced Motion

- [ ] `prefers-reduced-motion` is respected
- [ ] When reduced motion enabled, no animations play
- [ ] Navigation is still functional with animations disabled
- [ ] Focus is still visible with animations disabled

### Semantic HTML

- [ ] `<nav>` element used for navigation
- [ ] `<button>` element used for menu toggle (not div/span)
- [ ] `<a>` elements used for links (not buttons)
- [ ] `<footer>` element used for footer
- [ ] Proper heading hierarchy (h1, h2, etc.)

### Mobile Touch Targets

- [ ] Buttons are at least 44x44px (WCAG 2.1 AAA)
- [ ] Menu toggle is at least 44x44px
- [ ] Links have sufficient spacing to avoid accidental taps
- [ ] Sticky CTA button is easily tappable (full width or large)

### Testing Tools

- [ ] Chrome DevTools (Accessibility panel)
- [ ] Keyboard navigation test (Tab, Shift+Tab, Enter, Escape)
- [ ] NVDA or JAWS screen reader
- [ ] axe DevTools browser extension
- [ ] WAVE browser extension
- [ ] Lighthouse accessibility audit

### Known Issues / Notes

(To be filled during testing)

---

## Testing Instructions

### Keyboard Testing
```
1. Open DevTools (F12)
2. Disable mouse/trackpad
3. Use Tab to navigate forward
4. Use Shift+Tab to navigate backward
5. Use Enter/Space to activate buttons/links
6. Use Escape to close mobile menu
```

### Screen Reader Testing (NVDA on Windows)
```
1. Download NVDA (free): https://www.nvaccess.org/
2. Launch NVDA
3. Press CTRL+Home to start from page top
4. Use arrow keys to navigate
5. Tab through links and buttons
6. Listen for proper announcements
```

### Color Contrast Check
```
Use WebAIM contrast checker: https://webaim.org/resources/contrastchecker/
CTA button: #0F1B20 text on #6EC6E8 ≈ 10:1 (passes)
Links: #1D6A86 on ivory #F6F2EC ≈ 5.8:1 (passes). Never use #6EC6E8 as text on light backgrounds.
```

### Responsive Testing
```
DevTools > Toggle Device Toolbar
Test at: 320px, 375px, 430px, 768px, 1024px, 1280px
```

---

## WCAG 2.2 Level AA Target

- [x] Perceivable — information visible
- [x] Operable — keyboard accessible
- [x] Understandable — clear structure
- [x] Robust — works with assistive tech

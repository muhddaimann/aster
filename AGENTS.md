# Expo Native AI Development Blueprint

## About Blueprint

This is a reusable blueprint for AI-assisted **Expo native** development. Target iOS and Android by default.

Use it to develop one approved phase at a time. Do not assume the app name, app purpose, routing, design direction, fonts, icons, dependencies, or source structure before the user approves them.

Before changing project setup, inspect the relevant template files:

- `package.json`, lockfile, scripts, dependencies, and version;
- `app.json` or `app.config.*`;
- entry point, source tree, TypeScript config, and current Git status.

Rules:

- Prefer Expo and React Native capabilities. Use `npx expo install <package>` for Expo-compatible packages when needed.
- Treat only dependencies declared in `package.json` as part of the project; `node_modules` may contain leftovers.
- When adding, removing, or changing dependencies, update the repository’s declared package manifest and lockfile using the project’s package manager. Do not hand-edit lockfiles unless the package manager cannot complete the update.
- Do not edit generated directories such as `node_modules/`, `.expo/`, build output, or generated native folders unless explicitly required.
- Leave any declared scratchpad, private-notes file, or excluded area untouched unless the user explicitly asks otherwise.
- Keep app metadata and version values synchronized wherever the approved project stores them.
- On an explicit version-bump request, update `src/constants/about.ts` first, including the user-visible version and changelog, then set the same version in every app `package.json` manifest in the repository. Inspect manifests outside generated directories before editing and validate that all declared app package versions match the metadata constant.
- For features that handle identity, credentials, sessions, payments, health data, or other sensitive data, explicitly state local storage, expiration, logout, error-handling, privacy, and production-backend boundaries during Advice. Never store secrets, raw credentials, OTP values, or unapproved sensitive data in source control or unsecured device storage.
- A local, mock, or dummy sensitive-data flow must be labeled as non-production and must not imply that real identity, payment, OTP delivery, or backend security guarantees exist.
- When a prescribed API, configuration key, or platform behavior conflicts with the installed Expo or React Native version, inspect official documentation and return to Advice before substituting an alternative.

## About Working Contract

Use one active work item at a time. During foundation work, use a named phase; after Phase 5 is approved, use a named feature slice.

```text
Phase: <name>
Status: Advice | In progress | Awaiting review | Approved
Scope: <one-sentence boundary>
```

### `start development`

Treat **start development** as an Advice call, not permission to edit.

1. Inspect the blank template and current working tree.
2. Start **Phase 1 — App Metadata and Native Foundation**.
3. Ask only for:
   - app name;
   - app about.
4. Based on those answers, propose Phase 1 and wait for **proceed**.

### `advice`

- Do not change files, configuration, dependencies, lockfiles, or this guide.
- Inspect relevant files when needed.
- Recommend the next phase: goal, scope, likely files, dependencies/configuration, validation, and acceptance criteria.
- State assumptions or ask one focused question if an answer materially changes the implementation.
- Wait for **proceed**.

### `proceed`

- Implement only the immediately preceding approved scope.
- Do not add unrelated features, refactors, upgrades, cleanup, or dependencies.
- If a material decision or blocker appears, return to Advice rather than choosing silently.
- Validate the work and report **Awaiting review**.

### `review changes`

- Do not make changes.
- List every active-phase change by file and user-visible behavior.
- Include dependency/configuration changes, validation results, limitations, and deferred work.
- Identify pre-existing or out-of-scope changes separately.
- Wait for revisions plus **proceed**, or **approve changes**.

### `approve changes`

- Update this file with durable approved project decisions only.
- Do not add temporary task notes, secrets, or private content.
- State what was added or revised in this guide, validate the update, and mark the phase **Approved**.
- Return to Advice for the next phase.

## Development Phases

### Phase 1 — App Metadata and Native Foundation

**Goal:** turn the Expo blank template into an approved native app foundation.

#### Phase 1 Advice

After receiving app name and app about, suggest:

- app slug;
- deep-link scheme;
- URL/package-identifier direction when useful;
- design direction;
- a branded font and icon pairing for the initial foundation;
- the required Expo-compatible font and icon dependencies to install;
- initial version `0.0.0` and version source of truth;
- Expo Router setup using the required Phase 1 file structure;
- metadata constants, landing screen, and root safe-area ownership;
- exact dependency, configuration, asset, file, and validation changes.

Native cleanup is part of Phase 1. When present, plan to remove:

- web scripts from `package.json`;
- web configuration from Expo config;
- favicon and web-only assets.

Phase 1 must establish a branded typography and icon system. Do not recommend system fonts as the default foundation. Select an Expo-compatible font package and include its installation and setup in the proposal. Use `@expo/vector-icons` as the default icon system; if it is not declared in `package.json`, install it with Expo tooling. Do not use text or emoji glyphs as product icons unless the user explicitly approves an exception.

Do not edit or install anything until the user says **proceed**.

#### Required Phase 1 Structure

Phase 1 uses Expo Router and must create this structure:

```text
app/
├── _layout.tsx
└── index.tsx # LandingScreen
src/
└── constants/
    └── about.ts
```

Responsibilities:

- `app/_layout.tsx`: root app shell, root providers, approved font loading, root safe-area ownership, and Expo Router navigation configuration.
- `app/index.tsx`: `LandingScreen`; displays app name, app about, and version from `src/constants/about.ts` without duplicating metadata.
- `src/constants/about.ts`: approved app name, app about, slug, scheme, version, design direction, and changelog; it is the user-visible metadata source of truth.

Configure the package entry for Expo Router. Remove legacy blank-template entry files only after the Router structure is in place.

#### Phase 1 Proceed

Implement only the approved Phase 1 proposal. Set the initial app version to `0.0.0` unless the user explicitly approves another value. Keep `package.json`, Expo config, and `src/constants/about.ts` aligned to the approved version. Install and configure the approved font and icon dependencies. Load the approved font in `app/_layout.tsx` and use the approved icon system in `app/index.tsx`; do not substitute system fonts or text/emoji glyphs unless the user explicitly approves an exception. Configure Expo Router completely rather than leaving a partial migration. Use `app/_layout.tsx` as the default safe-area owner; do not add `SafeAreaView` to `app/index.tsx` unless an explicit edge-to-edge exception is approved. Display the approved app name, app about, and initial version from the metadata source rather than duplicating strings.

#### Phase 1 Review and Approval

On **review changes**, list all Phase 1 work without editing. On **approve changes**, record the approved slug, scheme, version policy, native-only boundary, routing decision, typography/icon choices, design direction, safe-area ownership, dependencies, and validation requirements in the section below.

### Phase 2 — Theme Module

**Goal:** establish a token-driven light/dark theme foundation after Phase 1 is approved.

#### Phase 2 Advice

Propose a camelCase theme module using this structure:

```text
src/
├── components/
│   └── theme/
│       └── themeToggle.tsx
├── constants/
│   └── theme.ts
├── contexts/
│   └── themeContext.tsx
├── helpers/
│   └── animate.ts
└── hooks/
    └── useTheme.ts
```

Include:

- semantic color tokens for background, surfaces, borders, primary/accent actions, text hierarchy, and focus treatment; plus spacing, typography, font-family, opacity, radius, and platform-appropriate shadow/elevation tokens;
- light/dark theme behavior through a typed theme context that resolves the initial mode from the device color scheme, keeps manual selection in memory for the current session only, exposes the resolved token object plus a toggle action, and causes `useTheme()` to throw a clear error outside the provider;
- session-only theme state unless persistence is explicitly approved;
- root safe-area, background, and status-bar integration: mount one `SafeAreaProvider` and one root `SafeAreaView` in `app/_layout.tsx`; the root safe-area wrapper must use `edges={['top']}` only. Do not add `SafeAreaView` to themed screens by default. Bottom insets remain the responsibility of the route or shared floating-control component that needs them;
- a reusable icon-only theme toggle using the approved icon system, a minimum 48-point target, switch accessibility role/state, an accessibility label and next-mode hint, and native-driver press-scale feedback;
- token-driven inline styles instead of `StyleSheet.create` for themed UI;
- a scrollable LandingScreen visual reference for app constants and every active token group: all semantic colors, typography styles, font-family variants, spacing values, radius values, opacity states, shadow/elevation samples, and focus-ring treatment. Render actual token specimens and their token names/values; do not reduce the reference to a summary line;
- exact dependency, file, validation, and manual-test changes.

Do not edit files or add dependencies until the user says **proceed**.

#### Phase 2 Proceed

Implement only the approved Phase 2 scope. Create the theme tokens, provider, hook, animation helper, and reusable toggle. Keep theme state session-only: a manual toggle may override the device-derived initial mode during the current session, but must not persist across restarts unless persistence is explicitly approved.

In `app/_layout.tsx`, mount `SafeAreaProvider`, then the theme provider, then one themed root `SafeAreaView` with `edges={['top']}`. Apply the active theme background and Expo status-bar style within that root shell. Do not add `SafeAreaView` to `app/index.tsx` or other themed screens unless an explicit edge-to-edge exception is approved. Route-level or shared floating controls must consume bottom insets directly when required.

Use token-driven inline styles for themed UI and do not use `StyleSheet.create` for themed screens. Make the LandingScreen a scrollable visual reference for app constants and every active token group: all semantic colors, typography styles, font families, spacing, radii, opacity states, shadow/elevation, and focus-ring treatment. Each specimen must use active tokens and show its token name and meaningful value where applicable.

Validate with `npx tsc --noEmit`, `npx expo export --platform ios --output-dir <temporary-directory-outside-repository>`, `npx expo export --platform android --output-dir <temporary-directory-outside-repository>`, and `git diff --check`. Manually verify light and dark modes on iOS and Android: device-derived initial appearance, session-only toggle behavior, status-bar readability, root top-safe-area spacing, no duplicated screen-level safe-area padding, all token specimens updating after a mode switch, and LandingScreen scroll reachability at small viewport and large-text settings.

#### Phase 2 Review and Approval

On **review changes**, list all Phase 2 work without editing. On **approve changes**, record the approved theme-token conventions, persistence decision, dependencies, and validation requirements in the section below.

### Phase 3 — Theme-Aware Global Overlay System

**Goal:** establish a reusable, global, typed overlay system after Phase 2 is approved.

#### Phase 3 Advice

Propose an overlay system with this separation of responsibilities:

```text
src/
├── components/
│   └── overlay/
│       └── overlayHost.tsx
├── constants/
│   └── overlay.ts
├── contexts/
│   ├── overlayContext.ts
│   └── overlayProvider.tsx
└── hooks/
    └── useOverlay.ts
```

Include:

- typed APIs through `OverlayProvider` and `useOverlay` for alert, confirm, destructive confirm, custom modal, bottom sheet, blocking loader, and toast;
- a context contract separate from provider and rendering implementation to prevent import cycles;
- a single `OverlayHost` rendered from the root shell beneath the approved theme and safe-area providers but outside the route-only root `SafeAreaView`, so native modal backdrops can cover the full window, including the top safe-area and status-bar region. `OverlayProvider` owns typed state, timers, and dismissal lifecycle; `OverlayHost` consumes that state for rendering;
- semantic overlay theme tokens, including `overlayBackdrop` and `success`, `danger`, `warning`, and `info` colors with soft-background counterparts in both modes;
- Android edge-to-edge configuration: enable `edgeToEdgeEnabled: true` in Expo config when overlays must visually cover system-bar regions. Treat this as native configuration requiring a rebuilt Android development build or binary for manual verification;
- root status-bar integration: expose overlay-active state so the root shell can select a readable status-bar icon style while a blocking modal, dialog, sheet, or loader is visible, then restore theme-derived styling after dismissal;
- backdrop dismissal for alerts, confirmations, custom modals, and bottom sheets, with confirmation dismissal using the cancel callback path;
- centered alert, confirmation, destructive-confirmation, and custom-modal surfaces with a fixed preferred dialog width, capped at the available viewport width after theme spacing. Keep bottom sheets full width;
- a loader that remains blocking, can only close through the typed API, and optionally supports provider-owned duration cleanup;
- direct toast rendering above root content rather than inside a native `Modal`, with top safe-area placement, tap/timeout dismissal, visible exit animation before state removal, and safe replacement/cleanup of prior timers;
- React Native `Animated` and `PanResponder` bottom-sheet interactions with no new gesture dependency;
- a full-width bottom sheet with a dedicated 44-point handle-only drag target. Attach `PanResponder` only to that target—not sheet content—with start/move capture behavior, Android-safe native view retention where needed, non-negative translation, active-animation interruption on drag grant, termination spring-back, and dismissal at 18% of measured sheet height or velocity above `0.7`;
- bottom-sheet safe-area behavior: the sheet surface extends to the physical bottom edge, while its content reserves `useSafeAreaInsets().bottom` plus token spacing so gesture-navigation and three-button-navigation areas do not obscure controls;
- entry/exit transitions that retain overlay or toast content until animation completion. Route all confirmation, backdrop, hardware-back, button, and sheet-drag terminal paths through one idempotent exit lifecycle; clear state and invoke exactly one completion callback only after exit motion completes;
- accessible action hierarchy: use a semantic foreground token for filled primary and destructive actions, a distinct secondary cancel treatment, 44-point minimum action heights, and token-driven pressed feedback;
- exact file, dependency, configuration, validation, and manual-test changes.

Do not edit files or add dependencies until the user says **proceed**.

#### Phase 3 Proceed

Implement only the approved Phase 3 scope. Keep the overlay context contract separate from provider and host implementation. `OverlayProvider` owns typed overlay state, timers, and idempotent completion lifecycle. Mount one `OverlayHost` from the root shell beneath the approved theme and safe-area providers but outside the route-only root `SafeAreaView`, so native modal content can cover the entire window. Use only semantic theme tokens for overlay visuals and do not hard-code host backdrop colors.

When Android overlays must cover system-bar regions, enable `edgeToEdgeEnabled: true` in Expo config and verify in a rebuilt Android app. Expose overlay-active state so the root shell uses readable status-bar icons while blocking overlays are visible.

Use React Native `Modal`, `Animated`, and `PanResponder` for modal and bottom-sheet interactions unless a dependency is explicitly approved. Centered dialogs use the shared fixed preferred width within horizontal viewport padding. Bottom sheets are full width, use top corner radii only, extend their surface to the bottom edge, and reserve bottom inset only for content. Render the backdrop below an interactive full-width sheet layer. Disable backdrop interaction during sheet exit so backdrop presses and drag dismissal cannot race. Keep loader overlays blocking and close them only through the typed API or provider-owned duration cleanup. Render toasts directly over root content, respect the top safe-area inset, replace/clear timers safely, and retain toast content until exit animation completes.

Use the bottom-sheet handle as a 44-point handle-only drag target; do not attach drag handling to sheet content. Use start/move capture behavior, Android-safe native view retention where needed, non-negative translation, and active-animation interruption on drag grant. Spring back after insufficient or terminated downward drags; dismiss when downward movement reaches at least 18% of measured sheet height or vertical velocity exceeds `0.7`.

Retain overlays through exit motion. Ensure backdrop dismissal, hardware-back behavior, button actions, loader timing, sheet-drag dismissal, callbacks, and toast timers cannot invoke completion behavior more than once. Use semantic action foreground tokens for filled primary/danger buttons and a distinct secondary cancel treatment.

Validate with `npx tsc --noEmit`, `npx expo export --platform ios --output-dir <temporary-directory-outside-repository>`, `npx expo export --platform android --output-dir <temporary-directory-outside-repository>`, `npx expo config --type public --json`, and `git diff --check`. Manually test iOS and Android alert, confirmation, destructive confirmation, custom-modal, loader, toast, and bottom-sheet behavior: full-window backdrop coverage including the top safe area/status bar; readable status-bar icons while overlays are active; Android edge-to-edge behavior in a rebuilt native app; fixed dialog width at normal and narrow viewport sizes; full-width sheet surface; sheet content clearance above gesture and three-button navigation; handle-only drag behavior; drag spring-back; distance/velocity dismissal; backdrop/hardware-back dismissal; toast replacement and animated exit; and repeated open/close callback idempotence.

#### Phase 3 Review and Approval

On **review changes**, list all Phase 3 work without editing. Include provider/context/host boundaries, theme-token additions, dependencies, validation results, manual-test status, limitations, and deferred work. Identify pre-existing or out-of-scope changes separately. On **approve changes**, record only app-specific durable overlay decisions in the approved project decisions section.

### Phase 4 — Tabs Module

**Goal:** establish primary Home and Settings experiences with a reusable floating tab bar after Phase 3 is approved.

#### Phase 4 Advice

Propose an Expo Router tab structure with a root LandingScreen, Home and Settings root routes, and generic nested placeholder routes:

```text
app/
├── _layout.tsx
├── index.tsx # LandingScreen
└── (tabs)/
    ├── _layout.tsx
    ├── home/
    │   ├── _layout.tsx
    │   ├── index.tsx
    │   └── demo/
    │       └── index.tsx
    └── settings/
        ├── _layout.tsx
        ├── index.tsx
        └── demo/
            └── index.tsx
src/
└── components/
    └── tabs/
        └── bottomBar.tsx
```

Include:

- a root `LandingScreen` at `app/index.tsx` and an Expo Router `(tabs)` route group for the primary experiences;
- disabled native headers and route animations with `headerShown: false` and `animation: 'none'` at root, tab, and nested stack levels;
- the standard Expo Router tab bar hidden in favor of a shared floating pill `bottomBar.tsx` for Home and Settings root routes;
- theme-token-driven bottom-bar styling using the approved icon system, safe-area-aware placement, 48-point accessible targets, selected state, and press-scale feedback;
- no navigation dispatch when the user presses an already active tab, with replacement navigation for inactive-tab switches;
- full-screen nested routes that do not show the bottom bar;
- generic `demo/` directories that remain temporary until a future module renames them, for example to `attendance/`;
- a Home pressable that returns to the LandingScreen and a LandingScreen action that returns to Home;
- exact dependency, configuration, validation, and manual-test changes.

Do not edit files or add dependencies until the user says **proceed**.

#### Phase 4 Proceed

Implement only the approved Phase 4 scope. Preserve the root LandingScreen at `app/index.tsx`; configure the root, tab, and nested stacks with `headerShown: false` and `animation: 'none'`. Use Expo Router `Tabs` with the system tab bar hidden, and render the shared `src/components/tabs/bottomBar.tsx` only on the Home and Settings root routes.

Use approved theme tokens and the approved icon system for the floating bar. Respect bottom safe-area insets and provide accessible touch targets of at least 48 points. Do not dispatch navigation for an already active tab. Use replacement navigation for inactive tab switches so repeated active-tab presses do not refresh Android screens.

Keep nested routes such as `home/demo` and `settings/demo` full-screen without the bottom bar. Keep `demo/` generic until a future module renames it. Link Home to the root LandingScreen and route the LandingScreen action back to Home with replacement navigation.

Validate with `npx tsc --noEmit`, `npx expo export --platform ios --output-dir <temporary-directory>`, and `git diff --check`. Manually test iOS and Android active-tab behavior, nested-route bar visibility, safe-area spacing, disabled route animation, and navigation between LandingScreen and Home.

#### Phase 4 Review and Approval

On **review changes**, list all Phase 4 work without editing. Include route hierarchy, floating-bar visibility rules, active-tab navigation behavior, dependencies/configuration, validation results, manual-test status, limitations, and deferred module work. Identify pre-existing or out-of-scope changes separately. On **approve changes**, record only app-specific durable navigation decisions in the approved project decisions section.

### Phase 5 — Shared Module

**Goal:** establish reusable screen, picker, and floating-control foundations after Phase 4 is approved.

#### Phase 5 Advice

Propose a shared module using this structure:

```text
src/
├── components/
│   └── shared/
│       ├── appScreen.tsx
│       ├── emptyState.tsx
│       ├── longList.tsx
│       └── optionPicker.tsx
├── constants/
│   └── layout.ts
├── contexts/
│   └── barContext.tsx
└── hooks/
    └── useBar.ts
```

Include:

- a reusable `AppScreen` that owns scroll layout, optional back/title/subtitle/right-slot header content, pull-to-refresh wiring, focused scroll registration, and component-level screen presence motion;
- shared `EmptyState`, `LongList`, and `OptionPicker` components, with radio semantics for preference choices and button/action semantics for navigation choices; preference persistence remains session-only unless explicitly approved;
- direct use of `useOverlay()` for overlay work; do not add thin `useModal()` or `useSheet()` wrapper hooks unless they provide durable behavior beyond renaming the typed overlay API; use `dismiss(onComplete?)` for selection-triggered follow-up work that must occur after overlay exit animation completion, while backdrop and hardware-back dismissal use plain `dismiss()` and never trigger selection behavior;
- a Home right-slot action that opens an action-mode `OptionPicker` in a custom modal and completes navigation only after the modal’s single-invocation-safe dismissal lifecycle;
- a Settings preference action that opens `OptionPicker` in the approved bottom sheet and dismisses after selection;
- `BarProvider` and `useBar()` for global floating-control state, with each focused `AppScreen` registering its own scroll controller so inactive routes cannot affect the active screen;
- scroll-direction hysteresis for floating-control visibility: root `/home` and `/settings` routes show a full-width floating tab-bar pill at rest, then fade it out in favor of a separate centered 56-point circular scroll-to-top action after scrolling; nested `/home/*` and `/settings/*` routes never show the tab bar but may show the scroll-to-top action after scrolling; keep both controls on the same safe-bottom placement anchor while preserving their distinct size and layout; use a fixed shared stage, fade-only handoff, and non-interactive fading controls without layout-position animation;
- bottom-inset-aware placement with platform-specific visual minimum offsets and sufficient root-screen content clearance;
- no route-animation change: keep Expo Router route transitions configured with `animation: 'none'` and use component-owned motion for shared screen presentation;
- exact dependency, file, validation, and iOS/Android manual-test changes.

Do not edit files or add dependencies until the user says **proceed**.

#### Phase 5 Proceed

Implement only the approved Phase 5 scope. Use `AppScreen` for the approved root and nested screen foundations. Root Home and Settings screens must reserve the shared floating-control content clearance; nested routes must not reserve it.

Use `useOverlay()` directly. Ensure custom-modal and bottom-sheet exit callbacks, backdrop dismissal, hardware-back dismissal, sheet drag dismissal, and selection actions invoke their completion behavior no more than once. Use `dismiss(onComplete?)` when Home option selection must wait for modal exit before navigating; use plain `dismiss()` for backdrop and hardware-back paths so they cannot trigger selection navigation. Keep dismissal state safe for callbacks captured in custom modal content. Settings preference selection must dismiss its sheet after updating the selected value.

Mount `BarProvider` in the approved root provider hierarchy. Register and activate only the focused route’s scroll controller. On root `/home` and `/settings`, show the full-width tab-bar pill at rest and fade to a separate centered 56-point circular scroll-to-top action after direction hysteresis. On nested `/home/*` and `/settings/*` routes, never render the tab bar; render only the scroll-to-top action after scrolling. Position both controls from the same safe-bottom anchor while preserving their separate dimensions and layout. Apply a fixed-height absolute control stage, fade-only visibility handoff, and disabled pointer events while controls fade out. Keep floating controls bottom-inset-aware and ensure root content remains reachable above them.

Validate with `npx tsc --noEmit`, `npx expo export --platform ios --output-dir <temporary-directory-outside-repository>`, `npx expo export --platform android --output-dir <temporary-directory-outside-repository>`, and `git diff --check`. Manually test picker selection and dismissal, post-exit Home navigation, backdrop and hardware-back cancellation without navigation, tab switching, active-screen scroll ownership, root and nested floating-control visibility, scroll-to-top behavior, fade-handoff non-interactivity, compact-header readability at narrow widths and large-text settings, and iOS/Android gesture and three-button-navigation placement.

#### Phase 5 Review and Approval

On **review changes**, list all Phase 5 work without editing. Include shared-component boundaries, overlay callback lifecycle behavior, floating-control ownership and visibility rules, dependencies/configuration, validation results, manual-test status, limitations, and deferred module work. Identify pre-existing or out-of-scope changes separately. On **approve changes**, record only app-specific durable shared-module decisions in the approved project decisions section.

### Idea to Feature

After Phase 5 is approved, develop product work as one unnumbered feature slice at a time. Do not define additional numbered phases unless the project explicitly returns to foundation work.

Do not use this workflow until Phase 5 has been explicitly approved. Before then, continue the active foundation-phase workflow.

Use one named feature at a time:

```text
Feature: <feature name>
Status: Advice | In progress | Awaiting review | Approved
Scope: <one-sentence boundary>
```

#### `idea to feature`

Treat an idea or feature proposal as an Advice call, not permission to edit.

1. Inspect the current app foundation, route structure, active providers/hooks, metadata and design direction, declared dependencies, current working tree, and relevant existing modules.
2. Translate the request into one bounded feature proposal.
3. State:
   - user goal and user flow;
   - scope and explicit non-goals;
   - likely routes, files, contexts, hooks, constants, components, dependencies, and configuration;
   - data ownership, persistence behavior, and migration needs;
   - accessibility, safe-area, navigation, overlay, theme, and platform implications;
   - security, privacy, backend-contract, and failure-state implications when relevant;
   - validation, iOS/Android manual tests, acceptance criteria, limitations, and deferred work.
4. Do not assume backend contracts, API availability, credentials, storage duration, privacy policy, analytics, external services, or production security behavior without explicit approval.
5. Ask one focused question only when its answer materially changes the proposal.
6. Wait for `proceed`.

#### Feature `proceed`

Implement only the immediately preceding approved feature scope.

- Preserve approved foundation boundaries and use existing shared modules before adding new abstractions.
- Do not add unrelated features, refactors, dependency upgrades, cleanup, or configuration changes.
- If a material product, UX, security, persistence, privacy, API, or backend decision appears, return to Advice rather than choosing silently.
- Validate the work and report `Awaiting review`.

#### Feature `review changes`

Do not make changes.

- List every active-feature change by file and user-visible behavior.
- Include dependencies and configuration changes; state, persistence, migration, privacy, and security behavior; validation results; manual-test status; limitations; deferred backend or product work; and pre-existing or out-of-scope changes.
- Wait for revisions plus `proceed`, or `approve changes`.

#### Feature `approve changes`

- Update `Approved Project Decisions` with durable product-specific decisions only.
- Do not add temporary task notes, test credentials, secrets, personal data, or private content.
- State what was added or revised in this guide, validate the update, and mark the feature `Approved`.
- Return to `Idea to Feature` Advice for the next request.

## Approved Project Decisions

### Phase 1 — App Metadata and Native Foundation

- App: Aster — a CelcomDigi customer-support and ticketing platform.
- Native-only targets: iOS and Android; portrait orientation; scheme `aster`; slug `aster-support`.
- Package identifiers: `com.celcomdigi.aster` for iOS and Android.
- Version policy: `src/constants/about.ts` is the user-visible metadata source; the app version is `0.0.0` and must remain aligned with `package.json` and Expo config.
- Routing: Expo Router with `app/_layout.tsx` as the root shell and `app/index.tsx` as the landing screen; legacy root entry files are removed.
- Design direction: calm, trustworthy telco support using deep navy and bright cyan.
- Typography and icons: Inter font family and `@expo/vector-icons`.
- Safe-area ownership: root `SafeAreaProvider` and root `SafeAreaView` belong in `app/_layout.tsx`.
- Foundation dependencies: Expo Router, Expo Constants, Expo Linking, Expo Font, Inter font package, vector icons, and React Native Safe Area Context.
- Baseline validation: `npx tsc --noEmit`, `npx expo config --type public --json`, iOS/Android Expo exports, and `git diff --check` for active-phase changes.

### Phase 2 — Theme Module

- Theme: typed semantic light/dark tokens for colors, spacing, radii, opacity, typography, Inter font families, and shadow/elevation.
- Behavior: initial mode follows the device scheme; manual selection is session-only and is not persisted.
- Root shell: `SafeAreaProvider`, `ThemeProvider`, and one themed top-edge-only root `SafeAreaView`; routes do not add safe areas by default.
- Status bar: follows the resolved theme for readable system icons.
- Theme control: reusable 48-point icon-only switch using `@expo/vector-icons`, accessible labels/state, and native-driver press-scale feedback.
- Themed UI uses token-driven inline styles; the landing route remains a scrollable visual reference for active tokens.

### Phase 3 — Theme-Aware Global Overlay System

- Overlay architecture: `OverlayContext` defines the typed contract; `OverlayProvider` owns overlay/toast state, timer cleanup, and single-invocation completion; `OverlayHost` renders modal and toast UI; `useOverlay()` is the consumer API.
- Supported overlay APIs: alert, confirmation, destructive confirmation, custom modal, bottom sheet, blocking loader, toast, and `dismiss(onComplete?)` for work that must occur after exit animation completion.
- Root integration: `OverlayProvider` is mounted beneath the theme provider; `OverlayHost` is rendered outside the route-only root safe-area wrapper so modal backdrops cover the full window. Blocking overlay activity selects a readable light status-bar style.
- Visual tokens: light/dark overlay backdrop and semantic success, danger, warning, and info colors with soft counterparts are defined in the theme. Dialog, loader, and toast surfaces use a dedicated zero-elevation overlay shadow token to avoid Android rectangular elevation artifacts.
- Android: `edgeToEdgeEnabled: true` is enabled. Android system-bar coverage must be verified in a rebuilt native development build or binary.
- Dismissal behavior: dialogs and sheets dismiss through one exit lifecycle; callbacks run only after exit motion. Toasts replace prior content safely, respect top safe-area spacing, and remain until exit animation completes.
- Bottom sheets: full-width sheet surfaces extend to the physical bottom; content reserves bottom inset plus token spacing. Drag handling is limited to a 44-point handle target, uses React Native `Animated` and `PanResponder`, springs back after insufficient/terminated downward drags, and dismisses at 18% of measured height or vertical velocity above `0.7`.
- Validation: `npx tsc --noEmit`, public Expo config inspection, iOS/Android Expo exports, and `git diff --check`; manually verify overlay behavior, Android edge-to-edge output, status-bar readability, gestures, callbacks, and light/dark presentation on iOS and Android.

### Phase 4 — Tabs Module

- Routing: the root LandingScreen remains at `/`; Home and Settings live in an Expo Router `(tabs)` group with nested generic `demo/` placeholder routes. Root, tab, and nested stacks disable native headers and route animations.
- Primary navigation: Expo Router’s standard tab bar remains hidden. A reusable floating `BottomBar` is rendered only on Home and Settings root screens; nested routes are full-screen without it.
- Tab behavior: bottom-bar targets use theme tokens, `@expo/vector-icons`, session theme styling, bottom safe-area positioning, 48-point minimum targets, press-scale feedback, and accessibility tab semantics. Active-tab presses are no-ops; inactive-tab switches use replacement navigation.
- Landing flow: LandingScreen replaces to Home; Home replaces back to LandingScreen.
- Dependencies/configuration: no Phase 4 dependencies or Expo configuration were added.
- Validation: `npx tsc --noEmit`, iOS/Android Expo exports, and `git diff --check`; manually verify tab selection/no-op behavior, nested-route bar visibility, safe-area placement, disabled route transitions, and LandingScreen/Home navigation on iOS and Android.

### Phase 5 — Shared Module

- Shared foundations: `AppScreen` owns scroll layout, focused scroll-controller registration, optional refresh handling, component presence motion, and a token-driven inline header with optional icon-only back control, subtitle/title block, and right slot. `EmptyState`, `LongList`, and `OptionPicker` are reusable shared primitives.
- Picker behavior: Home presents action choices in the typed custom modal and uses `dismiss(onComplete?)` before follow-up navigation. Settings presents a preference picker in the typed bottom sheet; preferences are session-only and selection uses plain dismissal after state update. `OptionPicker` uses button semantics for actions and radio semantics for preferences.
- Navigation: nested demo routes use deterministic replacement returns to their root routes (`/home` or `/settings`) rather than history-dependent `router.back()` behavior, including entry from Home’s replacement-based action-picker flow.
- Floating controls: `BarProvider` owns active focused-screen scroll control. Root Home and Settings display the floating tab pill at rest, then fade to a centered 56-point scroll-to-top action after direction hysteresis. Nested routes never show the tab pill but may show the scroll-to-top action. Both controls share one bottom-inset-aware stage and noninteractive fading controls.
- Dependencies/configuration: no Phase 5 dependencies or Expo configuration were added.
- Validation: `npx tsc --noEmit`, iOS/Android Expo exports, and `git diff --check`; manually verify picker dismissal/navigation sequencing, deterministic nested returns, scroll ownership, floating-control handoff, narrow/large-text headers, and iOS/Android safe-bottom placement. Android runtime verification remains dependent on an available emulator or physical device.

### Feature — Authentication Module

- Scope: non-production local CelcomDigi demo authentication; no production identity provider, carrier lookup, OTP delivery, OTP validation, or backend support-system integration is implemented.
- Authentication journey: LandingScreen validates only demo number `011-0000-0000`; unsupported numbers show an overlay warning. The supported number advances to an in-place demo OTP acknowledgment, where an explicit Proceed action creates the local session. The random-demo-number action is informational only and shows an overlay toast.
- Session/privacy: `AuthProvider` hydrates, validates, and clears a versioned minimal session in Expo SecureStore. Stored data contains only credential type, generated display name, expiry, and schema version—never raw phone numbers or OTP values. Sessions expire after 24 hours. Malformed, expired, unavailable, or failed storage resolves to logged-out behavior; logout always clears in-memory state and attempts persistent cleanup.
- Route protection: authenticated tab and nested demo routes are gated during hydration and redirect unauthenticated access to LandingScreen. Authenticated LandingScreen sessions replace to Home.
- Logout: Home actions contain Home Demo, Profile, and Log out. Logout from Home or Settings uses the typed destructive confirmation overlay, clears the local session, replaces to LandingScreen, and shows a warning toast if SecureStore cleanup fails.
- Dependency/configuration: `expo-secure-store` is installed with its Expo config plugin. Native SecureStore behavior still requires iOS/Android runtime verification in a rebuilt development build or binary.
- Validation: `npx tsc --noEmit`, public Expo config inspection, iOS/Android Expo exports, and `git diff --check`; manually verify login/restore/expiry/malformed-storage handling, protected-route redirects, logout, keyboard/safe-area layout, and iOS/Android SecureStore behavior.

### Feature — Profile Module

- Scope/privacy: Profile is a non-production, session-only local customer-profile experience. It is independent of AuthProvider SecureStore session data; it neither modifies the authenticated session display name nor stores profile data. No carrier lookup, backend update, or production customer-record behavior is implemented.
- Data/reset behavior: The profile starts from typed CelcomDigi demo data. Full name, email, support language, and preferred contact channel are editable with local validation; mobile number and demo account type are read-only. `ProfileProvider` resets its in-memory profile to the dummy default when authentication becomes unavailable and after cold restart.
- Routing: Settings links to nested `/settings/profile`, replacing the former Settings demo route. Home exposes the same route from its post-dismissal action picker and through a compact profile card; the nested Profile screen returns deterministically to Settings.
- Reusable UI: `ProfileCard` displays the current in-memory profile on Home, and `ProfileDetail` provides the shared themed label/value profile detail primitive. Both use approved theme tokens, Inter typography, Ionicons, and accessible native interaction semantics.
- Dependencies/configuration: no Profile Module dependencies or Expo configuration were added.
- Validation: `npx tsc --noEmit`, public Expo config inspection, iOS/Android Expo exports, and `git diff --check`; manually verify profile navigation, read/edit/save/cancel/validation behavior, Home card updates after save, logout/cold-restart reset behavior, and iOS/Android layout/accessibility behavior.

### Feature — Ticket Module

- Scope/privacy: Ticketing is a non-production, session-only local support experience. Tickets, messages, statuses, and records remain in memory for the current app session and are not transmitted to CelcomDigi or a live support backend. The ticket form explicitly warns users not to enter passwords, OTPs, payment-card details, or other sensitive information.
- Routing: Home creates tickets at `/home/ticket`, shows the local ticket collection at `/home/ticket/record`, and opens ticket details at `/home/ticket/[id]`. The legacy Home demo route is removed. Nested ticket routes use deterministic replacement navigation back to Home or Ticket Records.
- Ticket behavior: Users select a typed category, submit a locally validated description and optional remarks, and receive an in-memory reference/status. Records support All, Submitted, In review, and Resolved filters. Details show category, local preferred contact channel, status, timestamps, and a customer/system conversation timeline with an explicit no-live-agent disclosure.
- Data/reset behavior: `TicketProvider` initializes typed dummy ticket records and resets its in-memory collection whenever authentication becomes unavailable or after a cold restart. No ticket or message data is persisted.
- Shared screen/floating controls: `AppScreen` is the themed authenticated screen shell, supports optional static rendering through `scrollEnabled`, hides vertical scroll indicators by default, and retains component-owned opacity/translate entry motion. Title and subtitle remain in scroll flow, while optional back and right-slot actions remain fixed in an absolute top-control layer; each route may reserve the required right-slot width to prevent header-text overlap. Root, tab, and nested navigator surfaces use the active theme background to avoid dark-mode transition flashes. Root routes own the floating tab pill; nested `AppScreen` routes mount scroll-only floating controls that expose the centered scroll-to-top action for the active focused screen after the shared scroll threshold/hysteresis.
- Ticket submission action: Create Ticket uses a fixed top-right Submit action instead of a form-end button. It is disabled until a category is selected and the issue description contains non-whitespace text; authoritative local validation still checks all draft constraints when submission is attempted.
- Dependencies/configuration: no Ticket Module dependencies or Expo configuration were added.
- Validation: `npx tsc --noEmit`, public Expo config inspection, iOS/Android Expo exports, and `git diff --check`; manually verify light/dark ticket creation, validation, records filters/empty states, details/conversation disclosure, session reset behavior, nested scroll-to-top behavior, root tab-bar handoff, and iOS/Android safe-area placement.

### Feature — Notification, Settings, and Home Experience Refinement

- Notifications: `NotificationProvider` keeps local ticket and telco-support updates in React memory only. Home presents an accessible notification bell with unread count; `/home/notification` supports read, read-all, acknowledgement, and linked local-ticket navigation. There is no device push delivery, backend notification service, scheduling, analytics, or notification persistence.
- Settings: root Settings is intentionally limited to Profile and the session-only appearance mode. The fixed About action opens a themed custom modal with app metadata, the latest changelog entry, and the non-production local-data disclosure. Logout remains available only through Home shortcuts with the existing destructive confirmation lifecycle.
- Home: Home is a support-first dashboard rather than a profile entry point. It provides a personalized local-demo support hero, open/resolved ticket summary, recent local ticket activity, typed common-topic quick starts, and an unacknowledged local service-notice shortcut when one exists. Profile remains accessible from Home shortcuts, not through a Home profile card.
- Ticket quick starts: Home topic tiles pass a validated optional ticket-category route parameter to preselect the existing local ticket form category. Missing or invalid parameters leave the form unselected; no category choice is persisted separately.
- Version: the approved application version is `0.6.0`; `src/constants/about.ts` remains the user-visible metadata source and stays synchronized with package and Expo configuration versions.
- Validation: `npx tsc --noEmit`, public Expo config inspection, iOS/Android Expo exports, and `git diff --check`; manually verify notification behavior, Settings/About presentation, Home dashboard actions, category preselection, local-data disclosures, light/dark mode, large text, and iOS/Android safe-area placement.

### Feature — Chat Module

- Scope/privacy: Chat is a local, non-production demo. Conversations and free-text messages remain in React memory only and are cleared on logout or app restart. They are not recorded, persisted, or sent to a live support service. The UI clearly discloses this and warns against entering sensitive data; production recording/retention terms must be established before a live chat is offered.
- Flow: Home asks users to acknowledge the demo disclosure via the typed confirmation overlay when creating the first chat or a new chat. The chat simulates delayed greeting, category prompt, typing indicators, and generic automated replies; it does not imply a live agent is connected. Messages are limited to 500 characters.
- Records/resume: `ChatProvider` owns multiple session-only conversations. Home resumes the latest chat when one exists. `/home/chat/record` lists conversations and allows resuming one or explicitly creating another; `/home/chat` displays the active conversation. Timed demo replies remain owned by the provider while navigating and are cleared on logout or provider teardown.
- UI: Chat uses the shared `AppScreen`, themed message bubbles, category choices, a keyboard-aware bottom composer with safe-area padding, automatic scroll-to-latest-message behavior, and no floating scroll controls that could overlap the composer.
- Home actions: the Home actions picker contains Send us a ticket, Chat with us, Manage profile, and Log out, with short descriptions. Chat resumes or confirms a new demo conversation; other actions retain their existing routes and logout confirmation behavior.
- Dependencies/configuration: no Chat Module dependencies or Expo configuration were added.
- Validation: TypeScript, iOS/Android Expo exports, and `git diff --check`; manually verify consent/cancel, staged chat messages, category selection, composer/keyboard behavior, record resume/new-chat behavior, logout clearing, and light/dark and safe-area presentation on iOS and Android.

### Feature — Profile Details and Home Account Overview

- Profile: an optional nickname is editable with the other local demo profile fields. Home uses the nickname for its greeting, falling back to the first name from the full name. Profile data remains in memory for the authenticated session and resets on logout or app restart.
- Billing summary: `src/constants/billing.ts` owns fixed dummy MYR billing data (RM 128.50, October 2026 statement, due 15 November 2026). It is read-only, visibly labeled as sample data, and displayed on Home and Profile. No real billing lookup, payment action, transaction, or backend is implemented.
- Home: the account overview replaces the support hero/profile card. `AppScreen` displays a personalized greeting and the customer phone number as its subtitle, followed by the demo due summary, ticket/chat quick actions, service notices, and ticket status/recent activity. Common-topic quick starts are omitted from the redesigned Home.
- Dependencies/configuration: no Profile/Home feature dependencies or Expo configuration changes were added. App version is `0.7.0`, sourced from `src/constants/about.ts` and synchronized with `package.json`, `package-lock.json`, and Expo config.
- Validation: `npx tsc --noEmit`, public Expo config inspection, iOS/Android Expo exports, and `git diff --check`; manually verify nickname edit/fallback/reset, dummy billing labels and no-due state, Home navigation, light/dark mode, large text, and iOS/Android safe-area layout.

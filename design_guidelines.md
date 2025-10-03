# Design Guidelines: MS Teams Access Management Bot

## Design Approach
**Reference-Based Approach**: Drawing inspiration from Microsoft Teams' interface patterns and Material Design for enterprise applications. This utility-focused application prioritizes efficiency and familiarity over visual flair.

## Core Design Elements

### A. Color Palette
**Dark Mode Primary** (matching Teams aesthetic):
- Background: 220 15% 8% (deep dark blue-gray)
- Surface: 220 12% 12% (slightly lighter panels)
- Primary: 217 91% 60% (Teams blue)
- Text Primary: 0 0% 95% (near white)
- Text Secondary: 0 0% 70% (muted gray)
- Success: 142 69% 58% (green for approvals)
- Warning: 38 92% 50% (amber for pending)
- Error: 0 84% 60% (red for rejections)

### B. Typography
- **Primary Font**: Segoe UI (Teams native), fallback to system fonts
- **Sizes**: Text-sm for chat messages, text-xs for timestamps, text-base for cards
- **Weights**: font-medium for usernames, font-normal for content, font-semibold for headers

### C. Layout System
**Tailwind Spacing Units**: Consistent use of 2, 4, and 8 units
- Padding: p-2 for tight spacing, p-4 for standard, p-8 for generous
- Margins: m-2, m-4, m-8 following same pattern
- Heights: h-8 for buttons, h-12 for input fields, h-16 for chat items

### D. Component Library

**Chat Interface**:
- Left sidebar (w-64) with user list and bot commands
- Main chat area with message bubbles aligned left/right based on sender
- Message input at bottom with rounded-lg borders
- Timestamp display with text-xs and muted colors

**Adaptive Cards**:
- Elevated cards (shadow-md) with rounded-lg borders
- Color-coded left borders for different card types (blue for info, green for approvals)
- Action buttons using Teams-style primary/secondary button patterns
- Structured data display with key-value pairs in grid layouts

**Command Interface**:
- Autocomplete dropdown for @AccessBot commands
- Syntax highlighting for command parameters
- Help tooltips for command guidance

**Approval Workflow**:
- Prominent approve/reject buttons with appropriate colors
- Status indicators with icon + text combinations
- Audit trail display with monospace font for IDs

### E. Interaction Patterns
- **No animations** except for standard button hover states and loading indicators
- Click-to-copy functionality for audit IDs and URLs
- Expandable sections for detailed user information
- Modal overlays for PDF viewing and detailed app information

## Key Design Principles
1. **Familiarity**: Mirror Teams UI patterns for immediate user recognition
2. **Clarity**: High contrast ratios and clear visual hierarchy
3. **Efficiency**: Minimal clicks to complete tasks, keyboard shortcuts supported
4. **Consistency**: Unified spacing, colors, and interaction patterns throughout

## Specific Implementation Notes
- Use rounded-lg consistently for all cards and major UI elements
- Maintain 4:1 contrast ratio minimum for all text
- Implement proper focus states for keyboard navigation
- Keep command syntax visible and easily discoverable
- Ensure all interactive elements have clear hover/active states
# Changelog
## Iteration - Add Tooltip to Liner Entry
- UI Changes: Added a TikTok-style black & red tooltip ("遇见与你直播同频的TA") above the floating fire icon on the `Home` page (`/home`), sharing the same bounce animation and click action as the main entry button.
## Iteration - Fix Chat History Overwrite Bug & Copy Update
- UI Changes: Changed the title of the event acceptance preview modal in `Chat.tsx` from "确认回复话术" to "回应TA的邀请".
- Bug Fixes: Fixed a bug in `Chat.tsx` where manually sending a text message would overwrite URL `searchParams` and erase previous chat history (like the system prefilled message or LIVE Event invitation). Manual messages are now safely appended to a `localMessages` state.
## Iteration - Fix Preview Modal Navigation
- Logic Changes: Fixed `Received.tsx` to navigate to `/chat?target=h8&action=previewAcceptEvent` instead of `acceptEvent` directly, correctly triggering the edit modal from the received page.
## Iteration - Add Preview Modal for Event Acceptance
- Logic Changes: Added a preview modal in `Chat.tsx` triggered by `action=previewAcceptEvent`, allowing users to preview and edit the AI-generated acceptance message before sending.
- Logic Changes: Updated `Received.tsx` and `Chat.tsx` to navigate to the preview state instead of immediately accepting the event.
- Routing Changes: Updated `prototype-route.json` to include the new preview states for event acceptance.
## Iteration - Fix Auto Reply Bug
- Logic Changes: Updated `Chat.tsx` to handle the `acceptEvent` action without a specific message payload by dynamically pushing a persona-based auto-reply into the `messages` array.
- Logic Changes: Added an auto-scroll effect (`scrollIntoView`) in `Chat.tsx` triggered by `messages.length` changes, ensuring new messages (including auto-replies) are always immediately visible.
- Bug Fixes: Fixed the bug where the auto-reply message was promised but not rendered upon accepting Nastia's event invitation.
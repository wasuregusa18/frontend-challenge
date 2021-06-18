# Frontend Challenge

Live application

<https://decode-frontend-challenge.netlify.app/>

Specifications

<https://docs.google.com/document/d/1rG455VStu0ThZDWuZBiy_5N3k7rHkFuUTiikiilLHXo/edit>

Target UI Design

<https://xd.adobe.com/view/9a1507ed-d228-4c27-43cc-2ef6c4c5239b-ec24/>

## Design Decisions

### Each game bound to unique, readable url

#### Design

Users should be able to bookmark their favourite games and navigate to them directly without having to go through the game selector menu.

#### Implementation

Games are accessed via a urlId (their name toLowercase and with spaces replaced by dashes "Double Trouble" => "double-trouble"). This allows Game component to read and set current game from url.

### Games should work offline

#### Design

Gameplay itself involves no API call (only to upload score upon finish). This makes it a suitable canditate for progressive web app. Users should be able to download the web app onto their phones and play offline. Refreshing the page should preserve state (i.e. 50 seconds left on refresh - still 50 seconds left after)

#### Implementation

Create-react-app's service worker is registered and redux state is persisted by redux-persist. Time left is stored in store and updated every tick (see earlier commits for non PWA version).

### Lazy loading of game engines/intros

#### Design

A user going directly to bookmarked favourite game should not have to wait while browser loads all of the game engines files (potentially very big file). Instead, the app should load only the files it needs when it needs them.

#### Implementation

React.lazy loads only the required game engine when rendered (code-splitting). Currently, it loads it upon render, but in production I would add react-lazy-with-preload and preload the game engine on the start page.

## Other Details

### 3rd party UI frameworks

To accelerate building the UI, I used components from both Material UI and Ant Design. Most of these were for responsive grids (Material UI's container, Antd's Row and Col). Webpack's tree shaking should eliminate most unnecessary code, but there is probably still some bloat.

### Testing

I implemented some sample tests (mock fetch, mock timer, mock store, etc...) to demonstrate proficiency, but coverage is pretty low. In reality, I would be writing many more tests.

### Additions

I followed the specified UI, but left to design the UI myself, I would have added several elements:

1. Feedback on whether score was uploaded (also ability to try upload again)
2. Ability to exit game in the middle
3. Choice of going to score from intro page if game already played (currently clicking "I understand" just resets game).

### Credits

Sound effects from <https://www.zapsplat.com> and <https://quicksounds.com>
Favicon Image made by Google

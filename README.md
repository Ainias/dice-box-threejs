# dice-box-threejs

3D Dice implemented with ThreeJS and Cannon ES

Based on [Major's 3D Dice](https://majorvictory.github.io/3DDiceRoller/)

The goal of this project is to decouple the UI of Major's 3D Dice and strip down the dice box to just the essentials. Just a module that accepts simple dice notation input and outputs a JSON object when the dice finish rolling.

Why another dice roller when you have [@3d-dice/dice-box](https://github.com/3d-dice/dice-box)?
Teall dice had already solved predeterministic rolling, which is a feature some developers really need. Major's 3D dice are based on Teall Dice.

## Demo

https://codesandbox.io/s/dice-box-threejs-j79h35?file=/src/index.js

## Install using NPM

```
npm install @3d-dice/dice-box-threejs
```

## Config Options

```
const defaultConfig = {
	framerate: (1/60),
	sounds: false,
	volume: 100,
	color_spotlight: 0xefdfd5,
	shadows: true,
	theme_surface:  "green-felt",
	sound_dieMaterial: 'plastic',
	theme_customColorset: null,
	theme_colorset: "white", // see available colorsets in https://github.com/3d-dice/dice-box-threejs/blob/main/src/const/colorsets.js
	theme_texture: "", // see available textures in https://github.com/3d-dice/dice-box-threejs/blob/main/src/const/texturelist.js
	theme_material: "glass", // "none" | "metal" | "wood" | "glass" | "plastic"
	gravity_multiplier: 400,
	light_intensity: 0.7,
	baseScale: 100,
	strength: 1, // toss strength of dice
	onRollComplete: () => {},
	enableDiceSelection: false, // Enable hover and click detection on dice
	onDiceHover: () => {}, // Callback when hovering over a die
	onDiceClick: () => {} // Callback when clicking a die
}
```

## Getting Results

### There are three ways to get results

1. You can define an `onRollComplete` callback function when creating the Dice Box

```
const Box = new DiceBox("#scene-container",{
  onRollComplete: (results) => {
    console.log(`I've got results :>> `, results);
  }
});
```

2. You can listen for the custom event that is triggered when results are ready

```
document.addEventListener("rollComplete",(e => {
  console.log(`I've got custom event results :>> `, e.detail);
}))
```

3. You can await the results from the `roll` method. Just be sure the function this call is in is `async`

```
setTimeout(async () => {
  const result = await Box.roll("6d6")
  console.log('result :>> ', result);
}, 1000);
```

## Dice Selection

You can enable hover and click detection on dice by setting `enableDiceSelection: true` in the config. This will:

- Emit events when hovering over and clicking dice
- Allow you to implement your own hover effects and click behaviors

### Using Callbacks

```
const Box = new DiceBox("#scene-container", {
  enableDiceSelection: true,
  onDiceHover: (diceInfo) => {
    console.log('Hovering over dice:', diceInfo);
  },
  onDiceClick: (diceInfo) => {
    console.log('Clicked dice:', diceInfo);
  }
});
```

### Using Events

```
document.addEventListener("diceHover", (e => {
  console.log('Hovering over dice:', e.detail);
}));

document.addEventListener("diceClick", (e => {
  console.log('Clicked dice:', e.detail);
}));
```

### Implementing Custom Hover Effects

You can implement your own hover effects in several ways:

1. Using HTML overlays:

```css
/*Add this CSS to your stylesheet*/
.dice-hover-overlay {
    position: absolute;
    pointer-events: none;
    transform: translate(-50%, -50%); /* Center the overlay on the dice */
    transition: all 0.2s ease;
    border: 2px solid yellow;
    border-radius: 50%;
}

/*Add this to your container element*/
#scene-container {
    position: relative; /* Required for absolute positioning of overlay */
    overflow: hidden;
}
```

```js
// JavaScript for handling hover events
document.addEventListener("diceHover", (e => {
    const diceInfo = e.detail;
    if (diceInfo) {
        // Create or update an HTML overlay for the hovered die
        let overlay = document.querySelector('.dice-hover-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'dice-hover-overlay';
            document.querySelector('#scene-container').appendChild(overlay);
        }

        // Position the overlay using the screen coordinates
        overlay.style.left = `${diceInfo.screenPosition.x}px`;
        overlay.style.top = `${diceInfo.screenPosition.y}px`;

        // Scale the overlay based on the dice size
        const size = diceInfo.scale * 100; // Adjust multiplier as needed
        overlay.style.width = `${size}px`;
        overlay.style.height = `${size}px`;
    } else {
        // Remove hover effect when not hovering
        const overlay = document.querySelector('.dice-hover-overlay');
        if (overlay) overlay.remove();
    }
}));
```

2. Using Three.js effects:

```javascript
document.addEventListener("diceHover", (e) => {
    const diceInfo = e.detail;
    if (diceInfo) {
        // Apply Three.js effects using the 3D position
        // Example: Create a ring around the dice
        const ringGeometry = new THREE.RingGeometry(diceInfo.scale, diceInfo.scale * 1.2, 32);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0xffff00,
            transparent: true,
            opacity: 0.5,
            side: THREE.DoubleSide
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.position.set(diceInfo.position.x, diceInfo.position.y, diceInfo.position.z);
        scene.add(ring);

        // Store reference to remove later
        ring.userData.isHoverRing = true;
    } else {
        // Remove effects
        scene.children.forEach((child) => {
            if (child.userData.isHoverRing) {
                scene.remove(child);
            }
        });
    }
});
```

The dice info object contains:

- `type`: The type of die (e.g., "d6")
- `sides`: Number of sides
- `id`: Index of the die in the current roll
- `value`: Current value showing
- `reason`: How the value was determined ("rolled", "forced", "reroll", "remove")
- `position`: 3D position of the die in world space {x, y, z}
- `screenPosition`: 2D position of the die projected onto the screen {x, y} (relative to container)
- `scale`: Scale of the die (useful for sizing indicators)

Note: When using HTML overlays, make sure your container element has `position: relative` set, and the overlay uses `transform: translate(-50%, -50%)` to center it on the dice. The `screenPosition` coordinates are relative to the container element.

## Predetermined Outcomes

As mentioned previously, this project was forked for it's predeterministic rolling capability. The notation to roll your predetermined outcomes looks like this:

```
Box.roll("6d6@4,4,4,4,4,4") // rolls six dice that will land on 4's
```

## Notes

In order to use textures or sounds, you will need to manually copy the assets out of the `./public` folder and into your static assets folder where you're building your app.

### Development

#### Publish

1. Update the version in `package.json`
3. Run `npm publish` to publish the package to npm

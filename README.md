# Elite Dangerous RPG for Foundry VTT

This is an **unofficial** implementation of the Elite Dangerous Role-Playing Game (E.D.R.P.G.).

---

## Prerequisites
- **Node.js:** 16.16 or newer
- **Ruby Sass:** 3.7.4 (or any compatible SCSS compiler)
- **Foundry VTT:** v10 or v11

---

## Getting Started — Development

1. Run `npm install`.
2. Create a `foundryconfig.json` file in the project root and copy the contents of `foundryconfig-example.json` into it.
3. Edit the `path` in `foundryconfig.json` so it points to your Foundry VTT **data** folder.
4. Start the development server with `npm start`.  
   Build a production release with `npm run build`.

---

## Getting Started — Foundry

### 1. E.D.R.P.G. Evolution Settings
I’d like to thank the **EDRPG Discord community**, who-entirely on their own-contributed many refinements to the game’s mechanics. I’m integrating these updates into the system, but if you prefer the original rules you can disable them in **Settings → Evolution**.  
That said, I encourage you to try them—**Evolution** is a fantastic community add-on!

### 2. Required Items and How to Add Them
All **skills** are already in the compendium, but only one **enhancement** (*Tough*), one **background** (*Pilot Training*), and one **Karma Capability** (*Escape Death*).  
Add the rest yourself, in this order:

1. **Karma / Enhancements**
2. **Backgrounds**

If these items are missing, players won’t be able to create characters correctly.

### 3. Adding backgrounds
You probably noted that adding backgrounds is sort of complicated. Let me show you how to manage it by example on ARMY TRAINED background.
1. Add a new item, and select a `Backgrounds` type
2. Nest, you can add a description (and GM only description if you want)
3. Click on the `Details` card
4. You can write some description in the `Effects Description` field - it will be displayed in infobox for the background description![img.png](img.png)
5. Now you have to select the background effects on the character. For `ARMY TRAINED` background you'll need to add the skills benefits: Dodge (+10), Energy Weapon (+20)... etc. (all these skills has to be added earlier!). You can add more effects by clicking on "+" just after the `Effects` label.

### 4. Spaceships - tbd.

### 5. Conflicts - tbd.


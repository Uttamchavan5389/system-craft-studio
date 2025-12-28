# ReactBits Usage Guide for system-craft-studio

## ✅ Installation Status

All ReactBits packages are installed and ready to use:

- ✅ `@appletosolutions/reactbits` (v1.0.3)
- ✅ `framer-motion` (v11.18.2) - Already installed
- ✅ `three` (v0.182.0) - Already installed
- ✅ `@react-three/fiber` (v9.4.2) - Already installed
- ✅ `@react-three/drei` (v10.7.7) - Already installed

## 📦 Available Components

ReactBits provides 80+ animation components. Here are the main categories:

### 🎨 Text Animations
- `ShinyText` - Shiny animated text effect
- `BlurText` - Blurred text animation
- `GlitchText` - Glitch effect text
- `ScrambleText` - Scrambling text animation
- `GradientText` - Gradient text animation
- `FallingText` - Falling letters effect
- `CircularText` - Circular text layout
- `SplitText` - Split text animation
- `TextPressure` - Pressure-sensitive text
- `FuzzyText` - Fuzzy text effect
- `DecryptedText` - Decryption animation
- `AsciiText` - ASCII art text

### ✨ Interactive Effects
- `ClickSpark` - Spark effects on click
- `StarBorder` - Animated star border
- `Magnet` - Magnetic hover effect
- `GlareHover` - Glare hover effect
- `MagnetLines` - Magnetic lines effect
- `PixelTrail` - Pixel trail effect
- `ImageTrail` - Image trail on cursor
- `SplashCursor` - Splash cursor effect
- `BlobCursor` - Blob cursor effect
- `Crosshair` - Custom crosshair cursor

### 🎭 Background Effects
- `Aurora` - Aurora background effect
- `Particles` - Particle system background
- `Beams` - Beam light effects
- `Lightning` - Lightning effects
- `MetaBalls` - Metaball effects
- `Noise` - Noise texture
- `Dither` - Dithering effect
- `Balatro` - Card game style effect
- `ShapeBlur` - Shape blur effect
- `DotGrid` - Dot grid background
- `Threads` - Thread-like effects
- `Hyperspeed` - Hyperspeed effect
- `Iridescence` - Iridescent effect
- `GridDistortion` - Grid distortion
- `Ballpit` - Ball pit effect
- `Orb` - Orb effect
- `GridMotion` - Grid motion effect
- `LiquidChrome` - Liquid chrome effect
- `Squares` - Animated squares
- `Waves` - Wave effects

### 🎬 Transitions & Animations
- `AnimatedContent` - Animated content wrapper
- `FadeContent` - Fade in/out content
- `PixelTransition` - Pixel transition effect
- `ScrollReveal` - Scroll reveal animation
- `ScrollFloat` - Floating scroll effect
- `ScrollVelocity` - Velocity-based scroll
- `Bounce` - Bounce animation
- `AnimatedList` - Animated list items

### 🎯 UI Components
- `SpotlightCard` - Spotlight card effect
- `TiltedCard` - 3D tilted card
- `PixelCard` - Pixelated card
- `DecayCard` - Decay card effect
- `Stack` - Stacked cards
- `Folder` - Folder component
- `ProfileCard` - Profile card
- `Dock` - macOS-style dock
- `GooeyNav` - Gooey navigation
- `Carousel` - Carousel component
- `CircularGallery` - Circular gallery
- `FlyingPosters` - Flying posters effect
- `CardSwap` - Card swap animation
- `InfiniteScroll` - Infinite scroll
- `GlassIcons` - Glass morphism icons
- `FlowingMenu` - Flowing menu
- `ElasticSlider` - Elastic slider
- `InfiniteMenu` - Infinite menu
- `RollingGallery` - Rolling gallery
- `Stepper` - Step indicator
- `Counter` - Animated counter
- `CountUp` - Count up animation

### 🌐 3D Components
- `ModelViewer` - 3D model viewer
- `ChromeGrid` - Chrome grid effect
- `Silk` - Silk material effect
- `Ribbons` - 3D ribbons

### 🎪 Special Effects
- `VariableProximity` - Variable proximity effect
- `TrueFocus` - True focus effect
- `TextCursor` - Custom text cursor
- `MetallicPaint` - Metallic paint effect
- `LetterGlitch` - Letter glitch effect

## 💻 Usage Examples

### Basic Import

```typescript
import { ShinyText, ClickSpark, StarBorder, Magnet, Aurora } from "@appletosolutions/reactbits";
```

### Text Animations

```tsx
// Shiny Text
<ShinyText text="Welcome to ReactBits" className="text-4xl font-bold" />

// Glitch Text
<GlitchText text="Error 404" className="text-3xl" />

// Gradient Text
<GradientText text="Beautiful Gradient" className="text-2xl" />
```

### Interactive Effects

```tsx
// Click Spark Button
<ClickSpark sparkColor="#ffd700" sparkCount={15} sparkRadius={30}>
  <button className="px-6 py-3 bg-blue-500 text-white rounded-lg">
    Click me! 🎆
  </button>
</ClickSpark>

// Star Border
<StarBorder color="#ffd700" speed="2s">
  <div className="p-6 bg-slate-800 rounded-lg">
    Premium Feature ⭐
  </div>
</StarBorder>

// Magnetic Hover
<Magnet magnetStrength={0.3}>
  <div className="p-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl cursor-pointer">
    Hover me! 🧲
  </div>
</Magnet>
```

### Background Effects

```tsx
// Aurora Background
<div className="relative h-screen">
  <Aurora
    colorStops={["#ff6b6b", "#4ecdc4", "#45b7d1"]}
    amplitude={1.2}
    speed={0.8}
  />
  <div className="absolute inset-0 flex items-center justify-center">
    <h1 className="text-white text-4xl">Content Over Aurora</h1>
  </div>
</div>

// Particles Background
<div className="relative h-screen">
  <Particles
    particleCount={150}
    particleColors={["#ff6b6b", "#4ecdc4"]}
    moveParticlesOnHover={true}
  />
</div>
```

### Scroll Animations

```tsx
// Scroll Reveal
<ScrollReveal>
  <div className="p-8">
    This content reveals on scroll
  </div>
</ScrollReveal>

// Animated Content
<AnimatedContent direction="vertical" delay={200}>
  <h2>Animated Heading</h2>
  <p>Animated paragraph</p>
</AnimatedContent>
```

### UI Components

```tsx
// Spotlight Card
<SpotlightCard>
  <div className="p-6">
    <h3>Card Title</h3>
    <p>Card content with spotlight effect</p>
  </div>
</SpotlightCard>

// Animated List
<AnimatedList>
  {items.map((item, index) => (
    <div key={index}>{item}</div>
  ))}
</AnimatedList>
```

### 3D Components

```tsx
// Model Viewer
<ModelViewer
  url="/models/product.glb"
  width={600}
  height={400}
  autoRotate={true}
  enableMouseParallax={true}
/>
```

## 🎨 Styling

ReactBits components are **unstyled by default**, giving you complete design freedom:

```tsx
// Use with Tailwind CSS
<ShinyText 
  text="Styled Text" 
  className="text-4xl font-bold text-blue-500" 
/>

// Use with custom CSS
<ClickSpark className="my-custom-button">
  <button className="btn btn-primary">Click Me</button>
</ClickSpark>
```

## 🔗 Resources

- **Website**: https://reactbits.dev/
- **GitHub**: https://github.com/appletosolutions/reactbits
- **Documentation**: Check the website for detailed component props and examples

## 🚀 Quick Start

1. Import the components you need:
```typescript
import { ShinyText, ClickSpark, Aurora } from "@appletosolutions/reactbits";
```

2. Use them in your components:
```tsx
export default function MyComponent() {
  return (
    <div>
      <ShinyText text="Hello ReactBits!" />
      <ClickSpark>
        <button>Click Me</button>
      </ClickSpark>
    </div>
  );
}
```

3. Customize with your own styling and props!

---

**All packages are installed and ready to use!** 🎉


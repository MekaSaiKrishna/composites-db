# Adding Images to Material Pages

## Quick Guide

To add an image to a material's detail page, follow these steps:

### 1. Prepare Your Image

**Recommended specifications:**
- Format: JPG, PNG, or WebP
- Size: 300x300 pixels (square) or 400x300 pixels (landscape)
- File size: Keep under 500KB for fast loading
- Name: Use the material ID (e.g., `carbon-fiber-t300.jpg`)

### 2. Add Image to Repository

Place your image in the `images/materials/` folder:

```
composite-materials-db/
├── images/
│   └── materials/
│       ├── carbon-fiber-t300.jpg
│       ├── carbon-fiber-t700.jpg
│       ├── epoxy-resin-8552.jpg
│       └── ...
```

### 3. Update Material JSON File

Add an `"image"` field to your material's JSON file:

```json
{
  "id": "carbon-fiber-t300",
  "name": "Carbon Fiber T300",
  "type": "Fiber",
  "manufacturer": "Toray",
  "image": "images/materials/carbon-fiber-t300.jpg",
  "description": "...",
  ...
}
```

**Important:** The path is relative to the root of your repository.

### 4. Image Will Automatically Display

The material detail page will automatically:
- Display the image in the header section
- Show it alongside the material name and description
- Scale it responsively on mobile devices
- Add a subtle zoom effect on hover

## Example Material JSON with Image

```json
{
  "id": "carbon-fiber-t300",
  "name": "Carbon Fiber T300",
  "type": "Fiber",
  "manufacturer": "Toray",
  "image": "images/materials/carbon-fiber-t300.jpg",
  "description": "High-strength carbon fiber widely used in aerospace applications.",
  "detailed_description": "...",
  "mechanical": {
    ...
  }
}
```

## Image Guidelines

### What Makes a Good Material Image?

✅ **Good Examples:**
- Close-up of carbon fiber weave pattern
- SEM microscopy of fiber cross-section
- Epoxy resin sample showing transparency
- PEEK pellets or molded part
- Material sample with clear texture

❌ **Avoid:**
- Logos or marketing materials
- Text-heavy images
- Low resolution or blurry images
- Copyrighted images without permission

### Image Sources

**Free Stock Photos:**
- Unsplash (unsplash.com)
- Pexels (pexels.com)
- Pixabay (pixabay.com)

**Scientific Sources:**
- Manufacturer websites (check usage rights)
- Open-access research papers
- Creative Commons databases

**Create Your Own:**
- Photograph material samples in your lab
- Take microscopy images
- Render 3D models

### Optimizing Images

To optimize images for web:

**Using ImageMagick (Command Line):**
```bash
convert input.jpg -resize 300x300^ -gravity center -extent 300x300 -quality 85 output.jpg
```

**Using Online Tools:**
- TinyPNG (tinypng.com) - Compress without quality loss
- Squoosh (squoosh.app) - Google's image optimizer
- Photopea (photopea.com) - Free online Photoshop alternative

## What If I Don't Have an Image?

No problem! Images are completely optional. If you don't add an `"image"` field to the JSON, the material page will simply display without an image. The layout automatically adjusts.

## Advanced: Multiple Images

Want to show multiple images? You can extend the JSON structure:

```json
{
  "id": "carbon-fiber-t300",
  "name": "Carbon Fiber T300",
  "image": "images/materials/carbon-fiber-t300.jpg",
  "images": {
    "main": "images/materials/carbon-fiber-t300-main.jpg",
    "microscopy": "images/materials/carbon-fiber-t300-sem.jpg",
    "application": "images/materials/carbon-fiber-t300-application.jpg"
  }
}
```

Then update `material-detail.js` to create an image gallery. This requires custom coding but the structure is ready for it!

## Troubleshooting

**Image not showing?**
1. Check the file path in the JSON matches the actual file location
2. Make sure the image is in `images/materials/` folder
3. Check the file name matches exactly (case-sensitive)
4. Verify the image file isn't corrupted
5. Check browser console for 404 errors

**Image looks stretched or weird?**
1. Use square (300x300) or landscape (400x300) images
2. The CSS uses `object-fit: cover` which crops to fill the space
3. Center important details in your image

**Image file too large?**
1. Compress using tools mentioned above
2. Aim for under 500KB per image
3. Use JPG for photographs, PNG for graphics with text

## Summary

1. ✅ Create/obtain a material image (300x300px recommended)
2. ✅ Place in `images/materials/` folder
3. ✅ Add `"image": "images/materials/filename.jpg"` to JSON
4. ✅ Image automatically appears on detail page!

That's it! Your material now has a professional-looking image display.

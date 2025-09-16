# Images Directory

This directory contains all images used in the portfolio website.

## Structure

```
assets/images/
├── favicon-16x16.png          # 16x16 favicon
├── favicon-32x32.png          # 32x32 favicon
├── favicon-192x192.png        # 192x192 PWA icon
├── favicon-512x512.png        # 512x512 PWA icon
├── apple-touch-icon.png       # 180x180 Apple touch icon
├── og-image.jpg              # Open Graph image (1200x630)
├── hero-avatar.jpg           # Hero section avatar (300x300)
├── hero-avatar.webp          # WebP version of hero avatar
├── hero-avatar.avif          # AVIF version of hero avatar
├── projects/                 # Project screenshots
│   ├── ecommerce.jpg
│   ├── ecommerce.webp
│   ├── ecommerce.avif
│   ├── taskapp.jpg
│   ├── taskapp.webp
│   ├── taskapp.avif
│   ├── portfolio.jpg
│   ├── portfolio.webp
│   ├── portfolio.avif
│   └── ...
└── testimonials/            # Testimonial avatars
    ├── testimonial-1.jpg
    ├── testimonial-1.webp
    ├── testimonial-1.avif
    └── ...
```

## Image Guidelines

### Format Priority
1. **AVIF** - Best compression and quality (modern browsers)
2. **WebP** - Good compression and wide support
3. **JPEG/PNG** - Fallback for older browsers

### Sizes and Optimization
- **Favicons**: 16x16, 32x32, 192x192, 512x512 (PNG)
- **Apple Touch Icon**: 180x180 (PNG)
- **Open Graph**: 1200x630 (JPEG, optimized for social sharing)
- **Hero Avatar**: 300x300 (multiple formats)
- **Project Images**: 400x250 aspect ratio (multiple formats)
- **Testimonial Avatars**: 60x60 (multiple formats)

### Optimization Tips
- Use appropriate compression levels
- Include `width` and `height` attributes in HTML
- Use `loading="lazy"` for images below the fold
- Provide multiple formats using `<picture>` element

## Adding New Images

When adding new images:

1. **Optimize the source image** using tools like:
   - [TinyPNG](https://tinypng.com/) for PNG/JPEG
   - [Squoosh](https://squoosh.app/) for WebP/AVIF conversion

2. **Create multiple formats**:
   ```bash
   # Example with ImageMagick
   magick input.jpg -quality 80 output.jpg
   magick input.jpg -quality 80 output.webp
   magick input.jpg -quality 80 output.avif
   ```

3. **Update HTML to use picture element**:
   ```html
   <picture>
     <source srcset="image.avif" type="image/avif">
     <source srcset="image.webp" type="image/webp">
     <img src="image.jpg" alt="Description" loading="lazy">
   </picture>
   ```

## Placeholder Images

For development, you can use placeholder services:
- https://picsum.photos/400/250 (Lorem Picsum)
- https://via.placeholder.com/400x250 (Placeholder.com)

Replace these with actual images before production deployment.
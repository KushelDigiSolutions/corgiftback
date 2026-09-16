import mongoose from 'mongoose';

const heroSlideSchema = new mongoose.Schema({
  image: { type: String, required: true },
  tag: { type: String, default: '' },
  subtitle: { type: String, default: '' }, // alias / fallback for tag
  headline: { type: String, default: '' },
  headlineHighlight: { type: String, default: '' },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  primaryButtonText: { type: String, default: 'Shop All Gifts' },
  primaryButtonLink: { type: String, default: '/products' },
  secondaryButtonText: { type: String, default: '' },
  secondaryButtonLink: { type: String, default: '' },
  ctaText: { type: String, default: 'Shop Now' }, // legacy fallback
  ctaLink: { type: String, default: '/shop' }, // legacy fallback
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const HeroSlide = mongoose.model('HeroSlide', heroSlideSchema);
export default HeroSlide;

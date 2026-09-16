import HeroSlide from '../models/HeroSlide.js';

// Get hero slides (Public gets active only; Admin gets all with ?all=true)
export const getHeroSlides = async (req, res, next) => {
  try {
    const query = {};
    // If admin requests all slides (for management)
    if (req.query.all === 'true') {
      // no filter, return all
    } else {
      query.isActive = true;
    }
    
    const slides = await HeroSlide.find(query).sort({ order: 1 });
    res.status(200).json({ success: true, data: slides });
  } catch (error) {
    next(error);
  }
};

// Create a new hero slide (Admin Only)
export const createHeroSlide = async (req, res, next) => {
  try {
    const {
      image,
      imageUrl,
      tag,
      subtitle,
      headline,
      headlineHighlight,
      title,
      description,
      primaryButtonText,
      primaryButtonLink,
      secondaryButtonText,
      secondaryButtonLink,
      ctaText,
      ctaLink,
      order,
      isActive
    } = req.body;

    const img = image || imageUrl;
    if (!img) {
      return res.status(400).json({ success: false, message: 'Hero slide image is required' });
    }

    const slideTag = tag !== undefined ? tag : (subtitle || '');
    const slideHeadline = headline !== undefined ? headline : (title || '');
    const slideHighlight = headlineHighlight || '';
    const slideTitle = title || (slideHighlight ? `${slideHeadline} ${slideHighlight}` : slideHeadline);
    const pText = primaryButtonText || ctaText || 'Shop All Gifts';
    const pLink = primaryButtonLink || ctaLink || '/products';
    const sText = secondaryButtonText || '';
    const sLink = secondaryButtonLink || '';

    const slide = await HeroSlide.create({
      image: img,
      tag: slideTag,
      subtitle: slideTag,
      headline: slideHeadline,
      headlineHighlight: slideHighlight,
      title: slideTitle,
      description: description || '',
      primaryButtonText: pText,
      primaryButtonLink: pLink,
      secondaryButtonText: sText,
      secondaryButtonLink: sLink,
      ctaText: pText,
      ctaLink: pLink,
      order: order !== undefined ? Number(order) : 0,
      isActive: isActive !== undefined ? isActive : true
    });

    res.status(201).json({ success: true, data: slide });
  } catch (error) {
    next(error);
  }
};

// Update an existing hero slide (Admin Only)
export const updateHeroSlide = async (req, res, next) => {
  try {
    const { id } = req.params;
    const slide = await HeroSlide.findById(id);
    if (!slide) {
      return res.status(404).json({ success: false, message: 'Hero slide not found' });
    }

    const {
      image,
      imageUrl,
      tag,
      subtitle,
      headline,
      headlineHighlight,
      title,
      description,
      primaryButtonText,
      primaryButtonLink,
      secondaryButtonText,
      secondaryButtonLink,
      ctaText,
      ctaLink,
      order,
      isActive
    } = req.body;

    if (image !== undefined || imageUrl !== undefined) {
      slide.image = image || imageUrl;
    }
    if (tag !== undefined || subtitle !== undefined) {
      slide.tag = tag !== undefined ? tag : subtitle;
      slide.subtitle = slide.tag;
    }
    if (headline !== undefined) slide.headline = headline;
    if (headlineHighlight !== undefined) slide.headlineHighlight = headlineHighlight;
    if (title !== undefined) {
      slide.title = title;
    } else if (headline !== undefined || headlineHighlight !== undefined) {
      slide.title = `${slide.headline || ''} ${slide.headlineHighlight || ''}`.trim();
    }
    if (description !== undefined) slide.description = description;

    if (primaryButtonText !== undefined || ctaText !== undefined) {
      slide.primaryButtonText = primaryButtonText !== undefined ? primaryButtonText : ctaText;
      slide.ctaText = slide.primaryButtonText;
    }
    if (primaryButtonLink !== undefined || ctaLink !== undefined) {
      slide.primaryButtonLink = primaryButtonLink !== undefined ? primaryButtonLink : ctaLink;
      slide.ctaLink = slide.primaryButtonLink;
    }
    if (secondaryButtonText !== undefined) slide.secondaryButtonText = secondaryButtonText;
    if (secondaryButtonLink !== undefined) slide.secondaryButtonLink = secondaryButtonLink;
    if (order !== undefined) slide.order = Number(order);
    if (isActive !== undefined) slide.isActive = isActive;

    await slide.save();
    res.status(200).json({ success: true, data: slide });
  } catch (error) {
    next(error);
  }
};

// Delete a hero slide (Admin Only)
export const deleteHeroSlide = async (req, res, next) => {
  try {
    const { id } = req.params;
    const slide = await HeroSlide.findById(id);
    if (!slide) {
      return res.status(404).json({ success: false, message: 'Hero slide not found' });
    }

    await HeroSlide.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Hero slide deleted successfully' });
  } catch (error) {
    next(error);
  }
};

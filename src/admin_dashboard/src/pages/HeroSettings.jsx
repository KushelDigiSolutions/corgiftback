import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, ShieldCheck, Image as ImageIcon, RefreshCw, Sparkles, ExternalLink, ArrowRight, Gift, Check, Eye } from 'lucide-react';
import { useToast } from '../context/ToastContext.jsx';
import { useLoader } from '../context/LoaderContext.jsx';

const HeroSettings = ({ token }) => {
  const toast = useToast();
  const { showLoader, hideLoader } = useLoader();
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form handling (Dual-mode: Create / Edit)
  const [editingSlide, setEditingSlide] = useState(null);
  const [image, setImage] = useState('');
  const [tag, setTag] = useState('');
  const [headline, setHeadline] = useState('');
  const [headlineHighlight, setHeadlineHighlight] = useState('');
  const [description, setDescription] = useState('');
  const [primaryButtonText, setPrimaryButtonText] = useState('Shop All Gifts');
  const [primaryButtonLink, setPrimaryButtonLink] = useState('/products');
  const [secondaryButtonText, setSecondaryButtonText] = useState('');
  const [secondaryButtonLink, setSecondaryButtonLink] = useState('');
  const [order, setOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [imageUploading, setImageUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Safe image helper
  const formatImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
      return url;
    }
    return url.startsWith('/') ? url : `/${url}`;
  };

  const fetchSlides = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/hero-slides?all=true');
      const data = await res.json();
      if (data.success) {
        setSlides(data.data);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load slides');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleEditClick = (slide) => {
    setEditingSlide(slide);
    setImage(slide.image || '');
    setTag(slide.tag || slide.subtitle || '');
    setHeadline(slide.headline || slide.title || '');
    setHeadlineHighlight(slide.headlineHighlight || '');
    setDescription(slide.description || '');
    setPrimaryButtonText(slide.primaryButtonText || slide.ctaText || 'Shop All Gifts');
    setPrimaryButtonLink(slide.primaryButtonLink || slide.ctaLink || '/products');
    setSecondaryButtonText(slide.secondaryButtonText || '');
    setSecondaryButtonLink(slide.secondaryButtonLink || '');
    setOrder(slide.order !== undefined ? slide.order : 0);
    setIsActive(slide.isActive !== undefined ? slide.isActive : true);

    // Scroll form into view smoothly on mobile/narrow screens
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetForm = () => {
    setEditingSlide(null);
    setImage('');
    setTag('');
    setHeadline('');
    setHeadlineHighlight('');
    setDescription('');
    setPrimaryButtonText('Shop All Gifts');
    setPrimaryButtonLink('/products');
    setSecondaryButtonText('');
    setSecondaryButtonLink('');
    setOrder(slides.length ? slides.length + 1 : 1);
    setIsActive(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageUploading(true);
    showLoader('Uploading banner image...');
    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const res = await fetch('/api/products/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: uploadData
      });
      const data = await res.json();
      if (data.success && data.files && data.files.length > 0) {
        setImage(data.files[0].url);
        toast.success('Banner image uploaded successfully!');
      } else {
        toast.error(data.message || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error uploading banner file');
    } finally {
      setImageUploading(false);
      hideLoader();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.warning('Please upload or enter an image URL for the banner');
      return;
    }

    setSubmitting(true);
    showLoader(editingSlide ? 'Saving changes...' : 'Creating slide...');
    try {
      const url = editingSlide ? `/api/hero-slides/${editingSlide._id}` : '/api/hero-slides';
      const method = editingSlide ? 'PUT' : 'POST';

      const payload = {
        image,
        tag,
        subtitle: tag,
        headline,
        headlineHighlight,
        title: headlineHighlight ? `${headline} ${headlineHighlight}` : headline,
        description,
        primaryButtonText,
        primaryButtonLink,
        secondaryButtonText,
        secondaryButtonLink,
        ctaText: primaryButtonText,
        ctaLink: primaryButtonLink,
        order: Number(order),
        isActive
      };

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        toast.success(editingSlide ? 'Hero slide updated successfully!' : 'Hero slide created successfully!');
        handleResetForm();
        fetchSlides();
      } else {
        toast.error(data.message || 'Operation failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error saving hero slide');
    } finally {
      setSubmitting(false);
      hideLoader();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this hero slide?')) return;
    showLoader('Removing hero slide...');
    try {
      const res = await fetch(`/api/hero-slides/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();

      if (data.success) {
        toast.success(data.message || 'Hero slide deleted successfully!');
        fetchSlides();
      } else {
        toast.error(data.message || 'Failed to remove hero slide');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error removing hero slide');
    } finally {
      hideLoader();
    }
  };

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-color, #2D251E)', fontFamily: 'serif', margin: 0 }}>
            Hero Banner Management
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted, #7A6E65)', marginTop: '4px', margin: 0 }}>
            Customize dynamic home slider banners, titles, descriptions, and action buttons.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={fetchSlides}
            title="Refresh Slides"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px' }}
          >
            <RefreshCw size={14} className={loading ? 'spin' : ''} />
            <span>Refresh</span>
          </button>
          {!editingSlide && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                handleResetForm();
                document.getElementById('hero-tag-input')?.focus();
              }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px' }}
            >
              <Plus size={16} />
              <span>Add New Slide</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Table Left, Form Right */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 1fr)', gap: '24px', alignItems: 'start' }}>
        
        {/* Left Column: Slides Table */}
        <div className="card" style={{ padding: '20px', borderRadius: '16px', border: '1px solid var(--border-color, #E8DEC8)', backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #FAF6F0', paddingBottom: '12px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', margin: 0, color: '#2D251E' }}>
                Active Hero Slides ({slides.length})
              </h3>
              <p style={{ fontSize: '12px', color: '#7A6E65', margin: '2px 0 0 0' }}>
                Reorder or modify the slides shown in the homepage hero section.
              </p>
            </div>
          </div>

          <div className="table-responsive" style={{ overflowX: 'auto' }}>
            <table className="data-table" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
              <thead>
                <tr style={{ background: '#FAF6F0', color: '#7A6E65', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '10px 12px', borderRadius: '8px 0 0 8px', width: '110px' }}>Banner</th>
                  <th style={{ padding: '10px 12px' }}>Slide Content</th>
                  <th style={{ padding: '10px 12px', width: '160px' }}>Action Buttons</th>
                  <th style={{ padding: '10px 8px', textAlign: 'center', width: '50px' }}>Order</th>
                  <th style={{ padding: '10px 8px', textAlign: 'center', width: '70px' }}>Status</th>
                  <th style={{ padding: '10px 12px', textAlign: 'right', borderRadius: '0 8px 8px 0', width: '80px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {slides.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '40px 20px', color: '#7A6E65', background: '#FFFBF5', borderRadius: '8px' }}>
                      <ImageIcon size={32} style={{ margin: '0 auto 8px', color: '#B89B72', opacity: 0.6 }} />
                      <p style={{ margin: 0, fontWeight: '600', fontSize: '13px' }}>No hero slides found</p>
                      <p style={{ margin: '4px 0 0', fontSize: '11px' }}>Use the form on the right to create your first slide.</p>
                    </td>
                  </tr>
                ) : (
                  slides.map((slide, idx) => {
                    const isSelected = editingSlide && editingSlide._id === slide._id;
                    return (
                      <tr
                        key={slide._id || idx}
                        style={{
                          backgroundColor: isSelected ? '#FFF9F0' : '#FFFBF5',
                          border: isSelected ? '1px solid #B89B72' : '1px solid #E8DEC8',
                          transition: 'all 0.15s ease',
                          boxShadow: isSelected ? '0 0 0 2px rgba(184, 155, 114, 0.2)' : 'none'
                        }}
                      >
                        {/* Banner Image */}
                        <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
                          <div style={{ position: 'relative', width: '96px', height: '54px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #E8DEC8', backgroundColor: '#1A1410' }}>
                            <img
                              src={formatImageUrl(slide.image)}
                              alt="Slide Preview"
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                            <div style={{ display: 'none', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#2D251E', color: '#E8DEC8', fontSize: '10px', flexDirection: 'column', gap: '2px' }}>
                              <ImageIcon size={14} />
                              <span>Slide {slide.order || idx + 1}</span>
                            </div>
                          </div>
                        </td>

                        {/* Slide Content */}
                        <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {/* Top Tag */}
                            {(slide.tag || slide.subtitle) && (
                              <span style={{ fontSize: '10px', fontWeight: '800', color: '#B89B72', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                                <Sparkles size={10} />
                                {slide.tag || slide.subtitle}
                              </span>
                            )}
                            
                            {/* Headline */}
                            <span style={{ fontSize: '13px', fontWeight: '800', color: '#2D251E', lineHeight: '1.25' }}>
                              {slide.headline || slide.title || 'Untitled Slide'}
                              {slide.headlineHighlight && (
                                <span style={{ color: '#E07A5F', marginLeft: '4px' }}>
                                  {slide.headlineHighlight}
                                </span>
                              )}
                            </span>

                            {/* Description */}
                            {slide.description && (
                              <p style={{ fontSize: '11px', color: '#7A6E65', margin: '2px 0 0', lineHeight: '1.3', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {slide.description}
                              </p>
                            )}
                          </div>
                        </td>

                        {/* Action Buttons */}
                        <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            {/* Button 1 */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px' }}>
                              <span style={{ background: '#E07A5F', color: '#fff', padding: '1px 6px', borderRadius: '4px', fontSize: '9px', fontWeight: 'bold' }}>
                                Btn 1
                              </span>
                              <span style={{ fontWeight: '600', color: '#2D251E', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '95px' }} title={slide.primaryButtonText || slide.ctaText}>
                                {slide.primaryButtonText || slide.ctaText || 'Shop All Gifts'}
                              </span>
                            </div>

                            {/* Button 2 */}
                            {slide.secondaryButtonText ? (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px' }}>
                                <span style={{ background: '#2D251E', color: '#F5E6CE', padding: '1px 6px', borderRadius: '4px', fontSize: '9px', fontWeight: 'bold' }}>
                                  Btn 2
                                </span>
                                <span style={{ fontWeight: '500', color: '#7A6E65', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '95px' }} title={slide.secondaryButtonText}>
                                  {slide.secondaryButtonText}
                                </span>
                              </div>
                            ) : (
                              <span style={{ fontSize: '10px', color: '#B0A79E', fontStyle: 'italic' }}>No 2nd button</span>
                            )}
                          </div>
                        </td>

                        {/* Order */}
                        <td style={{ padding: '10px 8px', textAlign: 'center', verticalAlign: 'middle' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', background: '#FAF6F0', border: '1px solid #E8DEC8', fontWeight: '800', fontSize: '11px', color: '#2D251E' }}>
                            {slide.order !== undefined ? slide.order : idx + 1}
                          </span>
                        </td>

                        {/* Status */}
                        <td style={{ padding: '10px 8px', textAlign: 'center', verticalAlign: 'middle' }}>
                          <span
                            style={{
                              display: 'inline-block',
                              padding: '2px 8px',
                              borderRadius: '12px',
                              fontSize: '10px',
                              fontWeight: '700',
                              background: slide.isActive ? '#EBFBEE' : '#FEE2E2',
                              color: slide.isActive ? '#2B8A3E' : '#C92A2A',
                              border: slide.isActive ? '1px solid #D3F9D8' : '1px solid #FFC9C9'
                            }}
                          >
                            {slide.isActive ? 'Active' : 'Hidden'}
                          </span>
                        </td>

                        {/* Actions */}
                        <td style={{ padding: '10px 12px', textAlign: 'right', verticalAlign: 'middle' }}>
                          <div style={{ display: 'inline-flex', gap: '6px' }}>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() => handleEditClick(slide)}
                              style={{ padding: '6px', borderRadius: '6px', background: isSelected ? '#B89B72' : '#fff', color: isSelected ? '#fff' : '#2D251E', border: '1px solid #E8DEC8' }}
                              title="Edit Slide"
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary btn-danger"
                              onClick={() => handleDelete(slide._id)}
                              style={{ padding: '6px', borderRadius: '6px', background: '#FFF5F5', color: '#E03131', border: '1px solid #FFC9C9' }}
                              title="Delete Slide"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Create / Update Form */}
        <div className="card" style={{ padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color, #E8DEC8)', backgroundColor: '#FFFBF5', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', position: 'sticky', top: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid #E8DEC8', paddingBottom: '12px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#2D251E', margin: 0 }}>
                {editingSlide ? 'Update Hero Slide' : 'Create New Hero Slide'}
              </h3>
              <p style={{ fontSize: '11px', color: '#7A6E65', margin: '2px 0 0' }}>
                {editingSlide ? `Editing slide #${editingSlide.order || 1}` : 'Add a new slide to the homepage carousel'}
              </p>
            </div>
            {editingSlide && (
              <span style={{ fontSize: '10px', background: '#B89B72', color: '#fff', fontWeight: 'bold', padding: '2px 8px', borderRadius: '6px' }}>
                Editing Mode
              </span>
            )}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {/* Banner Image URL & Upload */}
            <div style={{ background: '#fff', border: '1px dashed #B89B72', borderRadius: '12px', padding: '14px' }}>
              <label style={{ fontSize: '12px', fontWeight: '800', color: '#2D251E', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ImageIcon size={14} color="#B89B72" />
                Hero Banner Image (Required)
              </label>
              
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="e.g. /hero-diwali.jpg or https://..."
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  style={{ flex: 1, fontSize: '12px', padding: '8px 10px', borderRadius: '8px', border: '1px solid #E8DEC8' }}
                />
                
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                  id="hero-image-upload-input"
                />
                <label
                  htmlFor="hero-image-upload-input"
                  className="btn btn-secondary"
                  style={{ cursor: 'pointer', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', padding: '8px 12px', borderRadius: '8px', border: '1px solid #E8DEC8', background: '#FAF6F0', color: '#2D251E' }}
                >
                  <Plus size={14} />
                  {imageUploading ? 'Uploading...' : 'Upload File'}
                </label>
              </div>

              {/* Image Preview Box */}
              {image && (
                <div style={{ marginTop: '10px', position: 'relative', height: '120px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #E8DEC8', backgroundColor: '#1A1410' }}>
                  <img
                    src={formatImageUrl(image)}
                    alt="Hero Preview"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div style={{ display: 'none', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', color: '#E8DEC8', fontSize: '12px', flexDirection: 'column', gap: '4px' }}>
                    <ImageIcon size={20} />
                    <span>Preview not available (check path)</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setImage('')}
                    style={{ position: 'absolute', top: '6px', right: '6px', background: 'rgba(220, 38, 38, 0.9)', color: '#fff', border: 'none', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '12px' }}
                    title="Remove Image"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>

            {/* Top Tag / Category Badge */}
            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '800', color: '#2D251E', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Sparkles size={12} color="#B89B72" />
                Top Tag / Category Badge
              </label>
              <input
                id="hero-tag-input"
                type="text"
                className="form-control"
                placeholder="e.g. MILESTONES & APPRECIATION"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                style={{ fontSize: '12px', padding: '8px 12px', borderRadius: '8px', border: '1px solid #E8DEC8', background: '#fff' }}
              />
            </div>

            {/* Headline & Headline Highlight */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div className="form-group">
                <label style={{ fontSize: '12px', fontWeight: '800', color: '#2D251E' }}>Headline (Line 1)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Honor Growth & Loyalty with"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  style={{ fontSize: '12px', padding: '8px 10px', borderRadius: '8px', border: '1px solid #E8DEC8', background: '#fff' }}
                />
              </div>

              <div className="form-group">
                <label style={{ fontSize: '12px', fontWeight: '800', color: '#2D251E' }}>Highlight Text (Accent)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Premium Gifts"
                  value={headlineHighlight}
                  onChange={(e) => setHeadlineHighlight(e.target.value)}
                  style={{ fontSize: '12px', padding: '8px 10px', borderRadius: '8px', border: '1px solid #E8DEC8', background: '#fff' }}
                />
              </div>
            </div>

            {/* Description */}
            <div className="form-group">
              <label style={{ fontSize: '12px', fontWeight: '800', color: '#2D251E' }}>Slide Description</label>
              <textarea
                rows={3}
                className="form-control"
                placeholder="e.g. Custom engraved awards, executive desk accessories, and curated loyalty gift sets designed to celebrate milestones in style."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ fontSize: '12px', padding: '8px 12px', borderRadius: '8px', border: '1px solid #E8DEC8', background: '#fff', resize: 'vertical' }}
              />
            </div>

            {/* Button 1 (Primary) */}
            <div style={{ background: '#fff', border: '1px solid #E8DEC8', borderRadius: '10px', padding: '10px 12px' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#E07A5F', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '8px' }}>
                Primary Button (Button 1)
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Button Text (e.g. Employee Milestones)"
                  value={primaryButtonText}
                  onChange={(e) => setPrimaryButtonText(e.target.value)}
                  style={{ fontSize: '12px', padding: '6px 8px', borderRadius: '6px', border: '1px solid #E8DEC8' }}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Route Link (e.g. /corporate-gifting)"
                  value={primaryButtonLink}
                  onChange={(e) => setPrimaryButtonLink(e.target.value)}
                  style={{ fontSize: '12px', padding: '6px 8px', borderRadius: '6px', border: '1px solid #E8DEC8' }}
                />
              </div>
            </div>

            {/* Button 2 (Secondary - Optional) */}
            <div style={{ background: '#fff', border: '1px solid #E8DEC8', borderRadius: '10px', padding: '10px 12px' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#7A6E65', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '8px' }}>
                Secondary Button (Button 2 - Optional)
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Button Text (e.g. Shop Hampers)"
                  value={secondaryButtonText}
                  onChange={(e) => setSecondaryButtonText(e.target.value)}
                  style={{ fontSize: '12px', padding: '6px 8px', borderRadius: '6px', border: '1px solid #E8DEC8' }}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Route Link (e.g. /products?category=gift-hampers)"
                  value={secondaryButtonLink}
                  onChange={(e) => setSecondaryButtonLink(e.target.value)}
                  style={{ fontSize: '12px', padding: '6px 8px', borderRadius: '6px', border: '1px solid #E8DEC8' }}
                />
              </div>
            </div>

            {/* Sort Order & Status */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div className="form-group">
                <label style={{ fontSize: '12px', fontWeight: '800', color: '#2D251E' }}>Sort Order (1, 2, 3...)</label>
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  placeholder="1"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  style={{ fontSize: '12px', padding: '8px 10px', borderRadius: '8px', border: '1px solid #E8DEC8', background: '#fff' }}
                />
              </div>

              <div className="form-group">
                <label style={{ fontSize: '12px', fontWeight: '800', color: '#2D251E' }}>Display Status</label>
                <select
                  className="form-control"
                  value={isActive ? 'true' : 'false'}
                  onChange={(e) => setIsActive(e.target.value === 'true')}
                  style={{ fontSize: '12px', padding: '8px 10px', borderRadius: '8px', border: '1px solid #E8DEC8', background: '#fff' }}
                >
                  <option value="true">Active (Visible)</option>
                  <option value="false">Inactive (Hidden)</option>
                </select>
              </div>
            </div>

            {/* Submit & Cancel Buttons */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
              {editingSlide && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleResetForm}
                  style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #E8DEC8', background: '#FAF6F0', color: '#7A6E65', fontWeight: '700', fontSize: '12px' }}
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={submitting || imageUploading}
                className="btn btn-primary"
                style={{ flex: 2, padding: '10px', borderRadius: '8px', background: '#B89B72', color: '#fff', border: 'none', fontWeight: '800', fontSize: '12px', cursor: 'pointer', boxShadow: '0 2px 6px rgba(184, 155, 114, 0.3)' }}
              >
                {submitting
                  ? (editingSlide ? 'Saving Changes...' : 'Creating Slide...')
                  : (editingSlide ? 'Save Changes' : 'Create Hero Slide')}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default HeroSettings;

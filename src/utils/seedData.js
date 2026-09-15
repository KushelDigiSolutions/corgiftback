import dns from 'node:dns';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dns.setServers(['8.8.8.8', '1.1.1.1']);
import User from '../models/User.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Transaction from '../models/Transaction.js';
import InventoryLog from '../models/InventoryLog.js';
import Notification from '../models/Notification.js';
import Coupon from '../models/Coupon.js';

dotenv.config();

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecom-suite';
    console.log('Connecting to MongoDB for Corporate Gifting seeding...');
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully.');

    // Clear existing data
    await User.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await Cart.deleteMany();
    await Transaction.deleteMany();
    await InventoryLog.deleteMany();
    await Notification.deleteMany();
    await Coupon.deleteMany();

    console.log('Database cleared.');

    // 1. Create Admin & Customer Users
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@corporate.com',
      password: 'adminpassword123',
      role: 'admin',
      isActive: true,
      emailVerified: true
    });

    const customer = await User.create({
      name: 'Corporate Client',
      email: 'user@corporate.com',
      password: 'userpassword123',
      role: 'customer',
      isActive: true,
      emailVerified: true,
      addresses: [
        {
          title: 'Corporate Headquarters',
          street: 'Sector 62, Industrial Area',
          city: 'Noida',
          state: 'Uttar Pradesh',
          zipCode: '201301',
          country: 'India',
          isDefault: true
        }
      ]
    });

    console.log('Users created:');
    console.log(' - Admin Email: admin@corporate.com | Password: adminpassword123');
    console.log(' - Customer Email: user@corporate.com | Password: userpassword123');

    // 2. Create Corporate Gifting Categories
    const execDesk = await Category.create({
      name: 'Executive Desk & Office Essentials',
      slug: 'executive-desk-office',
      description: 'Luxury desk organizers, brass pens, wireless charging pads, and executive notebooks.'
    });

    const drinkware = await Category.create({
      name: 'Custom Drinkware & Thermos Flasks',
      slug: 'custom-drinkware-flasks',
      description: 'Smart LED temperature flasks, bamboo tumblers, and ceramic coffee mug sets.'
    });

    const techGifts = await Category.create({
      name: 'Premium Tech & Electronics',
      slug: 'premium-tech-electronics',
      description: 'Custom wireless power banks, ANC earbuds, magnetic desk chargers, and Bluetooth speakers.'
    });

    const comboHampers = await Category.create({
      name: 'Luxury Combo Gift Sets & Hampers',
      slug: 'luxury-combo-gift-sets',
      description: 'Exclusive 5-in-1 corporate hampers, artisanal gourmet treats, and bespoke gift boxes.'
    });

    const ecoGifts = await Category.create({
      name: 'Eco-Friendly & Bamboo Gifts',
      slug: 'eco-friendly-bamboo-gifts',
      description: 'Sustainable bamboo cutlery, plantable seed stationery, and cork organizer sets.'
    });

    const apparelGifts = await Category.create({
      name: 'Corporate Apparel & Accessories',
      slug: 'corporate-apparel-accessories',
      description: 'Custom embroidered polo t-shirts, branded hoodies, and genuine leather bags.'
    });

    console.log('Corporate Gifting Categories seeded.');

    // 3. Create Corporate Gifting Products
    const productsData = [
      {
        name: 'Executive 5-in-1 Corporate Gift Set (Black Edition)',
        description: 'A luxurious 5-in-1 executive corporate gift box containing a 500ml thermosteel flask, A5 notebook with pen loop, metallic rollerball pen, metal keychain, and RFID cardholder. Perfect for corporate onboardings and VIP client gifting.',
        price: 1999,
        salePrice: 1499,
        sku: 'CG-SET-001',
        inventory: 100,
        category: comboHampers._id,
        isFeatured: true,
        salesCount: 150,
        rating: 4.9,
        numReviews: 48,
        mainImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800',
        images: [
          'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800',
          'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=800'
        ],
        attributes: [
          { key: 'Set Contents', value: 'Flask, Notebook, Pen, Keychain, Cardholder' },
          { key: 'Personalization', value: 'Laser Engraving / Screen Printing Available' }
        ]
      },
      {
        name: 'Smart LED Temperature Display Thermos Bottle (500ml)',
        description: 'Double-wall insulated 304 stainless steel vacuum flask with touch LED temperature display lid. Keeps drinks hot for 12 hours and cold for 24 hours. Comes with custom company branding options.',
        price: 899,
        salePrice: 699,
        sku: 'CG-DRK-002',
        inventory: 200,
        category: drinkware._id,
        isFeatured: true,
        salesCount: 320,
        rating: 4.8,
        numReviews: 95,
        mainImage: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800',
        images: [
          'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800'
        ],
        attributes: [
          { key: 'Capacity', value: '500 ml' },
          { key: 'Material', value: 'Grade 304 Stainless Steel' }
        ]
      },
      {
        name: 'Leatherette Wireless Charging Desk Mat & Organizer',
        description: 'Premium PU leather desk pad featuring integrated 15W fast wireless charger, pen dock, and cable management slots. Protects desk surfaces while adding executive aesthetic.',
        price: 1799,
        salePrice: 1299,
        sku: 'CG-DSK-003',
        inventory: 80,
        category: execDesk._id,
        isFeatured: true,
        salesCount: 90,
        rating: 4.7,
        numReviews: 32,
        mainImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800',
        images: [
          'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800'
        ],
        attributes: [
          { key: 'Output Power', value: '15W Fast Wireless Charging' },
          { key: 'Material', value: 'Waterproof PU Leather' }
        ]
      },
      {
        name: '10,000mAh Magnetic Wireless Power Bank with Stand',
        description: 'MagSafe compatible 20W PD fast-charging slim power bank with built-in foldable kickstand. Ideal for customized corporate branding on glass finish front.',
        price: 2499,
        salePrice: 1899,
        sku: 'CG-TCH-004',
        inventory: 150,
        category: techGifts._id,
        isFeatured: true,
        salesCount: 210,
        rating: 4.9,
        numReviews: 64,
        mainImage: 'https://images.unsplash.com/photo-1609592424074-b5291e028b12?w=800',
        images: [
          'https://images.unsplash.com/photo-1609592424074-b5291e028b12?w=800'
        ],
        attributes: [
          { key: 'Battery Capacity', value: '10,000 mAh' },
          { key: 'Fast Charge', value: '20W Power Delivery' }
        ]
      },
      {
        name: 'Eco Bamboo Flask & Notebook Sustainability Gift Box',
        description: '100% eco-friendly gift hamper featuring a real bamboo insulated tumbler, bamboo plantable seed pen, and recycled kraft paper notebook. Promote green corporate culture.',
        price: 1299,
        salePrice: 999,
        sku: 'CG-ECO-005',
        inventory: 120,
        category: ecoGifts._id,
        isFeatured: true,
        salesCount: 180,
        rating: 4.8,
        numReviews: 40,
        mainImage: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800',
        images: [
          'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800'
        ],
        attributes: [
          { key: 'Eco Standard', value: '100% Organic & Recyclable' },
          { key: 'Personalization', value: 'Custom Bamboo Engraving' }
        ]
      },
      {
        name: 'Active Noise Cancelling Bluetooth Earbuds with Metal Case',
        description: 'TWS stereo earbuds housed in a sleek brushed aluminum charging case with 30-hour total playtime. Features custom company logo UV printing.',
        price: 3499,
        salePrice: 2799,
        sku: 'CG-TCH-006',
        inventory: 75,
        category: techGifts._id,
        isFeatured: true,
        salesCount: 140,
        rating: 4.9,
        numReviews: 52,
        mainImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
        images: [
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'
        ],
        attributes: [
          { key: 'Connectivity', value: 'Bluetooth 5.3' },
          { key: 'Noise Cancellation', value: 'ANC up to 30dB' }
        ]
      },
      {
        name: 'Custom Premium Cotton Corporate Polo T-Shirt',
        description: '220 GSM 100% combed bio-washed cotton pique polo shirt. Custom high-density logo embroidery available on chest and sleeves for team corporate wear.',
        price: 799,
        salePrice: 599,
        sku: 'CG-APP-007',
        inventory: 300,
        category: apparelGifts._id,
        isFeatured: false,
        salesCount: 450,
        rating: 4.6,
        numReviews: 110,
        mainImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800',
        images: [
          'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800'
        ],
        attributes: [
          { key: 'Fabric', value: '100% Combed Cotton Pique 220 GSM' },
          { key: 'Branding', value: 'Custom Embroidery / Screen Print' }
        ]
      },
      {
        name: 'Handcrafted Genuine Leather Business Laptop Backpack',
        description: 'Water-resistant full-grain leather laptop backpack with padded 15.6" laptop sleeve, internal power bank pocket, and ergonomic shoulder straps.',
        price: 4299,
        salePrice: 3499,
        sku: 'CG-APP-008',
        inventory: 60,
        category: apparelGifts._id,
        isFeatured: true,
        salesCount: 85,
        rating: 4.9,
        numReviews: 28,
        mainImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
        images: [
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'
        ],
        attributes: [
          { key: 'Laptop Fit', value: 'Up to 15.6 Inch' },
          { key: 'Material', value: 'Full-Grain Vegan Leather' }
        ]
      },
      {
        name: 'Gourmet Royal Celebration Dry Fruit & Chocolate Hamper',
        description: 'Handcrafted wooden keepsake chest filled with premium roasted almonds, cashews, raisins, artisanal dark chocolates, and a gold-scented candle.',
        price: 2299,
        salePrice: 1799,
        sku: 'CG-SET-009',
        inventory: 90,
        category: comboHampers._id,
        isFeatured: true,
        salesCount: 260,
        rating: 4.9,
        numReviews: 78,
        mainImage: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=800',
        images: [
          'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=800'
        ],
        attributes: [
          { key: 'Contents', value: 'Almonds, Cashews, Chocolates, Candle, Wooden Box' },
          { key: 'Shelf Life', value: '6 Months' }
        ]
      },
      {
        name: 'Solid Brass Heavyweight Rollerball Pen in Leather Case',
        description: 'Heavyweight brass body pen with German liquid ink refill, gold accents, and custom velvet leatherette sleeve. Ideal executive gift.',
        price: 499,
        salePrice: 399,
        sku: 'CG-DSK-010',
        inventory: 250,
        category: execDesk._id,
        isFeatured: false,
        salesCount: 500,
        rating: 4.7,
        numReviews: 88,
        mainImage: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800',
        images: [
          'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800'
        ],
        attributes: [
          { key: 'Pen Body', value: 'Solid Brass with Metallic Lacquer' },
          { key: 'Ink Color', value: 'Blue / Black' }
        ]
      },
      {
        name: 'Wood & Bamboo Bluetooth Desktop Speaker with Clock',
        description: 'Aesthetic natural wood Bluetooth 5.0 speaker featuring ambient LED display clock and dual alarm. Customizable wood laser engraving.',
        price: 1899,
        salePrice: 1499,
        sku: 'CG-TCH-011',
        inventory: 110,
        category: techGifts._id,
        isFeatured: false,
        salesCount: 130,
        rating: 4.8,
        numReviews: 42,
        mainImage: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800',
        images: [
          'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800'
        ],
        attributes: [
          { key: 'Speaker Output', value: '10W HD Bass' },
          { key: 'Material', value: 'Natural Walnut Wood & Bamboo' }
        ]
      },
      {
        name: 'Double Wall Ceramic Coffee Mug with Cork Base (400ml)',
        description: 'Matte ceramic mug with splash-proof sliding lid and natural heat-insulating cork bottom. Prevents table scratches and holds heat longer.',
        price: 649,
        salePrice: 499,
        sku: 'CG-DRK-012',
        inventory: 180,
        category: drinkware._id,
        isFeatured: false,
        salesCount: 310,
        rating: 4.7,
        numReviews: 69,
        mainImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800',
        images: [
          'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800'
        ],
        attributes: [
          { key: 'Capacity', value: '400 ml' },
          { key: 'Base', value: 'Natural Heat-Insulating Cork' }
        ]
      }
    ];

    const seededProducts = await Product.create(productsData);
    console.log(`${seededProducts.length} Corporate Gifting products seeded successfully.`);

    // 4. Create Inventory Logs
    for (const prod of seededProducts) {
      await InventoryLog.create({
        product: prod._id,
        change: prod.inventory,
        type: 'stock_in',
        notes: 'Initial seed stock for Corporate Gifting'
      });
    }

    // 5. Seed Coupons
    await Coupon.create([
      { code: 'CORP10', discountType: 'percentage', discountValue: 10, minOrderAmount: 1000, expiryDate: new Date('2028-12-31') },
      { code: 'FLAT500', discountType: 'flat', discountValue: 500, minOrderAmount: 5000, expiryDate: new Date('2028-12-31') }
    ]);
    console.log('Corporate Coupons seeded.');

    console.log('\n=============================================');
    console.log('SUCCESS: All Corporate Gifting data seeded!');
    console.log('=============================================\n');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Seeding process error:', error);
    process.exit(1);
  }
};

seedDB();


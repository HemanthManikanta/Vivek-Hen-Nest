# 🐔 Vivek's Country Chicken Farm - Hen Nest

## Fresh and Rich Protein - Direct from Farm to Your Table

### 📋 Overview

A modern, responsive website for Vivek's Country Chicken Farm featuring:
- Beautiful farm-themed UI with traditional village culture aesthetic
- Green and natural color scheme with hen imagery
- Customer browsing and ordering system
- Direct WhatsApp integration for price negotiations
- Seller dashboard for inventory management
- Unique order ID generation system
- Farm pickup-only model (no home deliveries)

### ✨ Features

#### 👥 For Customers
- **Browse Hens**: View all available chickens with details (breed, age, weight)
- **Filter Options**: Search by breed or filter by availability status
- **Detailed View**: Click any hen to see full details in modal
- **WhatsApp Contact**: Direct WhatsApp integration to contact seller
- **Price Negotiation**: Agree on price with seller
- **Order Generation**: Create unique order ID after price agreement
- **Order Tracking**: View all your orders with unique IDs
- **Farm Pickup**: Instructions for picking up orders from farm

#### 👨‍🌾 For Sellers
- **Add Hens**: Add new chickens with details:
  - Breed/Variety
  - Age (in months)
  - Weight (in kg)
  - Price
  - Photo URL
  - Availability Status
- **Manage Inventory**: View all listed hens in inventory
- **Update Status**: Mark hens as Available, Reserved, or Sold
- **Delete Hens**: Remove sold out or unavailable hens
- **Photo Management**: Upload custom photos for each hen

### 🎨 Design Features

- **Color Scheme**: Green (#27ae60) and earthy tones reflecting farm culture
- **Typography**: Modern, readable fonts with clear hierarchy
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Traditional Aesthetic**: Village culture elements, hen emojis, farm imagery
- **User-Friendly**: Intuitive navigation and smooth interactions

### 📱 Responsive Layout

- Desktop: Full grid layout with multiple columns
- Tablet: Adjusted grid with 2 columns
- Mobile: Single column with touch-friendly buttons

### 🚀 Getting Started

#### 1. Access the Website
```
https://HemanthManikanta.github.io/Vivek-Hen-Nest/
```

#### 2. Configure Settings

**Update WhatsApp Number:**
Edit `script.js` line 2:
```javascript
const whatsappNumber = '919876543210'; // Change to your number with country code
```

Format: Country code + phone number (no + symbol)
- India: 91 + number
- Example: '919876543210'

#### 3. Add Vivek's Photo
1. Click "Click to Upload Vivek's Photo" on homepage
2. Select image file
3. Photo is automatically saved locally

### 💾 Data Storage

All data is stored using **browser localStorage**:
- **Hens**: `vivek_farm_hens` - All chicken inventory
- **Orders**: `vivek_farm_orders` - Customer orders with unique IDs
- **Photo**: `vivek_photo` - Vivek's uploaded photo (base64)

**Note**: Data persists even after closing browser (within same device/browser)

### 📦 Order ID Format

Unique order IDs are generated automatically:
```
VCF-[TIMESTAMP]-[RANDOM]
Example: VCF-2ABCD12EF-ABC123
```

### 🔄 Business Workflow

1. **Customer Browses** → Sees available hens on homepage
2. **Customer Selects** → Clicks hen to see details
3. **WhatsApp Contact** → Clicks "Contact Seller" to negotiate
4. **Price Agreement** → Enters agreed price
5. **Order Creation** → Generates unique Order ID
6. **Order Confirmation** → Via WhatsApp for pickup details
7. **Farm Pickup** → Customer picks up from farm

### 📁 File Structure

```
Vivek-Hen-Nest/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # JavaScript functionality
└── README.md           # Documentation (this file)
```

### 🎯 Key Sections

1. **Navigation**: Quick links to sections
2. **Hero Section**: Welcome message with Vivek's photo upload
3. **Filter Section**: Search and filter hens
4. **Hens Listing**: Grid of available chickens
5. **Seller Dashboard**: Manage inventory and add hens
6. **Orders Section**: View all created orders
7. **Modal**: Detailed view of selected hen

### 🔐 Privacy & Security

- All data stored locally (no server upload)
- No account creation required
- WhatsApp link opens directly (secure)
- Photo data stored in browser only

### 🌐 Browser Compatibility

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile Browsers

### 🚀 Future Enhancements

- Backend database integration
- User authentication
- Payment gateway integration
- SMS notifications
- Email confirmations
- Advanced analytics
- Multi-language support
- Dark mode

### 📞 Support

For issues or questions:
1. Check GitHub Issues
2. Review README.md
3. Check local browser console (F12) for errors

### 📝 License

This project is open source and available for personal and commercial use.

### 👨‍💻 Developer

Created with ❤️ for Vivek's Country Chicken Farm

Contributions welcome! Feel free to fork and submit pull requests.

---

**Enjoy fresh, protein-rich country chickens directly from the farm! 🐔🌿**

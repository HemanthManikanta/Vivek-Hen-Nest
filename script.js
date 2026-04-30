// WhatsApp Configuration
const whatsappNumber = '919876543210'; // Change to your WhatsApp number with country code

// Storage keys
const HENS_STORAGE_KEY = 'vivek_farm_hens';
const ORDERS_STORAGE_KEY = 'vivek_farm_orders';
const VIVEK_PHOTO_KEY = 'vivek_photo';

// Current selected hen
let currentHenId = null;
let currentHenDetails = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadVivekPhoto();
    loadAllHens();
    setupEventListeners();
    displayOrders();
});

// Setup Event Listeners
function setupEventListeners() {
    // Vivek photo upload
    document.getElementById('vivekPhotoInput').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const photoData = event.target.result;
                localStorage.setItem(VIVEK_PHOTO_KEY, photoData);
                displayVivekPhoto(photoData);
                alert('Photo updated successfully!');
            };
            reader.readAsDataURL(file);
        }
    });

    // Add hen form
    document.getElementById('addHenForm').addEventListener('submit', function(e) {
        e.preventDefault();
        addNewHen();
    });

    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Vivek Photo Functions
function loadVivekPhoto() {
    const photoData = localStorage.getItem(VIVEK_PHOTO_KEY);
    if (photoData) {
        displayVivekPhoto(photoData);
    }
}

function displayVivekPhoto(photoData) {
    const display = document.getElementById('vivekPhotoDisplay');
    display.innerHTML = `<img src="${photoData}" alt="Vivek's Photo" style="width:100%; height:100%; object-fit:cover;">`;
}

// Hen Management Functions
function loadAllHens() {
    const hens = getHensFromStorage();
    displayHens(hens);
    displayInventory(hens);
}

function getHensFromStorage() {
    const data = localStorage.getItem(HENS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function saveHensToStorage(hens) {
    localStorage.setItem(HENS_STORAGE_KEY, JSON.stringify(hens));
}

function addNewHen() {
    const hen = {
        id: Date.now(),
        breed: document.getElementById('henBreed').value,
        age: parseInt(document.getElementById('henAge').value),
        weight: parseFloat(document.getElementById('henWeight').value),
        price: parseInt(document.getElementById('henPrice').value),
        photo: document.getElementById('henPhoto').value || '🐔',
        status: document.getElementById('henStatus').value,
        dateAdded: new Date().toLocaleDateString()
    };

    const hens = getHensFromStorage();
    hens.push(hen);
    saveHensToStorage(hens);

    // Reset form
    document.getElementById('addHenForm').reset();
    alert('Chicken added successfully!');
    loadAllHens();
}

function deleteHen(henId) {
    if (confirm('Are you sure you want to delete this chicken?')) {
        let hens = getHensFromStorage();
        hens = hens.filter(h => h.id !== henId);
        saveHensToStorage(hens);
        loadAllHens();
        alert('Chicken deleted successfully!');
    }
}

// Display Functions
function displayHens(hens) {
    const hensList = document.getElementById('hensList');
    const noMessage = document.getElementById('noHensMessage');

    if (hens.length === 0) {
        hensList.innerHTML = '';
        noMessage.style.display = 'block';
        return;
    }

    noMessage.style.display = 'none';
    hensList.innerHTML = hens.map(hen => `
        <div class="hen-card" onclick="openHenModal(${hen.id})">
            <div class="hen-image">
                ${hen.photo.startsWith('http') ? `<img src="${hen.photo}" alt="${hen.breed}">` : hen.photo}
            </div>
            <div class="hen-info">
                <div class="hen-breed">${hen.breed}</div>
                <div class="hen-details">🐣 Age: ${hen.age} months</div>
                <div class="hen-details">⚖️ Weight: ${hen.weight} kg</div>
                <div class="hen-price">₹${hen.price}</div>
                <span class="hen-status ${hen.status}">${hen.status}</span>
                <div class="hen-actions">
                    <button class="btn btn-primary" onclick="event.stopPropagation(); openHenModal(${hen.id})">View Details</button>
                </div>
            </div>
        </div>
    `).join('');
}

function displayInventory(hens) {
    const inventory = document.getElementById('inventoryList');

    if (hens.length === 0) {
        inventory.innerHTML = '<p class="no-data">No chickens added yet.</p>';
        return;
    }

    inventory.innerHTML = hens.map(hen => `
        <div class="inventory-item">
            <div class="hen-image">
                ${hen.photo.startsWith('http') ? `<img src="${hen.photo}" alt="${hen.breed}">` : hen.photo}
            </div>
            <div class="inventory-info">
                <div class="inventory-breed">${hen.breed}</div>
                <div class="inventory-details">🐣 Age: ${hen.age} months</div>
                <div class="inventory-details">⚖️ Weight: ${hen.weight} kg</div>
                <div class="inventory-price">₹${hen.price}</div>
                <span class="inventory-status ${hen.status}">${hen.status}</span>
                <div class="inventory-actions">
                    <button class="delete-btn" onclick="deleteHen(${hen.id})">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Modal Functions
function openHenModal(henId) {
    const hens = getHensFromStorage();
    const hen = hens.find(h => h.id === henId);

    if (hen) {
        currentHenId = henId;
        currentHenDetails = hen;

        document.getElementById('modalBreed').textContent = hen.breed;
        document.getElementById('modalAge').textContent = hen.age;
        document.getElementById('modalWeight').textContent = hen.weight;
        document.getElementById('modalStatus').textContent = hen.status;
        document.getElementById('modalPrice').textContent = hen.price;

        const modalImage = document.getElementById('modalImage');
        if (hen.photo.startsWith('http')) {
            modalImage.src = hen.photo;
        } else {
            modalImage.innerHTML = hen.photo;
            modalImage.style.fontSize = '100px';
            modalImage.style.textAlign = 'center';
        }

        document.getElementById('agreedPrice').value = hen.price;
        document.getElementById('henModal').style.display = 'block';
    }
}

function closeModal() {
    document.getElementById('henModal').style.display = 'none';
    currentHenId = null;
    currentHenDetails = null;
}

window.onclick = function(event) {
    const modal = document.getElementById('henModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// WhatsApp Contact Function
function contactSeller() {
    const henName = currentHenDetails.breed;
    const price = currentHenDetails.price;
    const message = `Hello! I'm interested in your ${henName} chicken priced at ₹${price}. Can we discuss the details?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappLink, '_blank');
}

// Order Generation Function
function generateOrder() {
    const agreedPrice = document.getElementById('agreedPrice').value;

    if (!agreedPrice) {
        alert('Please enter the agreed price.');
        return;
    }

    if (parseInt(agreedPrice) < 100) {
        alert('Price must be at least ₹100.');
        return;
    }

    const orderId = generateUniqueOrderId();
    const order = {
        orderId: orderId,
        henId: currentHenId,
        henBreed: currentHenDetails.breed,
        agreedPrice: parseInt(agreedPrice),
        basePrice: currentHenDetails.price,
        weight: currentHenDetails.weight,
        status: 'Pending',
        createdAt: new Date().toLocaleString(),
        pickupDate: 'To be decided with seller'
    };

    let orders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY)) || [];
    orders.push(order);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));

    alert(`Order created successfully!\n\nOrder ID: ${orderId}\n\nPlease contact the seller via WhatsApp to confirm pickup date and location.`);

    closeModal();
    displayOrders();
    document.querySelector('.nav-link[href="#orders"]').click();
}

function generateUniqueOrderId() {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `VCF-${timestamp}-${random}`;
}

// Display Orders
function displayOrders() {
    const ordersList = document.getElementById('ordersList');
    const orders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY)) || [];

    if (orders.length === 0) {
        ordersList.innerHTML = '<p class="no-data">No orders yet. Browse and select hens to create an order!</p>';
        return;
    }

    ordersList.innerHTML = orders.map(order => `
        <div class="order-card">
            <h3>${order.henBreed}</h3>
            <div class="order-detail">
                <strong>Order ID:</strong>
                <span>${order.orderId}</span>
            </div>
            <div class="order-detail">
                <strong>Agreed Price:</strong>
                <span>₹${order.agreedPrice}</span>
            </div>
            <div class="order-detail">
                <strong>Weight:</strong>
                <span>${order.weight} kg</span>
            </div>
            <div class="order-detail">
                <strong>Status:</strong>
                <span>${order.status}</span>
            </div>
            <div class="order-detail">
                <strong>Created:</strong>
                <span>${order.createdAt}</span>
            </div>
            <div class="order-id">📦 ${order.orderId}</div>
            <p style="margin-top: 15px; font-size: 14px; color: #666;">Pickup from farm on agreed date. Contact seller for confirmation.</p>
        </div>
    `).join('');
}

// Filter Functions
function filterHens() {
    const hens = getHensFromStorage();
    const statusFilter = document.getElementById('statusFilter').value.toLowerCase();
    const breedFilter = document.getElementById('breedFilter').value.toLowerCase();

    const filtered = hens.filter(hen => {
        const matchStatus = !statusFilter || hen.status.toLowerCase() === statusFilter;
        const matchBreed = !breedFilter || hen.breed.toLowerCase().includes(breedFilter);
        return matchStatus && matchBreed;
    });

    displayHens(filtered);
}

function clearFilters() {
    document.getElementById('statusFilter').value = '';
    document.getElementById('breedFilter').value = '';
    loadAllHens();
}

// Scroll to Hens
function scrollToHens() {
    document.getElementById('hens').scrollIntoView({ behavior: 'smooth' });
}
// Toggle Settings Modal
function toggleSettings() {
    const modal = document.getElementById('settingsModal');
    modal.classList.toggle('hidden');
}

// Toggle Forgot Password Modal
function toggleForgotPassword() {
    const modal = document.getElementById('forgotPasswordModal');
    modal.classList.toggle('hidden');
}

// Search Functionality
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const resultsList = document.getElementById('resultsList');

const dummyData = [
    { name: 'Item 1', category: 'Category A' },
    { name: 'Item 2', category: 'Category B' },
    { name: 'Item 3', category: 'Category A' },
];

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm.length > 0) {
        searchResults.classList.remove('hidden');
        const filtered = dummyData.filter(item => 
            item.name.toLowerCase().includes(searchTerm) ||
            item.category.toLowerCase().includes(searchTerm)
        );
        displayResults(filtered);
    } else {
        searchResults.classList.add('hidden');
    }
});

function displayResults(results) {
    resultsList.innerHTML = '';
    results.forEach(item => {
        const div = document.createElement('div');
        div.className = 'p-2 hover:bg-gray-100 cursor-pointer rounded';
        div.innerHTML = `
            <div class="font-medium">${item.name}</div>
            <div class="text-sm text-gray-500">${item.category}</div>
        `;
        resultsList.appendChild(div);
    });
}

// Clear Search Functionality
document.getElementById('clearSearch').addEventListener('click', () => {
    searchInput.value = '';
    searchResults.classList.add('hidden');
});

// Filter Dropdown
const filterBtn = document.getElementById('filterBtn');
const filterDropdown = document.getElementById('filterDropdown');

filterBtn.addEventListener('click', () => {
    filterDropdown.classList.toggle('hidden');
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('#filterBtn') && !e.target.closest('#filterDropdown')) {
        filterDropdown.classList.add('hidden');
    }
    if (!e.target.closest('#searchInput') && !e.target.closest('#searchResults')) {
        searchResults.classList.add('hidden');
    }
});

// Forgot Password Form
document.getElementById('forgotPasswordForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Password reset link has been sent to your email!');
    toggleForgotPassword();
});
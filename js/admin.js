// Admin dashboard functionality
// Note: API_URL is already defined in auth.js

// Check if user is admin
if (!auth.requireAuth() || !auth.requireAdmin()) {
    // Will redirect automatically
}

// Add console logging for debugging
console.log('Admin dashboard loaded');
console.log('Auth token:', auth.token ? 'Present' : 'Missing');
console.log('User role:', auth.user?.role);

// Display user info
function displayUserInfo() {
    const userInfo = document.getElementById('userInfo');
    if (auth.user) {
        userInfo.innerHTML = `
            <strong>Logged in as:</strong> ${auth.user.username}
            <span class="badge badge-${auth.user.role}">${auth.user.role.toUpperCase()}</span>
            <br>
            <strong>Email:</strong> ${auth.user.email}
        `;
    }
}

// Fetch and display all users FROM THE DATABASE
async function loadUsers() {
    const errorMessage = document.getElementById('errorMessage');
    const loadingMessage = document.getElementById('loadingMessage');
    const usersTable = document.getElementById('usersTable');
    const usersTableBody = document.getElementById('usersTableBody');

    // Show loading state
    loadingMessage.style.display = 'block';
    loadingMessage.textContent = 'Loading users from database...';
    usersTable.style.display = 'none';
    errorMessage.style.display = 'none';

    console.log('Fetching users from:', `${API_URL}/users`);

    try {
        const response = await fetch(`${API_URL}/users`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        console.log('Response status:', response.status);
        const users = await response.json();
        console.log('Users received from database:', users);

        if (!response.ok) {
            throw new Error(users.error || 'Failed to load users from database');
        }

        // Check if we got any users
        if (!Array.isArray(users) || users.length === 0) {
            loadingMessage.textContent = 'No users found in database. Create some users first!';
            loadingMessage.style.display = 'block';
            return;
        }

        // Update statistics with REAL data from database
        const totalCount = users.length;
        const adminCount = users.filter(u => u.role === 'admin').length;
        const userCount = users.filter(u => u.role === 'user').length;

        document.getElementById('totalUsers').textContent = totalCount;
        document.getElementById('adminUsers').textContent = adminCount;
        document.getElementById('regularUsers').textContent = userCount;

        console.log(`Database stats - Total: ${totalCount}, Admins: ${adminCount}, Users: ${userCount}`);

        // Display users table with REAL data from database
        usersTableBody.innerHTML = '';
        users.forEach((user, index) => {
            console.log(`Adding user ${index + 1}:`, user.username);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td><span class="badge badge-${user.role}">${user.role.toUpperCase()}</span></td>
                <td>${new Date(user.created_at).toLocaleDateString()} ${new Date(user.created_at).toLocaleTimeString()}</td>
                <td>
                    <button class="action-btn btn-edit" onclick="editUser(${user.id})">Edit</button>
                    <button class="action-btn btn-delete" onclick="deleteUser(${user.id}, '${user.username}')">Delete</button>
                </td>
            `;
            usersTableBody.appendChild(row);
        });

        loadingMessage.style.display = 'none';
        usersTable.style.display = 'table';
        errorMessage.style.display = 'none';

        console.log('Successfully loaded and displayed all users from database');
    } catch (error) {
        console.error('Error loading users from database:', error);
        errorMessage.textContent = `Database Error: ${error.message}. Make sure the backend server is running on http://localhost:3000`;
        errorMessage.style.display = 'block';
        loadingMessage.style.display = 'none';
    }
}

// Edit user
async function editUser(userId) {
    const newRole = prompt('Enter new role (admin or user):');

    if (!newRole || (newRole !== 'admin' && newRole !== 'user')) {
        alert('Invalid role. Must be "admin" or "user".');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${auth.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role: newRole })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to update user');
        }

        alert('User updated successfully!');
        loadUsers(); // Reload users
    } catch (error) {
        console.error('Error updating user:', error);
        alert('Error: ' + error.message);
    }
}

// Delete user
async function deleteUser(userId, username) {
    if (!confirm(`Are you sure you want to delete user "${username}"?`)) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to delete user');
        }

        alert('User deleted successfully!');
        loadUsers(); // Reload users
    } catch (error) {
        console.error('Error deleting user:', error);
        alert('Error: ' + error.message);
    }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    displayUserInfo();
    loadUsers();
});

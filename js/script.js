document.getElementById("donationForm").addEventListener("submit", function(event) {
  event.preventDefault();
  alert("Thank you for your donation!");
  this.reset();
});

// Clear any existing login data on page load
function clearLoginData() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
}

// Navbar login/profile logic
function updateNavbarProfile() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const loginNav = document.getElementById('loginNav');
  const profileNav = document.getElementById('profileNav');
  if (loginNav && profileNav) {
    if (isLoggedIn) {
      loginNav.classList.add('d-none');
      profileNav.classList.remove('d-none');
      // Set profile info from localStorage
      const name = localStorage.getItem('userName') || 'User';
      const email = localStorage.getItem('userEmail') || '';
      const profileName = document.getElementById('profileName');
      const profileEmail = document.getElementById('profileEmail');
      if (profileName) profileName.textContent = name;
      if (profileEmail) profileEmail.textContent = email;
    } else {
      loginNav.classList.remove('d-none');
      profileNav.classList.add('d-none');
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Clear any existing login data to start fresh
  clearLoginData();
  updateNavbarProfile();
  
  // Logout handler
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      updateNavbarProfile();
      window.location.href = 'login.html';
    });
  }
});
document.getElementById("donationForm").addEventListener("submit", function(event) {
  event.preventDefault();
  alert("Thank you for your donation!");
  this.reset();
});
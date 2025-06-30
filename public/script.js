

let Products = [
    {
        name: "MDH Lal Mirch",
        category: "In Stock"
    },
    {
        name: "MDH Dhaniya Powder",
        category: "Out of Stock"
    }
]

let Products = require ('./db')

function renderBoard() {
    
    document.querySelectorAll(".column-body").forEach(col => col.innerHTML = "");
  
    // Group products by category
    const grouped = {
      "In Stock": [],
      "Low Stock": [],
      "Out of Stock": [],
      "To Purchase": []
    };
  
    // Distribute products into their categories
    Products.forEach(product => {
      if (grouped[product.category]) {
        grouped[product.category].push(product);
      }
    });
  
    // Sort each category alphabetically and render
    for (const category in grouped) {
      const categoryId = category.toLowerCase().replace(/\s/g, '-');
      const column = document.getElementById(categoryId);
  
      // Sort alphabetically by name
      grouped[category].sort((a, b) => a.name.localeCompare(b.name));
  
      grouped[category].forEach(product => {
        const card = createCard(product);
        column.appendChild(card);
      });
    }
  }
  

  function createCard(product) {
    const card = document.createElement("div");
    const cleanClass = product.category.toLowerCase().replace(/\s/g, '');
    card.className = `card card-${cleanClass}`;
    card.setAttribute("draggable", "true");
    card.textContent = product.name;
  
    // Create delete button
    const deleteBtn = document.createElement("span");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "×"; // Multiplication symbol for close (x)
    card.appendChild(deleteBtn);
  
    // Handle drag
    card.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", product.name);
    });
  
    // Handle delete
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent triggering drag
      Products = Products.filter(p => p.name !== product.name);
      renderBoard();
    });
  
    return card;
  }
  

//drag drop
document.querySelectorAll(".column").forEach(column => {
  column.addEventListener("dragover", e => e.preventDefault());

  column.addEventListener("drop", e => {
    e.preventDefault();
    const productName = e.dataTransfer.getData("text/plain");
    const product = Products.find(p => p.name === productName);
    const newCategory = column.dataset.category;

    if (product && newCategory) {
      product.category = newCategory;
      renderBoard();
    }
  });
});

//search bar
document.querySelectorAll(".search-input").forEach(input => {
    input.addEventListener("input", function () {
      const searchTerm = input.value.toLowerCase();
      const columnId = input.nextElementSibling.id; // assumes column-body is right after input
      const cards = document.querySelectorAll(`#${columnId} .card`);
      
      cards.forEach(card => {
        const productName = card.textContent.toLowerCase();
        card.style.display = productName.includes(searchTerm) ? "block" : "none";
      });
    });
  });
  

//add button in column
document.querySelectorAll(".add-btn").forEach(button => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;
      document.getElementById("popupCategory").value = category;
      document.getElementById("popupCategoryLabel").textContent = category;
      document.getElementById("popupFormContainer").classList.remove("hidden");
    });
  });
  
  //popup
  document.getElementById("popupForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const name = document.getElementById("popupName").value.trim();
    const category = document.getElementById("popupCategory").value;
  
    if (!name || !category) return;
  
    // Prevent duplicates
    const exists = Products.some(p => p.name.toLowerCase() === name.toLowerCase());
    if (exists) {
      alert("Product with this name already exists.");
      return;
    }
  
    Products.push({ name, category });
    renderBoard();
    this.reset();
    document.getElementById("popupFormContainer").classList.add("hidden");
  });
  
  // ===== Close Popup =====
  document.getElementById("closePopup").addEventListener("click", () => {
    document.getElementById("popupForm").reset();
    document.getElementById("popupFormContainer").classList.add("hidden");
  });
  
  // ===== Initial Board Render =====
  renderBoard();
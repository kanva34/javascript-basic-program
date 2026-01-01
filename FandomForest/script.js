// --- API Keys ---
const GOOGLE_API_KEY = "AIzaSyDk_5qIgeYzZNhnX9Ou5KxRqGoAOTkoylg";
const SEARCH_ENGINE_ID = "23d84bbb43e29465c";

// --- Data storage ---
let bookmarks = JSON.parse(localStorage.getItem("fandomforest_data")) || [];
let folders = JSON.parse(localStorage.getItem("fandomforest_folders")) || ["Default"];
let currentFolder = "all";

// Save bookmarks and folders to localStorage
function save() {
  localStorage.setItem("fandomforest_data", JSON.stringify(bookmarks));
  localStorage.setItem("fandomforest_folders", JSON.stringify(folders));
  render();
}

// ---------------- MODAL & API ----------------
async function showInfo(title, type) {
  const modal = document.getElementById("detailModal");
  const body = document.getElementById("modalBody");
  const loader = document.getElementById("modalLoading");

  modal.classList.remove("hidden");
  body.innerHTML = "";
  loader.classList.remove("hidden");

  const query = `${title} ${type}`.trim();

  try {
    let kgItem = null;
    let searchResults = [];

    // --- Knowledge Graph fetch ---
    try {
      const kgRes = await fetch(`https://kgsearch.googleapis.com/v1/entities:search?query=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}&limit=1&indent=true`);
      if (kgRes.ok) {
        const kgJson = await kgRes.json();
        kgItem = kgJson.itemListElement?.[0]?.result || null;
      }
    } catch {}

    // --- Custom Search fetch ---
    try {
      const csRes = await fetch(`https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&num=4&searchType=image`);
      if (csRes.ok) {
        const csJson = await csRes.json();
        searchResults = csJson.items || [];
      }
    } catch {}

    loader.classList.add("hidden");

    if (!kgItem && searchResults.length === 0) {
      body.innerHTML = `<div style="text-align:center; padding: 5rem;"><p style="color:#64748b">No data found for \"${title}\".</p></div>`;
      return;
    }

    let imageUrl = kgItem?.image?.contentUrl || searchResults?.[0]?.link || "https://via.placeholder.com/400x600?text=No+Image";
    let viewLink = kgItem?.detailedDescription?.url || searchResults?.[0]?.image?.contextLink || `https://www.google.com/search?q=${encodeURIComponent(query)}`;

    let displayTitle = kgItem?.name || title;
    let description = kgItem?.description || kgItem?.detailedDescription?.articleBody || searchResults?.[0]?.snippet || "No description available.";

    let detailsHTML = `
      <div class="info-layout">
        <img src="${imageUrl}" class="info-img" />
        <div style="flex:1">
          <span class="info-badge">${type}</span>
          <h2 class="info-h2">${displayTitle}</h2>
          <p class="info-desc">${description}</p>
          <a href="${viewLink}" target="_blank" class="btn-view">VIEW →</a>
        </div>
      </div>
    `;

    if (searchResults.length > 0) {
      detailsHTML += `<div class="results-list"><h3 class="results-h3">Other Results</h3><ul style="padding:0; list-style:none;">`;
      searchResults.forEach((item) => {
        const link = item.link || "#";
        const snippet = item.snippet || "";
        const titleItem = item.title || link;
        detailsHTML += `<li class="result-item"><a href="${link}" target="_blank" class="result-link">${titleItem}</a><p class="result-snippet">${snippet}</p></li>`;
      });
      detailsHTML += `</ul></div>`;
    }

    body.innerHTML = detailsHTML;
  } catch (e) {
    loader.classList.add("hidden");
    body.innerHTML = `<p style="text-align:center; color:#f87171; font-weight:bold;">Failed to fetch data. Please try again.</p>`;
    console.error(e);
  }
}

// ---------------- FOLDER / MODAL ----------------
window.setFolder = (f) => { currentFolder = f; render(); };
window.toggleAddModal = () => document.getElementById("addModal").classList.toggle("hidden");
window.closeModal = () => document.getElementById("detailModal").classList.add("hidden");

// ----- Custom Modals for Folder -----
function showFolderModal() {
  const modalHTML = `
    <div class="modal-overlay" id="folderModal">
      <div class="modal-content small-modal">
        <h2 class="modal-title">Create New Folder</h2>
        <input type="text" id="folderNameInput" class="input-text" placeholder="Enter folder name" />
        <button id="saveFolderBtn" class="btn btn-primary full-width">Save</button>
        <button id="cancelFolderBtn" class="btn-text full-width">Cancel</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const folderModal = document.getElementById('folderModal');
  const input = document.getElementById('folderNameInput');
  input.focus();

  document.getElementById('saveFolderBtn').onclick = () => {
    const name = input.value.trim();
    if (!name) return alert('Folder name cannot be empty!');
    if (folders.includes(name)) return alert('Folder already exists!');
    folders.push(name);
    save();
    folderModal.remove();
  };
  document.getElementById('cancelFolderBtn').onclick = () => folderModal.remove();
}

window.createNewFolder = showFolderModal;

// ----- Custom Modal for Bulk Import -----
function showImportModal(fileInput, target) {
  const modalHTML = `
    <div class="modal-overlay" id="importModal">
      <div class="modal-content small-modal">
        <h2 class="modal-title">Bulk Import</h2>
        <p class="label-tiny">Enter file format (txt/pdf)</p>
        <input type="text" id="importFormatInput" class="input-text" placeholder="txt or pdf" />
        <button id="importSaveBtn" class="btn btn-primary full-width">Import</button>
        <button id="importCancelBtn" class="btn-text full-width">Cancel</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const modal = document.getElementById('importModal');
  const input = document.getElementById('importFormatInput');
  input.focus();

  document.getElementById('importSaveBtn').onclick = async () => {
    const format = (input.value || '').toLowerCase();
    if (format !== 'txt' && format !== 'pdf') return alert('Invalid format! Only txt/pdf allowed.');

    let names = [];
    if (format === 'txt') {
      names = (await fileInput.files[0].text()).split(/\r?\n/).map(n => n.trim()).filter(n => n);
    } else if (format === 'pdf') {
      const arrayBuffer = await fileInput.files[0].arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ').split(/\r?\n/).map(n => n.trim()).filter(n => n);
        names.push(...pageText);
      }
    }

    const existingTitles = bookmarks.map(b => b.title.toLowerCase());
    names = [...new Set(names.map(n => n.trim()))].filter(n => !existingTitles.includes(n.toLowerCase()));
    if (names.length === 0) return alert('No new unique entries found!');

    names.forEach(n => {
      bookmarks.push({
        id: Date.now() + Math.random(),
        title: n,
        type: 'Anime',
        folder: target,
        status: 'Watching',
        favorite: false
      });
    });

    fileInput.value = '';
    save();
    alert('Batch Import Success!');
    modal.remove();
  };
  document.getElementById('importCancelBtn').onclick = () => modal.remove();
}

async function handleBulkImport() {
  const fileInput = document.getElementById("bulkFileInput");
  const target = document.getElementById("importTargetFolder").value;
  if (!fileInput.files[0]) return alert("Select a file first");
  showImportModal(fileInput, target);
}

// ---------------- REST OF LOGIC ----------------
window.deleteFolder = (f, e) => {
  e.stopPropagation();
  if (f === "Default") return alert("Default folder cannot be deleted.");
  if (confirm(`Delete "${f}" and all its contents?`)) {
    bookmarks = bookmarks.filter(b => b.folder !== f);
    folders = folders.filter(folder => folder !== f);
    if (currentFolder === f) currentFolder = "all";
    save();
  }
};

window.deleteItem = (id) => { if (confirm("Remove this entry?")) { bookmarks = bookmarks.filter(b => b.id !== id); save(); } };
window.toggleFav = (id) => { bookmarks = bookmarks.map(b => b.id === id ? {...b, favorite: !b.favorite} : b); save(); };
window.updateStatus = (id, s) => { bookmarks = bookmarks.map(b => b.id === id ? {...b, status: s} : b); save(); };
window.addItem = () => { const title = document.getElementById("titleInput").value.trim(); if (!title) return; bookmarks.push({id: Date.now(), title, type: document.getElementById("typeSelect").value, folder: document.getElementById("folderSelect").value, status: document.getElementById("statusSelect").value, favorite: false}); document.getElementById("titleInput").value = ""; toggleAddModal(); save(); };

function render() {
  const fList = document.getElementById("folderList");
  const grid = document.getElementById("bookmarkGrid");
  const query = document.getElementById("searchInput").value.toLowerCase();

  fList.innerHTML = `<div onclick="setFolder('all')" class="folder-item ${currentFolder==='all'?'active':''}"><span>📂 All Content</span></div>`;
  folders.forEach(f => {
    fList.innerHTML += `<div onclick="setFolder('${f}')" class="folder-item ${currentFolder===f?'active':''}"><span>📁 ${f}</span><button onclick="deleteFolder('${f}', event)" class="delete-folder-btn">🗑️</button></div>`;
  });

  document.getElementById("importTargetFolder").innerHTML = folders.map(f=>`<option value="${f}">${f}</option>`).join('');
  document.getElementById("folderSelect").innerHTML = folders.map(f=>`<option value="${f}">${f}</option>`).join('');

  grid.innerHTML = '';
  const filtered = bookmarks.filter(b => (currentFolder==='all'||b.folder===currentFolder)&&(b.title.toLowerCase().includes(query)||b.type.toLowerCase().includes(query)));
  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card glass';
    card.innerHTML = `<div><div class="card-header"><span class="badge">${item.type}</span><div class="card-actions"><button onclick="toggleFav(${item.id})" class="btn-fav ${item.favorite?'active':''}">★</button><button onclick="deleteItem(${item.id})" class="btn-delete">✕</button></div></div><h3 onclick="showInfo('${item.title.replace(/'/g,"\\'")}','${item.type}')" class="card-title">${item.title}</h3><p class="card-folder">${item.folder}</p></div><div class="card-footer"><select onchange="updateStatus(${item.id},this.value)" class="status-select"><option value="Watching" ${item.status==='Watching'?'selected':''}>Watching</option><option value="Reading" ${item.status==='Reading'?'selected':''}>Reading</option><option value="Completed" ${item.status==='Completed'?'selected':''}>Completed</option><option value="Plan to Read" ${item.status==='Plan to Read'?'selected':''}>On Hold</option></select><button onclick="showInfo('${item.title.replace(/'/g,"\\'")}','${item.type}')" class="info-link">INFO →</button></div>`;
    grid.appendChild(card);
  });
}

window.exportToPDF = () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("ZEN PRO MAX - COLLECTION", 14, 20);
  doc.autoTable({ head:[["Title","Type","Folder","Status"]], body: bookmarks.map(b=>[b.title,b.type,b.folder,b.status]), startY:30, theme:"grid", headStyles:{fillColor:[99,102,241]} });
  doc.save("MyLibrary.pdf");
};

render();
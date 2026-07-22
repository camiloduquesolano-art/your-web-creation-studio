/* ==========================================================================
   SHROOMED LANDING PAGE LOGIC & INTERACTION
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Manejo de la Lista de Espera en LocalStorage
  const STORAGE_KEY = 'shroomed_waitlist_users';
  const BASE_SUBSCRIBERS = 842;

  // Obtener usuarios guardados
  function getStoredUsers() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  // Guardar nuevo usuario
  function saveUser(email, goal = 'No especificado') {
    const users = getStoredUsers();
    
    // Evitar duplicados exactos
    const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (!exists) {
      users.push({
        email: email,
        goal: goal,
        date: new Date().toLocaleString('es-ES')
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    }
    updateSubscriberCount();
  }

  // Actualizar contador visual
  function updateSubscriberCount() {
    const users = getStoredUsers();
    const total = BASE_SUBSCRIBERS + users.length;
    const countEl = document.getElementById('subscriberCount');
    if (countEl) {
      countEl.textContent = total.toLocaleString();
    }
  }

  updateSubscriberCount();

  // 2. Formularios de Captura
  const heroForm = document.getElementById('heroWaitlistForm');
  const finalForm = document.getElementById('finalWaitlistForm');

  if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('userEmail').value.trim();
      const goal = document.getElementById('userGoal').value;
      if (email) {
        saveUser(email, goal);
        showToast('¡Te has registrado con éxito en la beta privada! 🍄');
        heroForm.reset();
      }
    });
  }

  if (finalForm) {
    finalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('finalUserEmail').value.trim();
      if (email) {
        saveUser(email, 'Registro directo CTA final');
        showToast('¡Lugar reservado! Te contactaremos pronto. 🚀');
        finalForm.reset();
      }
    });
  }

  // 3. Sistema de Toast Notifications
  function showToast(message) {
    const toast = document.getElementById('toastNotification');
    const toastMsg = document.getElementById('toastMessage');
    if (toast && toastMsg) {
      toastMsg.textContent = message;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 4000);
    }
  }

  // 4. Animaciones por Scroll (IntersectionObserver)
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-fade');
  
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // 5. Parallax interactivo con el cursor para stickers flotantes
  const stickers = document.querySelectorAll('.floating-sticker');
  window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    stickers.forEach((sticker, idx) => {
      const depth = (idx + 1) * 12;
      const moveX = (clientX - centerX) / depth;
      const moveY = (clientY - centerY) / depth;
      sticker.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });

  // 6. Modal Administrador y Exportación CSV
  const adminModal = document.getElementById('adminModal');
  const openAdminBtn = document.getElementById('openAdminBtn');
  const closeAdminBtn = document.getElementById('closeAdminBtn');
  const exportCsvBtn = document.getElementById('exportCsvBtn');
  const tableBody = document.getElementById('waitlistTableBody');
  const modalTotalCount = document.getElementById('modalTotalCount');

  if (openAdminBtn) {
    openAdminBtn.addEventListener('click', () => {
      renderAdminTable();
      adminModal.classList.add('active');
    });
  }

  if (closeAdminBtn) {
    closeAdminBtn.addEventListener('click', () => {
      adminModal.classList.remove('active');
    });
  }

  if (adminModal) {
    adminModal.addEventListener('click', (e) => {
      if (e.target === adminModal) {
        adminModal.classList.remove('active');
      }
    });
  }

  function renderAdminTable() {
    const users = getStoredUsers();
    if (modalTotalCount) modalTotalCount.textContent = users.length;
    if (!tableBody) return;

    tableBody.innerHTML = '';
    if (users.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="4" style="text-align:center; opacity: 0.7;">No hay registros nuevos en este navegador aún.</td></tr>`;
      return;
    }

    users.forEach((u, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td><strong>${escapeHtml(u.email)}</strong></td>
        <td>${escapeHtml(u.goal)}</td>
        <td>${escapeHtml(u.date)}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function(m) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[m];
    });
  }

  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', () => {
      const users = getStoredUsers();
      if (users.length === 0) {
        alert('No hay datos para exportar aún.');
        return;
      }

      let csvContent = "data:text/csv;charset=utf-8,ID,Email,Objetivo,Fecha\n";
      users.forEach((u, idx) => {
        csvContent += `${idx + 1},"${u.email}","${u.goal}","${u.date}"\n`;
      });

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `shroomed_waitlist_${new Date().toISOString().slice(0,10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

});

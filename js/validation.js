/**
 * NorthPeak Digital - Client-side Form Validation & Submission Handler
 */

document.addEventListener('DOMContentLoaded', () => {
  initContactFormValidation();
});

function initContactFormValidation() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const companyInput = document.getElementById('company');
  const messageInput = document.getElementById('message');
  const agreeCheckbox = document.getElementById('agreeContact');
  const submitBtn = form.querySelector('button[type="submit"]');

  const validators = {
    name: value => {
      if (!value.trim()) return 'Full name is required';
      if (value.trim().length < 2) return 'Name must be at least 2 characters';
      return '';
    },
    email: value => {
      if (!value.trim()) return 'Email address is required';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.trim())) return 'Please enter a valid email address';
      return '';
    },
    company: value => {
      if (value.trim() && value.trim().length < 2) {
        return 'Company name must be at least 2 characters';
      }
      return '';
    },
    message: value => {
      if (!value.trim()) return 'Project details message is required';
      if (value.trim().length < 10) return 'Please describe your project in at least 10 characters';
      return '';
    }
  };

  [nameInput, emailInput, companyInput, messageInput].forEach(input => {
    if (!input) return;
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('invalid')) {
        validateField(input);
      }
    });
  });

  function validateField(input) {
    const fieldName = input.name;
    const validator = validators[fieldName];
    if (!validator) return true;

    const errorMessage = validator(input.value);
    const errorDisplay = document.getElementById(`${fieldName}Error`);

    if (errorMessage) {
      input.classList.add('invalid');
      input.setAttribute('aria-invalid', 'true');
      if (errorDisplay) {
        errorDisplay.textContent = errorMessage;
        errorDisplay.classList.add('visible');
      }
      return false;
    } else {
      input.classList.remove('invalid');
      input.removeAttribute('aria-invalid');
      if (errorDisplay) {
        errorDisplay.textContent = '';
        errorDisplay.classList.remove('visible');
      }
      return true;
    }
  }

  function validateCheckbox() {
    if (!agreeCheckbox) return true;
    const errorDisplay = document.getElementById('agreeError');
    if (!agreeCheckbox.checked) {
      if (errorDisplay) {
        errorDisplay.textContent = 'You must agree to be contacted before submitting';
        errorDisplay.classList.add('visible');
      }
      return false;
    } else {
      if (errorDisplay) {
        errorDisplay.textContent = '';
        errorDisplay.classList.remove('visible');
      }
      return true;
    }
  }

  if (agreeCheckbox) {
    agreeCheckbox.addEventListener('change', validateCheckbox);
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const isNameValid = validateField(nameInput);
    const isEmailValid = validateField(emailInput);
    const isCompanyValid = validateField(companyInput);
    const isMessageValid = validateField(messageInput);
    const isAgreeValid = validateCheckbox();

    if (isNameValid && isEmailValid && isCompanyValid && isMessageValid && isAgreeValid) {
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="spin-icon" style="width:20px; height:20px; animation: spin 1s linear infinite;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2 a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
        Sending Request...
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        form.reset();
        showToast('Project Request Received! Our lead engineer will reply within 2 hours.', 'success');
      }, 1200);
    }
  });
}

function showToast(message, type = 'success') {
  const existingToast = document.querySelector('.toast-notification');
  if (existingToast) existingToast.remove();

  const toast = document.createElement('div');
  toast.className = `toast-notification ${type}`;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');

  toast.innerHTML = `
    <svg style="width:24px; height:24px; color:var(--color-success);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke-linecap="round" stroke-linejoin="round"/>
      <polyline points="22 4 12 14.01 9 11.01" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <div>
      <h4 style="font-size:0.95rem; font-weight:700; color:var(--text-primary); margin-bottom:2px;">Success!</h4>
      <p style="font-size:0.85rem; color:var(--text-secondary); margin:0;">${message}</p>
    </div>
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('visible');
  }, 10);

  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 300);
  }, 5000);
}

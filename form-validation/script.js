const form = document.getElementById('signup-form');
const email = document.getElementById('email');
const country = document.getElementById('country');
const postal = document.getElementById('postal');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const highFive = document.getElementById('high-five');

const validators = {
    email: value => /\S+@\S+\.\S+/.test(value) ? '' : 'Enter a valid email.',
    country: value => value.trim() !== '' ? '' : 'Country is required.',
    postal: value => /^[A-Za-z0-9 ]{4,10}$/.test(value) ? '' : 'Enter a valid postal code (4-10 chars).',
    password: value => value.length >= 8 ? '' : 'Password must be at least 8 characters.',
    confirmPassword: value => value === password.value ? '' : 'Passwords do not match.'
};

function validateField(input, validator) {
    const errorSpan = input.parentElement.querySelector('.error-message');
    const error = validator(input.value);
    if (error) {
        input.classList.remove('valid');
        input.classList.add('invalid');
        errorSpan.textContent = error;
        return false;
    } else {
        input.classList.remove('invalid');
        input.classList.add('valid');
        errorSpan.textContent = '';
        return true;
    }
}

email.addEventListener('input', () => validateField(email, validators.email));
country.addEventListener('input', () => validateField(country, validators.country));
postal.addEventListener('input', () => validateField(postal, validators.postal));
password.addEventListener('input', () => {
    validateField(password, validators.password);
    validateField(confirmPassword, validators.confirmPassword); // also update confirm
});
confirmPassword.addEventListener('input', () => validateField(confirmPassword, validators.confirmPassword));

[email, country, postal, password, confirmPassword].forEach(input => {
    input.addEventListener('blur', () => {
        let field = input;
        let validator = validators[field.id === 'confirm-password' ? 'confirmPassword' : field.id];
        validateField(field, validator);
    });
});

form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    valid &= validateField(email, validators.email);
    valid &= validateField(country, validators.country);
    valid &= validateField(postal, validators.postal);
    valid &= validateField(password, validators.password);
    valid &= validateField(confirmPassword, validators.confirmPassword);
    if (valid) {
        highFive.style.display = 'block';
        form.reset();
        [email, country, postal, password, confirmPassword].forEach(input => {
            input.classList.remove('valid');
        });
    } else {
        highFive.style.display = 'none';
    }
});
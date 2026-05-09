// --- Get all slider elements ---
const dailyDistanceSlider = document.getElementById('dailyDistance');
const mileageSlider = document.getElementById('mileage');
const petrolCostSlider = document.getElementById('petrolCost');
const yearsSlider = document.getElementById('years');

// --- Get all display elements ---
const dailyDistanceValue = document.getElementById('dailyDistanceValue');
const mileageValue = document.getElementById('mileageValue');
const petrolCostValue = document.getElementById('petrolCostValue');
const yearsValue = document.getElementById('yearsValue');
const totalSavingsDisplay = document.getElementById('totalSavings');

const savingsLabel = document.getElementById('savingsLabel');

// --- EV cost constant (reverse engineered from original) ---
const EV_COST_PER_KM = 0.24;

// --- Update slider track color ---
function updateTrack(slider) {
    const min = slider.min || 0;
    const max = slider.max || 100;
    const val = slider.value;
    const pct = ((val - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, #000 0%, #000 ${pct}%, #D3D3D3 ${pct}%, #D3D3D3 100%)`;
}

// --- Core savings calculation ---
function calculateSavings(dailyKm, mileage, petrolPrice, years) {
    const petrolCostPerDay = (dailyKm / mileage) * petrolPrice;
    const evCostPerDay = dailyKm * EV_COST_PER_KM;
    const dailySaving = petrolCostPerDay - evCostPerDay;
    const totalSavings = dailySaving * 365 * years;
    return Math.round(totalSavings);
}

// --- Format number Indian style: 2,74,480 ---
function formatIndian(num) {
    return num.toLocaleString('en-IN');
}

// --- Main update function — runs on every slider drag ---
function updateAll() {
    const dailyKm = parseInt(dailyDistanceSlider.value);
    const mileage = parseInt(mileageSlider.value);
    const petrolPrice = parseInt(petrolCostSlider.value);
    const years = parseInt(yearsSlider.value);

    // Update display labels
    dailyDistanceValue.textContent = `${dailyKm} Kms`;
    mileageValue.textContent = `${mileage} Kms`;
    petrolCostValue.textContent = `${petrolPrice} ₹`;
    yearsValue.textContent = `${years} Years`;

    // Update savings label
    savingsLabel.textContent = `Total Savings Over ${years} Years:`;

    // Calculate and display total savings
    const savings = calculateSavings(dailyKm, mileage, petrolPrice, years);
    totalSavingsDisplay.textContent = formatIndian(savings);

    // 👇 ADD FROM HERE ----------------------------

    // EV cost calculations
    const evCostPerDay = dailyKm * EV_COST_PER_KM;
    const evCostPerMonth = Math.round(evCostPerDay * 30);
    const evCostPerYear = Math.round(evCostPerDay * 365);

    // ICE cost calculations
    const iceCostPerDay = (dailyKm / mileage) * petrolPrice;
    const iceCostPerMonth = Math.round(iceCostPerDay * 30);
    const iceCostPerYear = Math.round(iceCostPerDay * 365);

    // Update EV card
    document.getElementById('evCostMonth').textContent = formatIndian(evCostPerMonth);
    document.getElementById('evCostYear').textContent = formatIndian(evCostPerYear);

    // Update ICE card
    document.getElementById('fuelCostMonth').textContent = formatIndian(iceCostPerMonth);
    document.getElementById('fuelCostYear').textContent = formatIndian(iceCostPerYear);

    // 👆 ADD TILL HERE ----------------------------

    // Update all track colors
    updateTrack(dailyDistanceSlider);
    updateTrack(mileageSlider);
    updateTrack(petrolCostSlider);
    updateTrack(yearsSlider);
}

// --- Attach listeners to all sliders ---
dailyDistanceSlider.addEventListener('input', updateAll);
mileageSlider.addEventListener('input', updateAll);
petrolCostSlider.addEventListener('input', updateAll);
yearsSlider.addEventListener('input', updateAll);

// --- Run once on page load ---
updateAll();
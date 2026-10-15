// The part lists live here so they are easy to edit as you learn JavaScript.
// Prices are sample USD estimates for this educational demo, not live listings.
const parts = {
  cpu: [
    { name: 'AMD Ryzen 5 7600', price: 189, detail: '6 cores · Great all-around starter', memory: 'DDR5', socket: 'AM5' },
    { name: 'AMD Ryzen 5 5600', price: 119, detail: '6 cores · Budget-friendly option', memory: 'DDR4', socket: 'AM4' },
    { name: 'Intel Core i5-14400F', price: 199, detail: '10 cores · Strong for games and work', memory: 'DDR4 or DDR5', socket: 'LGA1700' },
    { name: 'Intel Core i5-12400F', price: 139, detail: '6 cores · Solid value choice', memory: 'DDR4 or DDR5', socket: 'LGA1700' }
  ],
  gpu: [
    { name: 'NVIDIA GeForce RTX 4060', price: 299, detail: '8 GB · Efficient 1080p gaming' },
    { name: 'AMD Radeon RX 7600', price: 259, detail: '8 GB · Great 1080p value' },
    { name: 'NVIDIA GeForce RTX 4070', price: 549, detail: '12 GB · Smooth 1440p gaming' },
    { name: 'Use integrated graphics', price: 0, detail: 'No separate graphics card selected' }
  ],
  ram: [
    { name: '16 GB DDR5-6000 (2 × 8 GB)', price: 49, detail: 'A good starting point for everyday use', generation: 'DDR5' },
    { name: '32 GB DDR5-6000 (2 × 16 GB)', price: 89, detail: 'Extra room for games and multitasking', generation: 'DDR5' },
    { name: '16 GB DDR4-3200 (2 × 8 GB)', price: 35, detail: 'Affordable memory for DDR4 systems', generation: 'DDR4' },
    { name: '32 GB DDR4-3200 (2 × 16 GB)', price: 59, detail: 'More capacity for DDR4 systems', generation: 'DDR4' }
  ],
  storage: [
    { name: '1 TB NVMe SSD', price: 59, detail: 'Fast storage · Room for a few big games' },
    { name: '2 TB NVMe SSD', price: 99, detail: 'Fast storage · More room to grow' },
    { name: '500 GB NVMe SSD', price: 39, detail: 'Fast storage · A compact starter option' }
  ]
};

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const ids = Object.keys(parts);
const selectors = Object.fromEntries(ids.map(id => [id, document.getElementById(id)]));

function populateSelects() {
  ids.forEach(id => {
    parts[id].forEach((part, index) => {
      const option = document.createElement('option');
      option.value = String(index);
      option.textContent = `${part.name} — ${currency.format(part.price)}`;
      selectors[id].append(option);
    });
    selectors[id].addEventListener('change', updateBuild);
  });
}

function selectedPart(id) {
  return parts[id][Number(selectors[id].value)];
}

function updateBuild() {
  let total = 0;
  let selectedCount = 0;
  const summary = document.getElementById('summary-parts');
  summary.replaceChildren();

  ids.forEach(id => {
    const part = selectedPart(id);
    document.getElementById(`${id}-detail`).textContent = part.detail;
    document.getElementById(`${id}-price`).textContent = currency.format(part.price);
    total += part.price;
    selectedCount += 1;

    const line = document.createElement('div');
    line.className = 'summary-part';
    const name = document.createElement('span');
    name.textContent = ({ cpu: 'Processor', gpu: 'Graphics', ram: 'Memory', storage: 'Storage' })[id];
    const price = document.createElement('span');
    price.textContent = currency.format(part.price);
    line.append(name, price);
    summary.append(line);
  });

  document.getElementById('total').innerHTML = `${currency.format(total).replace(/\.00$/, '')}<span>.00</span>`;
  document.getElementById('selected-count').textContent = `${selectedCount} / 4`;
  document.getElementById('progress-fill').style.width = `${selectedCount * 25}%`;
  updateCompatibility();
}

function updateCompatibility() {
  const cpu = selectedPart('cpu');
  const ram = selectedPart('ram');
  const box = document.getElementById('compatibility');
  const ramMatches = cpu.memory === 'DDR4 or DDR5' || cpu.memory === ram.generation;

  box.classList.toggle('warning', !ramMatches);
  if (!ramMatches) {
    box.innerHTML = '<span class="compat-icon">⚠</span><strong>Memory mismatch:</strong> this processor setup expects ' + cpu.memory + ' memory, but the selected kit is ' + ram.generation + '. Choose a matching generation and motherboard.';
  } else {
    box.innerHTML = '<span class="compat-icon">✓</span><strong>Memory check looks good.</strong> Check that your motherboard supports the processor’s ' + cpu.socket + ' socket and selected memory. CPU and motherboard sockets must match.';
  }
}

document.getElementById('reset-build').addEventListener('click', () => {
  selectors.cpu.value = '0';
  selectors.gpu.value = '0';
  selectors.ram.value = '1';
  selectors.storage.value = '0';
  updateBuild();
});

populateSelects();
updateBuild();

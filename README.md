# Composite Materials Database

A sleek, modern web interface for hosting interactive material property cards for composite materials research. Designed for easy integration with FEA software like ABAQUS.

## ✨ Features

- **Glassmorphism Design**: Modern, translucent card design with blur effects
- **Interactive Material Cards**: Clickable cards that navigate to detailed pages
- **Dedicated Material Pages**: Each material has its own page with comprehensive data
- **Copy-Paste Ready**: One-click ABAQUS material definition copying
- **Responsive Layout**: Works seamlessly on desktop and mobile
- **Dynamic Loading**: Materials loaded from individual JSON files
- **Easy Customization**: Simple JSON-based material data structure
- **Export Functionality**: Export individual materials or entire database as JSON
- **Plot Placeholders**: Ready sections for adding custom visualizations and plots

## 📦 Included Materials

**Fiber Materials:**
- Carbon Fiber T300 (Toray) - Standard modulus
- Carbon Fiber T700 (Toray) - High strength
- E-Glass Fiber - Common reinforcement

**Matrix Materials:**
- Epoxy Resin 8552 (Hexcel) - Aerospace grade
- Epoxy Resin 977-3 (Cytec/Solvay) - F-35 qualified
- PEEK Thermoplastic - High-performance polymer

Each material includes:
- Mechanical properties (modulus, strength, Poisson's ratio, density)
- Thermal properties (CTE, conductivity, glass transition)
- Rheological properties (for matrices)
- Ready-to-use ABAQUS material definitions

## 🚀 Quick Start

### 1. Setup GitHub Repository

```bash
# Create a new repository on GitHub (e.g., composite-materials-db)
# Clone it locally
git clone https://github.com/YOUR-USERNAME/composite-materials-db.git
cd composite-materials-db

# Copy these files into your repository
# - index.html
# - styles.css
# - script.js
# - README.md

# Commit and push
git add .
git commit -m "Initial commit: Composite materials database"
git push origin main
```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select **main** branch
4. Click **Save**
5. Your site will be live at: `https://YOUR-USERNAME.github.io/composite-materials-db/`

## 📁 File Structure

```
composite-materials-db/
│
├── index.html              # Main HTML structure
├── styles.css              # Glassmorphism styling & animations
├── script.js               # Interactive functionality
├── material-loader.js      # Dynamic material loading system
├── material-detail.css     # Styling for detail pages
├── material-detail.js      # Detail page functionality
├── README.md               # Documentation (this file)
├── .gitignore             # Git ignore file
│
├── pages/                  # Material detail pages
│   └── material-detail.html    # Template for individual materials
│
└── materials/              # Material database folder
    ├── materials-index.json    # Catalog of all materials
    │
    ├── fibers/             # Fiber materials
    │   ├── carbon-fiber-t300.json
    │   ├── carbon-fiber-t700.json
    │   └── glass-fiber-e-glass.json
    │
    └── matrices/           # Matrix materials
        ├── epoxy-resin-8552.json
        ├── epoxy-resin-977-3.json
        └── peek-thermoplastic.json
```

## 🎨 Customization

### Adding New Materials

**Method 1: Create Individual JSON Files (Recommended)**

1. Create a new JSON file in the appropriate folder:
   - `materials/fibers/` for fiber materials
   - `materials/matrices/` for matrix materials

2. Follow the JSON structure (see example below)

3. Update `materials/materials-index.json` to include your new material

**Example Material JSON Structure:**
```json
{
  "id": "your-material-id",
  "name": "Your Material Name",
  "type": "Fiber",  // or "Matrix"
  "manufacturer": "Manufacturer Name",
  "description": "Brief description",
  "mechanical": {
    "E1": {
      "value": 230000,
      "unit": "MPa",
      "label": "E₁ (Longitudinal Modulus)",
      "display_value": "230 GPa"  // Optional: for custom display
    }
    // Add more properties...
  },
  "thermal": {
    // Thermal properties...
  },
  "rheological": {
    // Optional: For matrix materials
  },
  "abaqus": {
    "material_name": "Material_Name",
    "template": "*Material, name=Material_Name\n..."
  }
}
```

**Method 2: Edit Existing JSON Files**

Simply edit the JSON files in the `materials/` folder. The website will automatically load your changes on refresh.

### Materials Index File

The `materials/materials-index.json` file catalogs all available materials:

```json
{
  "materials": {
    "fibers": [
      {
        "id": "carbon-fiber-t300",
        "name": "Carbon Fiber T300",
        "manufacturer": "Toray",
        "file": "materials/fibers/carbon-fiber-t300.json",
        "category": "Carbon Fiber",
        "subcategory": "Standard Modulus"
      }
    ],
    "matrices": [ /* ... */ ]
  }
}
```

Add your new material to this index file for it to appear on the website.

### Adding Plots and Visualizations

Each material detail page includes a dedicated visualization section with placeholder areas for plots:

**Location**: `pages/material-detail.html` - Look for the `.visualization-section`

**How to add plots:**

1. The page includes three plot placeholder divs ready for your code
2. You can use plotting libraries like:
   - **Chart.js** - For 2D charts
   - **Plotly.js** - For interactive 3D plots
   - **D3.js** - For custom visualizations
   - **Canvas API** - For custom graphics

**Example: Adding a stress-strain plot**

```javascript
// In material-detail.js, add to populatePage():
function plotStressStrain(material) {
    // Get the plot container
    const plotArea = document.querySelector('.plot-placeholder:first-child .plot-area');
    
    // Clear placeholder text
    plotArea.innerHTML = '<canvas id="stress-strain-chart"></canvas>';
    
    // Create your plot using Chart.js, Plotly, etc.
    // Your plotting code here...
}
```

The visualization section is designed to be flexible - you can add as many plots as needed!

### Customizing Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    --accent-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    /* Change these to your preferred gradients */
}
```

### Custom Material Properties

For UMAT-specific properties, add new sections to your material cards:

```html
<div class="property-section">
    <h5>UMAT Parameters</h5>
    <div class="property-grid">
        <div class="property">
            <span class="prop-label">Custom Parameter 1</span>
            <span class="prop-value">Value</span>
        </div>
    </div>
</div>
```

## 🔧 Advanced Features (To Implement)

### Material Editor Interface
The current version has placeholder edit functionality. You can expand `editMaterial()` in `script.js` to create a modal editor:

```javascript
function editMaterial(materialId) {
    // Create modal with form inputs
    // Update materialsDatabase
    // Regenerate card HTML
    // Save to localStorage or export JSON
}
```

### Import Materials from JSON
```javascript
// Add file input to HTML
<input type="file" id="importJSON" accept=".json">

// Handle file upload
document.getElementById('importJSON').addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => loadMaterialsFromJSON(e.target.result);
    reader.readAsText(file);
});
```

### Rheological Properties
Add a new property section for rheological data:

```javascript
rheological: {
    viscosity: { value: 0.5, unit: 'Pa·s', label: 'η (Viscosity)' },
    shearRate: { value: 100, unit: '1/s', label: 'γ̇ (Shear Rate)' },
    // Add more...
}
```

## 📊 ABAQUS Integration

The ABAQUS code blocks are formatted for direct copy-paste into your `.inp` files. Simply:

1. Click the **"📋 Copy ABAQUS Code"** button
2. Paste into your ABAQUS input file
3. The material is ready to use in your model

### Example Usage in ABAQUS
```
** Include your material definitions
*Include, input=materials.inp

** Assign to section
*Solid Section, elset=Part1, material=CarbonFiber_T300
```

## 🎯 Roadmap

- [ ] Material search and filter functionality
- [ ] Advanced material editor with form validation
- [ ] Database integration (Firebase/MongoDB)
- [ ] Comparison tool for multiple materials
- [ ] PDF export for material datasheets
- [ ] Unit conversion tools
- [ ] Material property plotting
- [ ] User authentication for custom materials
- [ ] API for programmatic access

## 🤝 Contributing

This is a research group project. To contribute:

1. Fork the repository
2. Create a feature branch
3. Add your materials or improvements
4. Submit a pull request

## 📝 License

MIT License - feel free to use for your research group.

## 📧 Contact

For questions or collaborations, contact [Your Research Group Email]

---

**Built with** ❤️ **for composite materials research**

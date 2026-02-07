# Composite Materials Database - File Structure

```
composite-materials-db/
│
├── index.html                      # Main landing page with material cards
├── styles.css                      # Global styles (glassmorphism, animations)
├── script.js                       # Main page interactivity (copy, export functions)
├── material-loader.js              # Dynamic material loading system
├── material-detail.css             # Styles for detail pages
├── material-detail.js              # Detail page logic and data loading
├── .gitignore                      # Git ignore file
├── README.md                       # Documentation
├── materials_database.json         # Legacy combined database file
│
├── pages/                          # Material detail pages
│   ├── material-detail.html        # ⭐ Dynamic template (used by all materials)
│   └── carbon-fiber-t300.html      # Static example page (optional, not used)
│
└── materials/                      # Material database (JSON files)
    ├── materials-index.json        # Central catalog of all materials
    │
    ├── fibers/                     # Fiber materials folder
    │   ├── carbon-fiber-t300.json  # Carbon Fiber T300 data
    │   ├── carbon-fiber-t700.json  # Carbon Fiber T700 data
    │   └── glass-fiber-e-glass.json # E-Glass Fiber data
    │
    └── matrices/                   # Matrix materials folder
        ├── epoxy-resin-8552.json   # Hexcel 8552 Epoxy data
        ├── epoxy-resin-977-3.json  # Cytec 977-3 Epoxy data
        └── peek-thermoplastic.json # PEEK Thermoplastic data
```

## File Descriptions

### Root Level Files

**index.html**
- Main landing page
- Displays material cards in a grid layout
- Cards are clickable and open detail pages in new tabs
- Uses material-loader.js to dynamically populate cards

**styles.css**
- Glassmorphism design system
- Color gradients and animations
- Responsive layout styles
- Card hover effects (no parallax)

**script.js**
- Copy to clipboard functionality
- Material export functions
- Smooth scrolling navigation
- Utility functions for main page

**material-loader.js**
- Loads materials-index.json
- Fetches individual material JSON files
- Renders material cards dynamically
- Handles card click events → opens detail pages

**material-detail.css**
- Specific styles for material detail pages
- Property card layouts
- Code section styling
- Breadcrumb navigation styles

**material-detail.js**
- Reads URL parameters (?id=material-name)
- Loads corresponding JSON file
- Populates detail page with material data
- Handles copy, export, and print functions

### Pages Folder

**pages/material-detail.html**
- ⭐ **MAIN TEMPLATE** - Used for all materials
- Dynamic page that loads data based on URL parameter
- Example: `material-detail.html?id=carbon-fiber-t300`
- Shows: header, description, properties, ABAQUS code, plots

**pages/carbon-fiber-t300.html**
- Static example page (not currently used)
- Standalone page with hardcoded T300 data
- Can be used as reference or backup

### Materials Folder

**materials-index.json**
- Central catalog listing all available materials
- Groups materials by type (fibers, matrices)
- Contains metadata: id, name, manufacturer, file path
- Used by material-loader.js to build the main page

**materials/fibers/*.json**
- Individual JSON files for each fiber material
- Contains: properties, ABAQUS templates, descriptions
- Structure: mechanical, thermal, rheological sections

**materials/matrices/*.json**
- Individual JSON files for each matrix material
- Contains: properties, processing parameters, descriptions
- Structure: mechanical, thermal, rheological, processing sections

## How It Works

### 1. Main Page (index.html)
```
User visits index.html
    ↓
material-loader.js loads materials-index.json
    ↓
Loads all individual JSON files from materials/
    ↓
Renders material cards on the page
```

### 2. Detail Page Navigation
```
User clicks on a material card
    ↓
Opens pages/material-detail.html?id=carbon-fiber-t300 in new tab
    ↓
material-detail.js reads the ?id= parameter
    ↓
Loads materials/fibers/carbon-fiber-t300.json
    ↓
Populates the page with material data
```

### 3. Adding New Materials

To add a new material:

1. **Create JSON file**
   - Place in `materials/fibers/` or `materials/matrices/`
   - Name it: `your-material-id.json`
   - Follow the existing JSON structure

2. **Update Index**
   - Add entry to `materials/materials-index.json`
   - Include: id, name, manufacturer, file path

3. **Refresh Page**
   - The new material automatically appears
   - Clicking it opens the detail page
   - No HTML coding required!

## Files You Can Safely Delete

- `materials_database.json` - Legacy file, not used
- `pages/carbon-fiber-t300.html` - Static example, not used

## Files You Should Never Delete

- `pages/material-detail.html` - Core template for all materials
- `material-loader.js` - Essential for loading materials
- `material-detail.js` - Essential for detail pages
- `materials/materials-index.json` - Required for catalog
- All JSON files in `materials/fibers/` and `materials/matrices/`

## Current Material Count

- **Total Materials:** 6
  - **Fiber Materials:** 3 (T300, T700, E-Glass)
  - **Matrix Materials:** 3 (8552, 977-3, PEEK)

## Technologies Used

- Pure HTML5 / CSS3 / JavaScript (no frameworks)
- JSON for data storage
- URL parameters for routing
- Fetch API for loading JSON files
- CSS Grid and Flexbox for layout
- CSS backdrop-filter for glassmorphism

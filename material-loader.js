// Material Loader Script
// This script loads materials dynamically from the materials/ directory

class MaterialLoader {
    constructor() {
        this.materialsIndex = null;
        this.loadedMaterials = {};
    }

    // Load the materials index file
    async loadIndex() {
        try {
            const response = await fetch('materials/materials-index.json');
            this.materialsIndex = await response.json();
            console.log('Materials index loaded:', this.materialsIndex);
            return this.materialsIndex;
        } catch (error) {
            console.error('Error loading materials index:', error);
            return null;
        }
    }

    // Load a specific material JSON file
    async loadMaterial(filepath) {
        try {
            const response = await fetch(filepath);
            const material = await response.json();
            this.loadedMaterials[material.id] = material;
            return material;
        } catch (error) {
            console.error(`Error loading material from ${filepath}:`, error);
            return null;
        }
    }

    // Load all materials from the index
    async loadAllMaterials() {
        if (!this.materialsIndex) {
            await this.loadIndex();
        }

        const allMaterials = [
            ...this.materialsIndex.materials.fibers,
            ...this.materialsIndex.materials.matrices
        ];

        const promises = allMaterials.map(item => this.loadMaterial(item.file));
        await Promise.all(promises);

        console.log('All materials loaded:', this.loadedMaterials);
        return this.loadedMaterials;
    }

    // Get materials by type (fiber or matrix)
    getMaterialsByType(type) {
        return Object.values(this.loadedMaterials).filter(
            material => material.type.toLowerCase() === type.toLowerCase()
        );
    }

    // Get material by ID
    getMaterialById(id) {
        return this.loadedMaterials[id] || null;
    }

    // Render material card HTML
    renderMaterialCard(material) {
        const mechanicalProps = this.renderProperties(material.mechanical, 'mechanical');
        const thermalProps = this.renderProperties(material.thermal, 'thermal');
        const rheologicalProps = material.rheological 
            ? this.renderProperties(material.rheological, 'rheological') 
            : '';

        return `
            <div class="material-card" data-material="${material.id}" onclick="window.open('pages/material-detail.html?id=${material.id}', '_blank');" style="cursor: pointer;">
                <div class="card-header">
                    <h4>${material.name}</h4>
                    <span class="material-type">${material.type}</span>
                </div>
                
                <div class="card-body">
                    <div class="property-section">
                        <h5>Mechanical Properties</h5>
                        <div class="property-grid">
                            ${mechanicalProps}
                        </div>
                    </div>

                    <div class="property-section">
                        <h5>Thermal Properties</h5>
                        <div class="property-grid">
                            ${thermalProps}
                        </div>
                    </div>

                    ${rheologicalProps ? `
                    <div class="property-section">
                        <h5>Rheological Properties</h5>
                        <div class="property-grid">
                            ${rheologicalProps}
                        </div>
                    </div>
                    ` : ''}

                    <div class="abaqus-section">
                        <h5>ABAQUS Material Definition</h5>
                        <button class="copy-btn" onclick="event.stopPropagation(); copyToClipboard('abaqus-${material.id}')">
                            📋 Copy ABAQUS Code
                        </button>
                        <pre id="abaqus-${material.id}"><code>${material.abaqus.template}</code></pre>
                    </div>
                </div>

                <div class="card-footer">
                    <button class="edit-btn" onclick="event.stopPropagation(); editMaterial('${material.id}')">✏️ Edit</button>
                    <button class="export-btn" onclick="event.stopPropagation(); exportMaterial('${material.id}')">💾 Export JSON</button>
                </div>
            </div>
        `;
    }

    // Render individual properties
    renderProperties(properties, section) {
        return Object.entries(properties)
            .map(([key, prop]) => {
                const displayValue = prop.display_value || `${prop.value} ${prop.unit}`;
                return `
                    <div class="property">
                        <span class="prop-label">${prop.label}</span>
                        <span class="prop-value">${displayValue}</span>
                    </div>
                `;
            })
            .join('');
    }

    // Populate materials grid on page
    async populateMaterialsGrid(containerId, materialType) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const materials = this.getMaterialsByType(materialType);
        const html = materials.map(material => this.renderMaterialCard(material)).join('');
        
        container.innerHTML = html;
    }

    // Initialize and populate all grids
    async initialize() {
        await this.loadAllMaterials();
        
        // Populate fiber materials grid
        const fibersGrid = document.querySelector('#fibers .materials-grid');
        if (fibersGrid) {
            const fiberMaterials = this.getMaterialsByType('fiber');
            fibersGrid.innerHTML = fiberMaterials.map(m => this.renderMaterialCard(m)).join('');
        }

        // Populate matrix materials grid
        const matricesGrid = document.querySelector('#matrices .materials-grid');
        if (matricesGrid) {
            const matrixMaterials = this.getMaterialsByType('matrix');
            const cards = matrixMaterials.map(m => this.renderMaterialCard(m)).join('');
            const addButton = `
                <div class="add-material-card" onclick="addNewMaterial('matrix')">
                    <span class="plus-icon">+</span>
                    <p>Add New Matrix Material</p>
                </div>
            `;
            matricesGrid.innerHTML = cards + addButton;
        }

        // Add parallax effect to newly created cards
        this.addCardEffects();
    }

    // Add interactive effects to cards
    addCardEffects() {
        // No 3D parallax effects - keeping it clean and simple
        // The hover effects are handled purely by CSS
    }
}

// Global instance
const materialLoader = new MaterialLoader();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Initializing material loader...');
    await materialLoader.initialize();
    console.log('Material loader initialized successfully');
});

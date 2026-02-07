// Material Detail Page JavaScript

let currentMaterial = null;

// Get material ID from URL parameter
function getMaterialIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Load material data
async function loadMaterialData(materialId) {
    try {
        // First, load the index to find the material's file path
        const indexResponse = await fetch('../materials/materials-index.json');
        const index = await indexResponse.json();
        
        // Find the material in the index
        let materialFile = null;
        const allMaterials = [...index.materials.fibers, ...index.materials.matrices];
        const materialInfo = allMaterials.find(m => m.id === materialId);
        
        if (!materialInfo) {
            throw new Error('Material not found in index');
        }
        
        materialFile = materialInfo.file.replace('materials/', '../materials/');
        
        // Load the material JSON
        const materialResponse = await fetch(materialFile);
        currentMaterial = await materialResponse.json();
        
        return currentMaterial;
    } catch (error) {
        console.error('Error loading material:', error);
        document.querySelector('.material-header h1').textContent = 'Material Not Found';
        document.querySelector('.material-description').textContent = 'The requested material could not be loaded.';
        return null;
    }
}

// Populate page with material data
function populatePage(material) {
    if (!material) return;
    
    // Update page title
    document.getElementById('page-title').textContent = `${material.name} - CompositeLab`;
    
    // Update breadcrumb
    document.getElementById('breadcrumb-type').textContent = material.type + ' Materials';
    document.getElementById('breadcrumb-name').textContent = material.name;
    
    // Update header
    document.getElementById('material-name').textContent = material.name;
    document.getElementById('material-type').textContent = material.type;
    document.getElementById('manufacturer').textContent = material.manufacturer || 'Various';
    document.getElementById('description').textContent = material.description || 'No description available.';
    
    // Populate detailed description if available
    if (material.detailed_description) {
        document.getElementById('detailed-description-section').style.display = 'block';
        const descContent = document.getElementById('detailed-description');
        
        // Convert newlines to paragraphs and preserve formatting
        const formattedDesc = material.detailed_description
            .split('\n\n')
            .map(para => {
                // Handle bold text marked with **text**
                para = para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                return `<p>${para}</p>`;
            })
            .join('');
        
        descContent.innerHTML = formattedDesc;
    }
    
    // Populate mechanical properties
    populatePropertySection('mechanical-properties', material.mechanical);
    
    // Populate thermal properties
    populatePropertySection('thermal-properties', material.thermal);

    // Populate cure kinetics properties
    populatePropertySection('Cure Kinetics Parameters', material.cure_kinetics);
    
    // Populate rheological properties if available
    // if (material.rheological) {
    //     document.getElementById('rheological-section').style.display = 'block';
    //     populatePropertySection('rheological-properties', material.rheological);
    // }
    
    // Populate processing parameters if available
    if (material.processing) {
        document.getElementById('processing-section').style.display = 'block';
        populatePropertySection('processing-properties', material.processing);
    }
    
    // Populate ABAQUS code
    if (material.abaqus && material.abaqus.template) {
        document.getElementById('abaqus-code').textContent = material.abaqus.template;
    }
    
    // Populate references if available
    if (material.references && material.references.length > 0) {
        document.getElementById('references-section').style.display = 'block';
        const referencesList = document.getElementById('references-list');
        referencesList.innerHTML = material.references
            .map(ref => `<li>${ref}</li>`)
            .join('');
    }
    
    // Populate notes if available
    if (material.notes) {
        document.getElementById('notes-section').style.display = 'block';
        document.getElementById('notes-content').textContent = material.notes;
    }
}

// Populate a property section
function populatePropertySection(sectionId, properties) {
    const section = document.getElementById(sectionId);
    if (!section || !properties) return;
    
    section.innerHTML = Object.entries(properties)
        .map(([key, prop]) => {
            const displayValue = prop.display_value || `${prop.value} ${prop.unit}`;
            return `
                <div class="property-row">
                    <span class="property-label">${prop.label}</span>
                    <span class="property-value">${displayValue}</span>
                </div>
            `;
        })
        .join('');
}

// Copy ABAQUS code to clipboard
function copyAbaqusCode() {
    const codeElement = document.getElementById('abaqus-code');
    const textToCopy = codeElement.textContent;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '✓ Copied!';
        btn.style.background = 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy to clipboard.');
    });
}

// Copy all ABAQUS code
function copyAllAbaqus() {
    copyAbaqusCode();
}

// Export material as JSON
function exportMaterialJSON() {
    if (!currentMaterial) return;
    
    const dataStr = JSON.stringify(currentMaterial, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentMaterial.id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Print datasheet
function printDatasheet() {
    window.print();
}

// Initialize page
document.addEventListener('DOMContentLoaded', async () => {
    const materialId = getMaterialIdFromURL();
    
    if (!materialId) {
        document.querySelector('.material-header h1').textContent = 'No Material Specified';
        document.querySelector('.material-description').textContent = 'Please select a material from the homepage.';
        return;
    }
    
    const material = await loadMaterialData(materialId);
    populatePage(material);
});

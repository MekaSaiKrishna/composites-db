// Copy to clipboard function
function copyToClipboard(elementId) {
    const codeElement = document.getElementById(elementId);
    const textToCopy = codeElement.textContent;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        // Visual feedback
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
        alert('Failed to copy to clipboard. Please try selecting and copying manually.');
    });
}

// Edit material function
function editMaterial(materialId) {
    const material = materialLoader.getMaterialById(materialId);
    
    if (!material) {
        alert('Material not found!');
        return;
    }
    
    // Create a simple edit modal (you can expand this)
    const shouldEdit = confirm(`Edit material: ${material.name}?\n\nThis will open a more advanced editor in a future version. For now, you can edit the material data directly in the JSON files in the materials/ folder.`);
    
    if (shouldEdit) {
        console.log('Material data:', material);
        alert('Material editing interface coming soon! Check console for current data.');
    }
}

// Export material to JSON
function exportMaterial(materialId) {
    const material = materialLoader.getMaterialById(materialId);
    
    if (!material) {
        alert('Material not found!');
        return;
    }
    
    const dataStr = JSON.stringify(material, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${materialId}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Visual feedback
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '✓ Exported!';
    
    setTimeout(() => {
        btn.textContent = originalText;
    }, 2000);
}

// Add new material function
function addNewMaterial(type) {
    const materialName = prompt(`Enter name for new ${type} material:`);
    
    if (materialName) {
        alert(`Creating new ${type} material: ${materialName}\n\nFull material creation interface coming soon!`);
        console.log(`Would create ${type} material:`, materialName);
    }
}

// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Export all materials
function exportAllMaterials() {
    const allMaterials = materialLoader.loadedMaterials;
    const dataStr = JSON.stringify(allMaterials, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'all_materials.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

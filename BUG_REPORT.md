# Bug Report: composites-db

## BUG 1 (Critical) -- Invalid JSON: Missing Comma in `epoxy-resin-8552-extended.json`

**File:** `materials/matrices/epoxy-resin-8552-extended.json`, lines 6-7

The `"image"` field is missing a trailing comma before the `"description"` field:

```json
"image": "images/materials/epoxy-resin-8552.jpg"
"description": "Toughened epoxy resin system..."
```

This is a JSON syntax error. The `fetch` call for this material will fail to parse, meaning the Epoxy Resin 8552 material (the index points to this extended file) will never load.

---

## BUG 2 (Critical) -- ABAQUS Template Data Mismatch for Carbon Fibers

**Files:** `materials/fibers/carbon-fiber-t300.json`, line 113; `materials/fibers/carbon-fiber-t700.json`, line 113

The ABAQUS `*ELASTIC, TYPE=ENGINEERING CONSTANTS` card format is:

```
Line 1: E1, E2, E3, v12, v13, v23, G12, G13
Line 2: G23, Temperature
```

For T300, the template reads:

```
230000., 15000., 15000., 0.20, 0.25, 0.25, 27000., 7000.
7000., 298.
```

This gives v13=0.25 and G13=7000, but the JSON property data says v13=0.20 and G13=27000.

| Property | JSON value | ABAQUS template value |
|----------|-----------|----------------------|
| v13      | 0.20      | 0.25                 |
| G13      | 27000 MPa | 7000 MPa             |

The same mismatch exists for T700. Users who copy the ABAQUS code will get incorrect material definitions for FEA simulations.

---

## BUG 3 (High) -- Implicit `event` Object Usage

**Files:** `script.js`, lines 8, 63; `material-detail.js`, line 143

Functions `copyToClipboard`, `exportMaterial`, and `copyAbaqusCode` reference `event.target` without `event` being passed as a parameter. This relies on the deprecated implicit `window.event` global, which does not work in Firefox and is unreliable in strict mode.

---

## BUG 4 (High) -- `populatePropertySection` Called with Invalid Element ID

**File:** `material-detail.js`, line 84

```javascript
populatePropertySection('Cure Kinetics Parameters', material.cure_kinetics);
```

The first argument should be a DOM element ID, but `"Cure Kinetics Parameters"` matches no element in `material-detail.html`. The `document.getElementById()` call returns `null`, so cure kinetics data is never displayed.

---

## BUG 5 (High) -- Rheological Properties Section Commented Out

**File:** `material-detail.js`, lines 87-90

The code to populate rheological properties on the detail page is entirely commented out. Materials with rheological data (Epoxy 977-3, PEEK, Epoxy 8552) will never show these properties on their detail pages.

---

## BUG 6 (High) -- `loadAllMaterials()` Crashes if Index Fails to Load

**File:** `material-loader.js`, lines 37-44

If `loadIndex()` fails, `this.materialsIndex` remains `null`. The code then tries to access `this.materialsIndex.materials`, throwing an uncaught TypeError that crashes the entire page initialization with no user-visible error message.

---

## BUG 7 (Medium) -- Missing `#about` Navigation Target

**File:** `index.html`, line 18

The nav links to `#about`, but no element with `id="about"` exists in `index.html`. Clicking "About" does nothing.

---

## BUG 8 (Medium) -- No `fetch` Response Status Checks

**Files:** `material-loader.js`, lines 13-14, 26-27; `material-detail.js`, lines 15-16, 30-31

All `fetch` calls parse the response without checking `response.ok`. A 404 response will attempt to parse an HTML error page as JSON, producing confusing errors.

---

## BUG 9 (Medium) -- ABAQUS Template Comment Has Wrong Unit (1000x Error)

**File:** `materials/matrices/epoxy-resin-8552-extended.json`, line 165

The `modulus_development_template` says `Er0 = 4.67 GPa`, but the actual JSON property `E_relaxed` has a value of 4.67e6 Pa = 4.67 MPa. The template comment is off by a factor of 1000.

---

## BUG 10 (Low) -- Orphaned/Unused Material File

**Files:** `materials/matrices/epoxy-resin-8552.json`, `materials/materials-index.json`, line 37

The `materials-index.json` references `epoxy-resin-8552-extended.json` for the 8552 resin. The separate file `epoxy-resin-8552.json` is never referenced by the index and is dead code.

---

## BUG 11 (Low) -- "Add New Material" Button Missing for Fibers

**File:** `material-loader.js`, lines 149-171

The `initialize()` method only adds the "Add New Material" card to the matrices grid. The fibers grid has no equivalent button.

---

## Summary

| # | Severity | Description |
|---|----------|-------------|
| 1 | Critical | Invalid JSON -- missing comma in `epoxy-resin-8552-extended.json` |
| 2 | Critical | ABAQUS template has wrong v13 and G13 for T300/T700 |
| 3 | High | Implicit `event` object -- fails in Firefox |
| 4 | High | `populatePropertySection` called with invalid element ID |
| 5 | High | Rheological section code commented out |
| 6 | High | Null dereference crash if index fails to load |
| 7 | Medium | Nav links to `#about` which doesn't exist |
| 8 | Medium | No fetch response status checks |
| 9 | Medium | Template comment says GPa, actual value is MPa |
| 10 | Low | Orphaned `epoxy-resin-8552.json` never used |
| 11 | Low | "Add New Material" button only on matrices, not fibers |

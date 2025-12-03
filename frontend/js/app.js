// Configuration
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : '';

let authorsData = [];  // Store fetched authors data

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the dashboard
    loadDashboard();
    
    // Set up navigation event listeners
    document.getElementById('dashboard-link').addEventListener('click', function(e) {
        e.preventDefault();
        loadDashboard();
    });
    
    document.getElementById('publications-link').addEventListener('click', function(e) {
        e.preventDefault();
        loadPublications();
    });
    
    document.getElementById('citations-link').addEventListener('click', function(e) {
        e.preventDefault();
        loadCitations();
    });
    
    document.getElementById('about-link').addEventListener('click', function(e) {
        e.preventDefault();
        loadAbout();
    });
    
    // Populate faculty sidebar
    populateFacultySidebar();
});

// Populate the faculty sidebar with all mathematicians
function populateFacultySidebar() {
    const sidebarEl = document.getElementById('faculty-sidebar');
    sidebarEl.innerHTML = '<div class="text-muted px-3">Loading faculty...</div>';
    
    fetch(`${API_BASE_URL}/api/faculty`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            if (result.success && result.data) {
                authorsData = result.data;
                sidebarEl.innerHTML = '';
                
                result.data.forEach(author => {
                    const link = document.createElement('a');
                    link.href = '#';
                    link.textContent = author.name || author.id;
                    link.dataset.authorId = author.id;
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        loadAuthorProfile(author.id);
                    });
                    sidebarEl.appendChild(link);
                });
            } else {
                sidebarEl.innerHTML = '<div class="text-danger px-3">Failed to load faculty data</div>';
            }
        })
        .catch(error => {
            console.error("Error loading faculty data:", error);
            sidebarEl.innerHTML = `<div class="text-danger px-3">Error: ${error.message}</div>`;
        });
}

// Load the main dashboard view
function loadDashboard() {
    // Update active navigation link
    updateActiveNavLink('dashboard-link');
    
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '<div class="text-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>';
    
    fetch(`${API_BASE_URL}/api/faculty`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            if (!result.success || !result.data) {
                throw new Error('Invalid response format');
            }
            
            const authors = result.data;
            authorsData = authors;
            
            // Calculate aggregate metrics
            const totalPublications = authors.reduce((sum, author) => sum + (author.num_publications || 0), 0);
            const totalCitations = authors.reduce((sum, author) => {
                const citations = author.citations_by_year || [];
                return sum + citations.reduce((yearSum, year) => yearSum + (year.count || 0), 0);
            }, 0);
            const avgHIndex = authors.length > 0 
                ? Math.round(authors.reduce((sum, author) => sum + (author.metrics?.h_index || 0), 0) / authors.length)
                : 0;
        
            // Create dashboard HTML
            let html = `
                <div class="dashboard-container">
                    <h2 class="mb-4">Faculty Performance Overview</h2>
                    
                    <div class="row mb-4">
                        <div class="col-md-4">
                            <div class="card metric-card">
                                <div class="metric-value">${totalPublications}</div>
                                <div class="metric-label">Total Publications</div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card metric-card">
                                <div class="metric-value">${totalCitations.toLocaleString()}</div>
                                <div class="metric-label">Total Citations</div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card metric-card">
                                <div class="metric-value">${avgHIndex}</div>
                                <div class="metric-label">Average h-index</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row mb-4">
                        <div class="col-md-6">
                            <div class="card">
                                <div class="card-header">Publications by Year</div>
                                <div class="card-body">
                                    <div class="chart-container">
                                        <canvas id="publicationsChart"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="card">
                                <div class="card-header">Citations by Year</div>
                                <div class="card-body">
                                    <div class="chart-container">
                                        <canvas id="citationsChart"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-header">Top Faculty by h-index</div>
                                <div class="card-body">
                                    <div class="row">
            `;
            
            // Sort authors by h-index and get top 4
            const topAuthors = [...authors].sort((a, b) => 
                (b.metrics?.h_index || 0) - (a.metrics?.h_index || 0)
            ).slice(0, 4);
            
            topAuthors.forEach(author => {
                html += `
                    <div class="col-md-3 mb-3">
                        <div class="card author-card" onclick="loadAuthorProfile('${author.id}')">
                            <div class="card-body text-center">
                                <h5 class="card-title">${author.name}</h5>
                                <p class="card-text">h-index: ${author.metrics?.h_index || 0}</p>
                                <p class="card-text">Publications: ${author.num_publications || 0}</p>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            html += `
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            mainContent.innerHTML = html;
            
            // Create charts
            createPublicationsChart(authors);
            createCitationsChart(authors);
        })
        .catch(error => {
            console.error("Error loading dashboard:", error);
            mainContent.innerHTML = `<div class="alert alert-danger">Error loading dashboard: ${error.message}</div>`;
        });
}

// Load an author's profile
function loadAuthorProfile(authorId) {
    // Update active navigation link
    updateActiveNavLink(null);
    
    const author = authorsData.find(a => a.id === authorId);
    if (!author) {
        console.error("Author not found:", authorId);
        return;
    }
    
    const mainContent = document.getElementById('main-content');
    
    let html = `
        <div class="profile-header">
            <div class="row">
                <div class="col-md-3 text-center">
                    <img src="https://via.placeholder.com/150" class="profile-img" alt="${author.name}">
                </div>
                <div class="col-md-9">
                    <h2>${author.name}</h2>
                    <p>zbMATH ID: ${author.zbmath_author_id || author.id}</p>
                    <div class="mt-3">
                        <a href="https://zbmath.org/authors/${author.zbmath_author_id || author.id}" target="_blank" class="btn btn-sm btn-outline-light me-2">zbMATH Profile</a>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row mb-4">
            <div class="col-md-3">
                <div class="card">
                    <div class="card-header">Metrics</div>
                    <div class="card-body">
                        <div class="d-flex justify-content-between mb-2">
                            <span>h-index:</span>
                            <span class="fw-bold">${author.metrics?.h_index || 0}</span>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                            <span>g-index:</span>
                            <span class="fw-bold">${author.metrics?.g_index || 0}</span>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                            <span>Publications:</span>
                            <span class="fw-bold">${author.num_publications || 0}</span>
                        </div>
                        <div class="d-flex justify-content-between">
                            <span>Co-authors:</span>
                            <span class="fw-bold">${author.num_co_authors || 0}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-9">
                <div class="card">
                    <div class="card-header">Publications by Year</div>
                    <div class="card-body">
                        <div class="chart-container" style="height: 250px;">
                            <canvas id="authorPublicationsChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">Recent Publications</div>
                    <div class="card-body">
    `;
    
    const publications = author.publications || [];
    if (publications.length > 0) {
        publications.slice(0, 10).forEach(pub => {
            html += `
                <div class="publication-item">
                    <h6>${pub.title || 'Unknown Title'}</h6>
                    <p class="mb-1"><small class="text-muted">${pub.year || 'N/A'} | ${pub.source || 'Unknown Source'}</small></p>
                    <p class="mb-0"><small>${pub.abstract || 'No abstract available'}</small></p>
                </div>
            `;
        });
    } else {
        html += '<p class="text-muted">No publications found</p>';
    }
    
    html += `
                    </div>
                </div>
            </div>
        </div>
    `;
    
    mainContent.innerHTML = html;
    
    // Create author-specific chart
    if (author.publications_by_year && author.publications_by_year.length > 0) {
        createAuthorPublicationsChart(author);
    }
}

// Create publications chart
function createPublicationsChart(authors) {
    const canvas = document.getElementById('publicationsChart');
    if (!canvas) return;
    
    // Aggregate publications by year
    const yearData = {};
    authors.forEach(author => {
        (author.publications_by_year || []).forEach(item => {
            yearData[item.year] = (yearData[item.year] || 0) + (item.count || 0);
        });
    });
    
    const years = Object.keys(yearData).sort();
    const counts = years.map(year => yearData[year]);
    
    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: years,
            datasets: [{
                label: 'Publications',
                data: counts,
                backgroundColor: '#007bff',
                borderColor: '#0056b3',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Create citations chart
function createCitationsChart(authors) {
    const canvas = document.getElementById('citationsChart');
    if (!canvas) return;
    
    // Aggregate citations by year
    const yearData = {};
    authors.forEach(author => {
        (author.citations_by_year || []).forEach(item => {
            yearData[item.year] = (yearData[item.year] || 0) + (item.count || 0);
        });
    });
    
    const years = Object.keys(yearData).sort();
    const counts = years.map(year => yearData[year]);
    
    new Chart(canvas, {
        type: 'line',
        data: {
            labels: years,
            datasets: [{
                label: 'Citations',
                data: counts,
                borderColor: '#28a745',
                backgroundColor: 'rgba(40, 167, 69, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Create author-specific publications chart
function createAuthorPublicationsChart(author) {
    const canvas = document.getElementById('authorPublicationsChart');
    if (!canvas) return;
    
    const pubData = author.publications_by_year || [];
    const years = pubData.map(item => item.year);
    const counts = pubData.map(item => item.count || 0);
    
    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: years,
            datasets: [{
                label: 'Publications',
                data: counts,
                backgroundColor: '#007bff',
                borderColor: '#0056b3',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Load publications view
function loadPublications() {
    updateActiveNavLink('publications-link');
    const mainContent = document.getElementById('main-content');
    
    let html = '<h2 class="mb-4">All Publications</h2>';
    html += '<div class="row">';
    
    authorsData.forEach(author => {
        const pubs = author.publications || [];
        html += `
            <div class="col-md-6 mb-4">
                <div class="card">
                    <div class="card-header">${author.name}</div>
                    <div class="card-body">
                        <p class="text-muted">Total: ${pubs.length} publications</p>
                        ${pubs.slice(0, 5).map(pub => `
                            <div class="publication-item">
                                <h6>${pub.title || 'Unknown'}</h6>
                                <small class="text-muted">${pub.year || 'N/A'}</small>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    mainContent.innerHTML = html;
}

// Load citations view
function loadCitations() {
    updateActiveNavLink('citations-link');
    const mainContent = document.getElementById('main-content');
    
    let html = '<h2 class="mb-4">Citations Analysis</h2>';
    html += '<div class="row">';
    
    authorsData.forEach(author => {
        const citations = author.citations_by_year || [];
        const totalCitations = citations.reduce((sum, item) => sum + (item.count || 0), 0);
        
        html += `
            <div class="col-md-6 mb-4">
                <div class="card">
                    <div class="card-header">${author.name}</div>
                    <div class="card-body">
                        <p class="text-muted">Total Citations: <strong>${totalCitations}</strong></p>
                        <p class="text-muted">h-index: <strong>${author.metrics?.h_index || 0}</strong></p>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    mainContent.innerHTML = html;
}

// Load about view
function loadAbout() {
    updateActiveNavLink('about-link');
    const mainContent = document.getElementById('main-content');
    
    const html = `
        <div class="card">
            <div class="card-header">About Faculty Dashboard</div>
            <div class="card-body">
                <h5>Overview</h5>
                <p>This dashboard displays academic performance metrics for faculty members, including publications, citations, and collaboration data sourced from zbMATH.</p>
                
                <h5 class="mt-4">Data Source</h5>
                <p>All data is retrieved from the <strong>zbMATH Open</strong> REST API, which provides comprehensive information about mathematical publications and authors.</p>
                
                <h5 class="mt-4">Metrics</h5>
                <ul>
                    <li><strong>h-index:</strong> A measure of both the productivity and citation impact of publications</li>
                    <li><strong>g-index:</strong> An alternative metric that gives more weight to highly-cited publications</li>
                    <li><strong>Publications:</strong> Total number of publications by the author</li>
                    <li><strong>Citations:</strong> Total number of citations received</li>
                </ul>
                
                <h5 class="mt-4">Technology</h5>
                <p>Built with Flask (backend), JavaScript (frontend), and Chart.js for visualization.</p>
            </div>
        </div>
    `;
    
    mainContent.innerHTML = html;
}

// Update active navigation link
function updateActiveNavLink(linkId) {
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.classList.remove('active');
    });
    if (linkId) {
        document.getElementById(linkId).classList.add('active');
    }
}

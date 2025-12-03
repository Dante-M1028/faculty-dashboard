// Main application JavaScript for the faculty dashboard
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
    sidebarEl.innerHTML = '';
    
    fetch("http://localhost:5000/api/faculty")  // modification1
        .then(response => response.json())
        .then(authors => {
            authors.forEach(author => {
                const link = document.createElement('a');
                link.href = '#';
                link.textContent = author.name;
                link.dataset.authorId = author.id;
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    loadAuthorProfile(author.id);
                });
                sidebarEl.appendChild(link);
            });
        })
        .catch(error => console.error("Error loading faculty data:", error));
}

// Load the main dashboard view
function loadDashboard() {
    // Update active navigation link
    updateActiveNavLink('dashboard-link');
    
    const mainContent = document.getElementById('main-content');
    
    fetch("http://localhost:5000/api/faculty")  // modification2
    .then(response => response.json())
    .then(authors => {
        // modification2
        const totalPublications = authors.reduce((sum, author) => sum + author.num_publications, 0);
        const totalCitations = authors.reduce((sum, author) => sum + author.citations_by_year.reduce((yearSum, year) => yearSum + year.count, 0), 0);
        const avgHIndex = Math.round(authors.reduce((sum, author) => sum + author.metrics.h_index, 0) / authors.length);
    
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
    const topAuthors = [...sampleData.authors].sort((a, b) => b.metrics.h_index - a.metrics.h_index);
    
    topAuthors.forEach(author => {
        html += `
            <div class="col-md-3 mb-3">
                <div class="card author-card" onclick="loadAuthorProfile(${author.author_id})">
                    <div class="card-body text-center">
                        <h5 class="card-title">${author.name}</h5>
                        <p class="card-text">h-index: ${author.metrics.h_index}</p>
                        <p class="card-text">Publications: ${author.num_publications}</p>
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
    createPublicationsChart();
    createCitationsChart();
}

// Load an author's profile
function loadAuthorProfile(authorId) {
    // Update active navigation link
    updateActiveNavLink(null);
    
    const author = sampleData.authors.find(a => a.author_id === authorId);
    if (!author) return;
    
    const mainContent = document.getElementById('main-content');
    
    let html = `
        <div class="profile-header">
            <div class="row">
                <div class="col-md-3 text-center">
                    <img src="https://via.placeholder.com/150" class="profile-img" alt="${author.name}">
                </div>
                <div class="col-md-9">
                    <h2>${author.name}</h2>
                    <p>Published as: ${author.published_as}</p>
                    <div class="mt-3">
                        <a href="${author.external_links.google_scholar}" target="_blank" class="btn btn-sm btn-outline-light me-2">Google Scholar</a>
                        <a href="${author.external_links.mathdb}" target="_blank" class="btn btn-sm btn-outline-light me-2">zbMATH</a>
                        <a href="${author.external_links.researchgate}" target="_blank" class="btn btn-sm btn-outline-light me-2">ResearchGate</a>
                        <a href="${author.external_links.personal}" target="_blank" class="btn btn-sm btn-outline-light">Personal Website</a>
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
                            <span class="fw-bold">${author.metrics.h_index}</span>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                            <span>g-index:</span>
                            <span class="fw-bold">${author.metrics.g_index}</span>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                            <span>Publications:</span>
                            <span class="fw-bold">${author.num_publications}</span>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                            <span>Co-authors:</span>
                            <span class="fw-bold">${author.num_co_authors}</span>
                        </div>
                        <div class="d-flex justify-content-between">
                            <span>Joint Publications:</span>
                            <span class="fw-bold">${author.num_joint_publications}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-9">
                <div class="card">
                    <div class="card-header">
                        <ul class="nav nav-tabs card-header-tabs" id="authorTabs" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="publications-tab" data-bs-toggle="tab" data-bs-target="#publications-content" type="button" role="tab">Publications</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="citations-tab" data-bs-toggle="tab" data-bs-target="#citations-content" type="button" role="tab">Citations</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="coauthors-tab" data-bs-toggle="tab" data-bs-target="#coauthors-content" type="button" role="tab">Co-Authors</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="cv-tab" data-bs-toggle="tab" data-bs-target="#cv-content" type="button" role="tab">CV</button>
                            </li>
                        </ul>
                    </div>
                    <div class="card-body">
                        <div class="tab-content" id="authorTabContent">
                            <div class="tab-pane fade show active" id="publications-content" role="tabpanel">
                                <div class="chart-container mb-4">
                                    <canvas id="authorPublicationsChart"></canvas>
                                </div>
                                <h5>Recent Publications</h5>
                                <div class="list-group">
    `;
    
    author.publications.forEach(pub => {
        html += `
            <div class="publication-item">
                <h6>${pub.title}</h6>
                <p class="mb-1">${pub.journal_name}, ${pub.year}</p>
                <p class="mb-0">Citations: <span class="citation-count">${pub.citation_count}</span></p>
            </div>
        `;
    });
    
    html += `
                                </div>
                            </div>
                            <div class="tab-pane fade" id="citations-content" role="tabpanel">
                                <div class="chart-container">
                                    <canvas id="authorCitationsChart"></canvas>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="coauthors-content" role="tabpanel">
                                <h5>Frequent Co-Authors</h5>
                                <div class="d-flex flex-wrap mt-3">
    `;
    
    author.coauthors.forEach(coauthor => {
        html += `
            <div class="co-author-badge">
                ${coauthor.name} (${coauthor.num_joint_publications})
            </div>
        `;
    });
    
    html += `
                                </div>
                            </div>
                            <div class="tab-pane fade" id="cv-content" role="tabpanel">
                                <div class="alert alert-info">
                                    <i class="bi bi-info-circle me-2"></i>
                                    CV information is available for download or viewing on the author's personal website.
                                </div>
                                <a href="${author.external_links.personal}" target="_blank" class="btn btn-primary">
                                    <i class="bi bi-file-earmark-text me-2"></i>View CV on Personal Website
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    mainContent.innerHTML = html;
    
    // Create author-specific charts
    createAuthorPublicationsChart(author);
    createAuthorCitationsChart(author);
}

// Load publications view
function loadPublications() {
    // Update active navigation link
    updateActiveNavLink('publications-link');
    
    const mainContent = document.getElementById('main-content');
    
    let html = `
        <div class="publications-container">
            <h2 class="mb-4">Publications</h2>
            
            <div class="card mb-4">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="input-group search-bar">
                                <input type="text" class="form-control" placeholder="Search publications...">
                                <button class="btn btn-outline-secondary" type="button">Search</button>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <select class="form-select">
                                <option selected>Filter by year</option>
                                <option>2024</option>
                                <option>2023</option>
                                <option>2022</option>
                                <option>2021</option>
                                <option>2020</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <select class="form-select">
                                <option selected>Sort by</option>
                                <option>Year (newest first)</option>
                                <option>Year (oldest first)</option>
                                <option>Citations (highest first)</option>
                                <option>Citations (lowest first)</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-body">
                    <div class="list-group">
    `;
    
    // Get all publications from all authors
    const allPublications = [];
    sampleData.authors.forEach(author => {
        author.publications.forEach(pub => {
            allPublications.push({
                ...pub,
                author_name: author.name,
                author_id: author.author_id
            });
        });
    });
    
    // Sort by year (newest first)
    allPublications.sort((a, b) => b.year - a.year);
    
    allPublications.forEach(pub => {
        html += `
            <div class="publication-item">
                <h5>${pub.title}</h5>
                <p class="mb-1">
                    <a href="#" onclick="loadAuthorProfile(${pub.author_id}); return false;">${pub.author_name}</a> | 
                    ${pub.journal_name}, ${pub.year}
                </p>
                <p class="mb-0">Citations: <span class="citation-count">${pub.citation_count}</span></p>
            </div>
        `;
    });
    
    html += `
                    </div>
                </div>
            </div>
        </div>
    `;
    
    mainContent.innerHTML = html;
}

// Load citations view
function loadCitations() {
    // Update active navigation link
    updateActiveNavLink('citations-link');
    
    const mainContent = document.getElementById('main-content');
    
    let html = `
        <div class="citations-container">
            <h2 class="mb-4">Citations</h2>
            
            <div class="row mb-4">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">Citations by Author</div>
                        <div class="card-body">
                            <div class="chart-container">
                                <canvas id="citationsByAuthorChart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">h-index Comparison</div>
                        <div class="card-body">
                            <div class="chart-container">
                                <canvas id="hIndexChart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">Citation Metrics</div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Author</th>
                                    <th>Total Citations</th>
                                    <th>h-index</th>
                                    <th>g-index</th>
                                    <th>Citations (Last 5 Years)</th>
                                </tr>
                            </thead>
                            <tbody>
    `;
    
    sampleData.authors.forEach(author => {
        const totalCitations = author.citations_by_year.reduce((sum, year) => sum + year.count, 0);
        const last5YearsCitations = author.citations_by_year.slice(-5).reduce((sum, year) => sum + year.count, 0);
        
        html += `
            <tr>
                <td><a href="#" onclick="loadAuthorProfile(${author.author_id}); return false;">${author.name}</a></td>
                <td>${totalCitations.toLocaleString()}</td>
                <td>${author.metrics.h_index}</td>
                <td>${author.metrics.g_index}</td>
                <td>${last5YearsCitations.toLocaleString()}</td>
            </tr>
        `;
    });
    
    html += `
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    mainContent.innerHTML = html;
    
    // Create citation charts
    createCitationsByAuthorChart();
    createHIndexChart();
}

// Load about view
function loadAbout() {
    // Update active navigation link
    updateActiveNavLink('about-link');
    
    const mainContent = document.getElementById('main-content');
    
    let html = `
        <div class="about-container">
            <h2 class="mb-4">About This Dashboard</h2>
            
            <div class="card mb-4">
                <div class="card-body">
                    <h5>Purpose</h5>
                    <p>This faculty performance dashboard was created to help university deans evaluate the overall performance of faculty members. It provides comprehensive metrics and visualizations for tracking academic output, research impact, and collaboration networks.</p>
                    
                    <h5>Data Sources</h5>
                    <p>The dashboard aggregates data from multiple sources including:</p>
                    <ul>
                        <li>Google Scholar profiles</li>
                        <li>zbMATH (Mathematics Database)</li>
                        <li>ResearchGate profiles</li>
                        <li>Faculty CVs</li>
                    </ul>
                    
                    <h5>Features</h5>
                    <ul>
                        <li>Comprehensive faculty profiles with publication history and metrics</li>
                        <li>Citation tracking and visualization</li>
                        <li>Co-author network analysis</li>
                        <li>Publication categorization and filtering</li>
                        <li>Comparative performance metrics</li>
                    </ul>
                    
                    <h5>Version</h5>
                    <p>Current version: 1.0.0</p>
                    <p>Last updated: April 2025</p>
                </div>
            </div>
        </div>
    `;
    
    mainContent.innerHTML = html;
}

// Update active navigation link
function updateActiveNavLink(linkId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    if (linkId) {
        document.getElementById(linkId).classList.add('active');
    }
}

// Create publications chart for dashboard
function createPublicationsChart() {
    const ctx = document.getElementById('publicationsChart').getContext('2d');
    
    // Aggregate publication counts by year across all authors
    const publicationsByYear = {};
    sampleData.authors.forEach(author => {
        author.publications_by_year.forEach(item => {
            if (!publicationsByYear[item.year]) {
                publicationsByYear[item.year] = 0;
            }
            publicationsByYear[item.year] += item.count;
        });
    });
    
    // Sort years and prepare data for chart
    const years = Object.keys(publicationsByYear).sort();
    const counts = years.map(year => publicationsByYear[year]);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: years,
            datasets: [{
                label: 'Publications',
                data: counts,
                backgroundColor: 'rgba(54, 162, 235, 0.7)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Publications'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year'
                    }
                }
            }
        }
    });
}

// Create citations chart for dashboard
function createCitationsChart() {
    const ctx = document.getElementById('citationsChart').getContext('2d');
    
    // Aggregate citation counts by year across all authors
    const citationsByYear = {};
    sampleData.authors.forEach(author => {
        author.citations_by_year.forEach(item => {
            if (!citationsByYear[item.year]) {
                citationsByYear[item.year] = 0;
            }
            citationsByYear[item.year] += item.count;
        });
    });
    
    // Sort years and prepare data for chart
    const years = Object.keys(citationsByYear).sort();
    const counts = years.map(year => citationsByYear[year]);
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [{
                label: 'Citations',
                data: counts,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                tension: 0.1,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Citations'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year'
                    }
                }
            }
        }
    });
}

// Create publications chart for author profile
function createAuthorPublicationsChart(author) {
    const ctx = document.getElementById('authorPublicationsChart').getContext('2d');
    
    // Sort years and prepare data for chart
    const years = author.publications_by_year.map(item => item.year).sort();
    const counts = years.map(year => {
        const item = author.publications_by_year.find(i => i.year === year);
        return item ? item.count : 0;
    });
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: years,
            datasets: [{
                label: 'Publications',
                data: counts,
                backgroundColor: 'rgba(54, 162, 235, 0.7)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Publications'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year'
                    }
                }
            }
        }
    });
}

// Create citations chart for author profile
function createAuthorCitationsChart(author) {
    const ctx = document.getElementById('authorCitationsChart').getContext('2d');
    
    // Sort years and prepare data for chart
    const years = author.citations_by_year.map(item => item.year).sort();
    const counts = years.map(year => {
        const item = author.citations_by_year.find(i => i.year === year);
        return item ? item.count : 0;
    });
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [{
                label: 'Citations',
                data: counts,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                tension: 0.1,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Citations'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year'
                    }
                }
            }
        }
    });
}

// Create citations by author chart
function createCitationsByAuthorChart() {
    const ctx = document.getElementById('citationsByAuthorChart').getContext('2d');
    
    // Calculate total citations for each author
    const authorNames = sampleData.authors.map(author => author.name);
    const citationCounts = sampleData.authors.map(author => 
        author.citations_by_year.reduce((sum, year) => sum + year.count, 0)
    );
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: authorNames,
            datasets: [{
                label: 'Total Citations',
                data: citationCounts,
                backgroundColor: 'rgba(75, 192, 192, 0.7)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Citations'
                    }
                }
            }
        }
    });
}

// Create h-index comparison chart
function createHIndexChart() {
    const ctx = document.getElementById('hIndexChart').getContext('2d');
    
    const authorNames = sampleData.authors.map(author => author.name);
    const hIndices = sampleData.authors.map(author => author.metrics.h_index);
    const gIndices = sampleData.authors.map(author => author.metrics.g_index);
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: authorNames,
            datasets: [
                {
                    label: 'h-index',
                    data: hIndices,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(54, 162, 235, 1)'
                },
                {
                    label: 'g-index',
                    data: gIndices,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(255, 99, 132, 1)'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true
                }
            }
        }
    });
}

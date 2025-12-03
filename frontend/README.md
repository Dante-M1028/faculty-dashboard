# Faculty Performance Dashboard 📊

A modern, interactive web application for visualizing faculty performance metrics, publications, citations, and academic achievements.

![Dashboard Preview](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?logo=bootstrap&logoColor=white)

## 🌟 Features

- **📈 Dashboard Overview**: Real-time metrics showing total publications, citations, and average h-index
- **📊 Interactive Charts**: Visual representation of publications and citations by year using Chart.js
- **👥 Faculty Profiles**: Detailed profiles for each faculty member with their academic achievements
- **🔍 Easy Navigation**: Intuitive sidebar and top navigation for seamless browsing
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **⚡ Fast & Lightweight**: No backend required - runs entirely in the browser

## 🚀 Live Demo

[View Live Demo](https://your-username.github.io/faculty-dashboard/)

## 📸 Screenshots

### Dashboard View
The main dashboard displays aggregate metrics and charts for all faculty members.

### Faculty Profile View
Click any faculty member to view their detailed profile, publications, and co-authors.

## 🛠️ Technologies Used

- **HTML5** - Structure and content
- **CSS3** - Styling with Bootstrap 5.3.0
- **JavaScript (ES6+)** - Application logic
- **Chart.js** - Data visualization
- **Bootstrap 5** - Responsive UI framework
- **Bootstrap Icons** - Icon library

## 📦 Installation

### Option 1: Clone and Run Locally

```bash
# Clone the repository
git clone https://github.com/your-username/faculty-dashboard.git

# Navigate to the project directory
cd faculty-dashboard

# Start a local server (Python 3)
python3 -m http.server 8080

# Or use Node.js http-server
npx http-server -p 8080
```

Then open your browser to `http://localhost:8080`

### Option 2: Deploy to GitHub Pages

1. Fork this repository
2. Go to **Settings** → **Pages**
3. Under **Source**, select `main` branch
4. Click **Save**
5. Your site will be live at `https://your-username.github.io/faculty-dashboard/`

### Option 3: Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-username/faculty-dashboard)

### Option 4: Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/faculty-dashboard)

## 📁 Project Structure

```
faculty-dashboard/
├── index.html              # Main HTML file
├── js/
│   ├── app.js             # Main application JavaScript
│   └── consolidated_data.js # Faculty data and metrics
├── img/
│   └── avatar.png         # Default avatar image
├── README.md              # Project documentation
├── LICENSE                # MIT License
└── .gitignore            # Git ignore rules
```

## 🎨 Customization

### Adding New Faculty Members

Edit `js/consolidated_data.js` and add a new author object:

```javascript
{
  author_id: 8,
  name: "Your Name",
  zbmath_author_id: "your.name",
  published_as: "Name, Y.",
  external_links: {
    google_scholar: "https://scholar.google.com/...",
    mathdb: "https://zbmath.org/...",
    researchgate: "https://www.researchgate.net/...",
    personal: "https://yourwebsite.com"
  },
  num_publications: 100,
  num_reviews: 50,
  num_co_authors: 30,
  num_joint_publications: 60,
  metrics: {
    h_index: 25,
    g_index: 50
  },
  publications_by_year: [...],
  citations_by_year: [...],
  publications: [...],
  coauthors: [...]
}
```

### Changing Colors

Modify the CSS in `index.html` within the `<style>` tag to customize colors and styling.

## 🌐 Browser Compatibility

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

## 🙏 Acknowledgments

- Bootstrap team for the excellent UI framework
- Chart.js for the visualization library
- All contributors and users of this project

---

**Made with ❤️ for the academic community**

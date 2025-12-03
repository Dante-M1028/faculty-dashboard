# Contributing to Faculty Performance Dashboard

Thank you for your interest in contributing to the Faculty Performance Dashboard! This document provides guidelines for contributing to this project.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:
- A clear title and description
- Steps to reproduce the issue
- Expected behavior vs actual behavior
- Screenshots if applicable
- Browser and OS information

### Suggesting Enhancements

Enhancement suggestions are welcome! Please open an issue with:
- A clear title and description
- The motivation for the enhancement
- Examples of how it would work
- Any relevant mockups or examples

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following the code style guidelines below
3. **Test your changes** thoroughly in multiple browsers
4. **Update documentation** if you're adding new features
5. **Submit a pull request** with a clear description of your changes

## 💻 Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/faculty-dashboard.git

# Navigate to the directory
cd faculty-dashboard

# Start a local server
python3 -m http.server 8080
```

## 📝 Code Style Guidelines

### JavaScript
- Use ES6+ features
- Use `const` and `let` instead of `var`
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### HTML
- Use semantic HTML5 elements
- Maintain proper indentation (2 spaces)
- Add appropriate ARIA labels for accessibility

### CSS
- Follow Bootstrap conventions
- Use meaningful class names
- Keep styles organized and commented

## 🧪 Testing

Before submitting a PR, please test your changes:
- Test in Chrome, Firefox, and Safari
- Test responsive design on mobile devices
- Verify all charts render correctly
- Check console for JavaScript errors

## 📋 Commit Message Guidelines

Use clear and descriptive commit messages:

```
Add feature: Brief description

Detailed explanation of what changed and why.
```

Examples:
- `Fix: Correct chart rendering on mobile devices`
- `Add: New faculty member profile template`
- `Update: Improve dashboard loading performance`

## 🎯 Priority Areas

We especially welcome contributions in these areas:
- Accessibility improvements
- Performance optimizations
- Additional chart types and visualizations
- Mobile responsiveness enhancements
- Documentation improvements

## ❓ Questions?

If you have questions, feel free to:
- Open an issue for discussion
- Reach out to the maintainers

Thank you for contributing! 🙏

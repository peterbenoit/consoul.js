
# Consoul.js Documentation

## What is **Consoul.js**?

**Consoul.js** is your personal console logging superhero. 🦸‍♂️ Whether you're debugging or trying to track how your code runs, **Consoul.js** takes ordinary logging and transforms it into a fully equipped, feature-packed experience. From log levels to styling, log history, and even browser output, **Consoul.js** has you covered!

### Why use **Consoul.js**?
Logging in JavaScript is so much more than just `console.log("Hello World")`. Here’s why **Consoul.js** can level up your logging game:

- **🎚 Custom Log Levels:** Control what gets logged based on importance. Set it to DEBUG, INFO, WARN, or ERROR and see just the logs you need.

- **🎨 Styled Logs:** Want to add a little flair to your logs? Customize them with icons and styles (e.g., ✅ for success, ⚠️ for warnings, ❌ for errors).

- **📜 Log History & Count:** Keep track of every log made during your session. Need to look back on what happened? **Consoul.js** has you covered with a full log history and the total log count.

- **⏱ Performance Monitoring:** Easily benchmark your code by measuring how long functions take to run. Perfect for tracking down bottlenecks and optimizing performance.

---

### 🚀 Installation

Just clone this repo and start using it! 🎉


---

### 📖 Usage Examples

```javascript
// Enable browser output (optional)
consoul.setBrowserOutput(true, '#custom-console');

// Log messages at different levels
consoul.log("This is a standard log message.");
consoul.debug("This is a debug message.");
consoul.warn("This is a warning message.");
consoul.error("This is an error message.");

// Fancy logging
consoul.fancylog("Fancy log message with custom styling!", "Additional details here.");

// Benchmarking example
consoul.benchmark(() => {
    // Code you want to measure
}, "Performance Test");
```
Additional advanced features can be found on [Codepen](https://codepen.io/peterbenoit/pen/abevWMz "Codepen") 🔗

---

### 🎯 Key Features

- **Log Levels**: Filter logs by severity.
- **Styled Logs**: Add icons and colors to make logs pop.
- **Log History**: Keep track of all log messages and retrieve them when needed.
- **Conditional Logging**: Log only when a specific condition is met.
- **Function Benchmarking**: Time how long a function takes to execute.

---

### 🧑‍💻 Contribution

Feel free to contribute to **Consoul.js**! Fork the repo, create a branch, and submit a PR with improvements or bug fixes. We welcome your awesome ideas.

---

### License

**Consoul.js** is open-source and licensed under the MIT License.


const consoul = (function () {
	const originalLog = console.log;
	const originalTable = console.table;
	const originalGroup = console.group;
	const originalGroupEnd = console.groupEnd;

	const logHistory = [];
	let logCount = 0;
	const logLevels = ["DEBUG", "INFO", "WARN", "ERROR"];
	let currentLogLevel = "DEBUG";
	const ENV = "development";

	let browserOutputEnabled = false;
	let outputElementSelector = "";

	const emojis = {
		success: "✅",
		error: "❌",
		warning: "⚠️",
		info: "ℹ️",
		debug: "🐛"
	};

	const tailwindStyles = {
		DEBUG: "text-green-400 font-bold",
		INFO: "text-blue-400 font-bold",
		WARN: "text-yellow-400 font-bold",
		ERROR: "text-red-400 font-bold",
		FANCY: "text-cyan-400 font-bold text-xl bg-black p-2 rounded"
	};

	const getEmoji = (level, message) => {
		for (const key in emojis) {
			if (message.toLowerCase().includes(key)) {
				return emojis[key];
			}
		}
		return emojis[level.toLowerCase()] || "";
	};

	const appendToConsoleElement = (content) => {
		if (browserOutputEnabled && outputElementSelector && document.querySelector(outputElementSelector)) {
			const consoleDiv = document.querySelector(outputElementSelector);
			consoleDiv.appendChild(content);
			consoleDiv.classList.remove("cleared");
		}
	};

	const customLog = function (level, ...args) {
		if (ENV !== "development") return;
		if (logLevels.indexOf(level) < logLevels.indexOf(currentLogLevel)) return;

		const timestamp = new Date().toISOString();
		const emoji = getEmoji(level, args.join(" "));
		const formattedMessage = `[${level}] [${timestamp}] ${emoji} ${args.join(" ")}`;

		logHistory.push({ level, timestamp, message: args.join(" ") });
		logCount++;

		originalLog(formattedMessage);

		const logItem = document.createElement("div");
		logItem.className = `mb-2 ${tailwindStyles[level]}`;
		logItem.innerHTML = formattedMessage;
		appendToConsoleElement(logItem);
	};

	const appendTableToConsole = (data) => {
		if (data.length > 0) {
			let tableHtml = '<table class="table-auto w-full text-left text-white">';
			tableHtml += "<thead><tr>";
			Object.keys(data[0]).forEach((key) => {
				tableHtml += `<th class="px-4 py-2 border">${key}</th>`;
			});
			tableHtml += "</tr></thead><tbody>";
			data.forEach((row) => {
				tableHtml += "<tr>";
				Object.values(row).forEach((value) => {
					tableHtml += `<td class="border px-4 py-2">${value}</td>`;
				});
				tableHtml += "</tr>";
			});
			tableHtml += "</tbody></table>";

			const tableWrapper = document.createElement("div");
			tableWrapper.className = "mb-4";
			tableWrapper.innerHTML = tableHtml;
			appendToConsoleElement(tableWrapper);
		}
	};

	return {
		log: (...args) => customLog("INFO", ...args),
		debug: (...args) => customLog("DEBUG", ...args),
		warn: (...args) => customLog("WARN", ...args),
		error: (...args) => customLog("ERROR", ...args),

		clear: () => {
			console.clear();
			if (browserOutputEnabled && outputElementSelector && document.querySelector(outputElementSelector)) {
				const consoleDiv = document.querySelector(outputElementSelector);
				consoleDiv.innerHTML = "";
				consoleDiv.classList.add("cleared");
			}
		},

		fancylog: function (message, ...args) {
			const timestamp = new Date().toISOString();
			const formattedMessage = `[${timestamp}] 📝 ${message} ${args.join(" ")}`;

			originalLog(
				`%c${formattedMessage}`,
				"color: cyan; font-weight: bold; font-size: 16px;"
			);

			const logItem = document.createElement("div");
			logItem.className = tailwindStyles["FANCY"];
			logItem.innerHTML = formattedMessage;
			appendToConsoleElement(logItem);
		},

		setLogLevel: (level) => {
			if (logLevels.includes(level)) {
				currentLogLevel = level;
			}
		},

		setBrowserOutput: (enabled, elementSelector = "") => {
			browserOutputEnabled = enabled;
			outputElementSelector = elementSelector;
		},

		getLogCount: () => {
			const count = logCount;
			consoul.log(`Total log count: ${count}`);
			return count;
		},

		getLogHistory: () => {
			const history = logHistory;
			originalTable(history);
			appendTableToConsole(history);
			return history;
		},

		table: (data) => {
			originalTable(data);
			appendTableToConsole(data);
		},

		group: (label) => {
			originalGroup(label);
			const groupHeader = document.createElement("div");
			groupHeader.className = "font-bold text-lg text-blue-400 mt-4 mb-2";
			groupHeader.textContent = `Group: ${label}`;
			appendToConsoleElement(groupHeader);
		},

		groupEnd: () => {
			originalGroupEnd();
			const groupFooter = document.createElement("div");
			groupFooter.className = "font-bold text-lg text-blue-400 mt-2";
			groupFooter.textContent = "End of Group";
			appendToConsoleElement(groupFooter);
		},

		clearLogHistory: () => {
			logHistory.length = 0;
			logCount = 0;
		},

		conditionalLog: (condition, message) => {
			if (condition) {
				consoul.log(message);
			}
		},

		benchmark: (fn, label = "Benchmark") => {
			const start = performance.now();
			fn();
			const end = performance.now();
			const message = `${label} took ${(end - start).toFixed(2)} ms.`;
			consoul.log(message);
		}
	};
})();

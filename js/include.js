// js/include.js
// Enhanced debug version to identify loading issues

async function fetchText(url) {
  console.log(`🔄 Fetching: ${url}`);
  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const text = await res.text();
    console.log(`✓ Fetched ${url} - Length: ${text.length} characters`);
    return text;
  } catch (error) {
    console.error(`✗ Failed to fetch ${url}:`, error);
    throw error;
  }
}

async function loadPart(containerId, url) {
  try {
    console.log(`📦 Loading ${url} into #${containerId}`);

    // Check if container exists
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`✗ Container "#${containerId}" not found in DOM!`);
      return;
    }
    console.log(`✓ Container "#${containerId}" found`);

    // Fetch the HTML
    const html = await fetchText(url);

    // Check if HTML is empty or too short
    if (!html || html.trim().length < 50) {
      console.warn(`⚠️ Warning: ${url} seems too short (${html.length} chars)`);
    }

    // Insert HTML
    container.innerHTML = html;
    console.log(`✓ Successfully loaded ${url} into #${containerId}`);
    console.log(`   Content preview: ${html.substring(0, 100)}...`);
  } catch (err) {
    console.error(`✗ Error loading ${url}:`, err);
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = `
        <div style="padding: 20px; background: #fee; border: 2px solid #f00; color: #c00;">
          <strong>⚠️ Failed to load ${url}</strong><br>
          Error: ${err.message}
        </div>
      `;
    }
  }
}

function highlightActiveLink() {
  try {
    const path = location.pathname.split("/").pop() || "index.html";
    console.log(`🔗 Current page: ${path}`);

    const links = document.querySelectorAll(".main_nav-link");
    console.log(`   Found ${links.length} navigation links`);

    links.forEach((a) => {
      const href = a.getAttribute("href");
      if (!href) return;

      const hrefFile = href.split("/").pop();
      if (hrefFile === path) {
        a.classList.add("active");
        console.log(`   ✓ Activated: ${href}`);
      } else {
        a.classList.remove("active");
      }
    });
  } catch (e) {
    console.error("✗ Error highlighting active link:", e);
  }
}

async function loadCommonParts() {
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("🚀 Starting to load common parts...");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  try {
    // Load header and footer sequentially to see which fails
    console.log("\n📋 Step 1: Loading header...");
    await loadPart("header", "components/header.html");

    console.log("\n📋 Step 2: Loading footer...");
    await loadPart("footer", "components/footer-new.html");

    console.log("\n📋 Step 3: Highlighting active links...");
    highlightActiveLink();

    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("✅ All common parts loaded successfully!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    // Verify what was loaded
    setTimeout(() => {
      const headerContent = document.getElementById("header")?.innerHTML || "";
      const footerContent = document.getElementById("footer")?.innerHTML || "";

      console.log("📊 Final verification:");
      console.log(`   Header content length: ${headerContent.length} chars`);
      console.log(`   Footer content length: ${footerContent.length} chars`);

      if (footerContent.length < 100) {
        console.error("⚠️ WARNING: Footer content seems incomplete!");
      }
    }, 100);
  } catch (error) {
    console.error("✗ Failed to load common parts:", error);
  }
}

// Log when script loads
console.log("📜 include.js loaded and ready");

// When this script is loaded with `defer`, DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  console.log("📄 DOM Content Loaded - initializing...");
  loadCommonParts();
});
